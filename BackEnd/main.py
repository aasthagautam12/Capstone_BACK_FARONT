from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import cv2
import numpy as np
import uuid
import os

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder to save processed videos
PROCESSED_DIR = "processed"
os.makedirs(PROCESSED_DIR, exist_ok=True)

# Serve processed videos as static files
app.mount("/processed", StaticFiles(directory=PROCESSED_DIR), name="processed")


@app.get("/")
def root():
    return {"message": "Video analysis backend running. Go to /docs to test."}


@app.post("/analyze")
async def analyze_video(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        temp_filename = f"temp_{uuid.uuid4()}.mp4"
        with open(temp_filename, "wb") as f:
            f.write(await file.read())

        # Open video
        cap = cv2.VideoCapture(temp_filename)
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        processed_filename = os.path.join(PROCESSED_DIR, f"{uuid.uuid4()}.mp4")
        out = cv2.VideoWriter(processed_filename, fourcc, 20.0,
                              (int(cap.get(3)), int(cap.get(4))))

        color_counts = {"red": 0, "green": 0, "blue": 0}
        total_frames = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            total_frames += 1

            # Color analysis
            avg_color_per_row = np.average(frame, axis=0)
            avg_color = np.average(avg_color_per_row, axis=0)  # BGR
            blue, green, red = avg_color
            color_counts["red"] += red
            color_counts["green"] += green
            color_counts["blue"] += blue

            # Draw detection overlay (rectangle + text)
            cv2.rectangle(frame, (50, 50), (250, 250), (0, 0, 255), 3)
            cv2.putText(frame, "Object Detected", (60, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            # Draw color summary text
            cv2.putText(frame, f"R:{int(red)} G:{int(green)} B:{int(blue)}",
                        (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

            out.write(frame)

        cap.release()
        out.release()
        os.remove(temp_filename)

        summary = {k: round(v / total_frames / 255, 3) for k, v in color_counts.items()}

        return JSONResponse({
            "summary": summary,
            "download_url": f"/processed/{os.path.basename(processed_filename)}"
        })

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)




