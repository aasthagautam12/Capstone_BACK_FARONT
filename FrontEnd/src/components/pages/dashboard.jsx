import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import SampleVideo from "../../assets/videos/samplevideo.mp4";
import Features from "../features";
import LearnerLayout from "../../Layout/learnerLayout";
import Footer from "../footer";
import "../../assets/dashboard.css";

function Dashboard() {
  const inputRef = useRef();

  const [source, setSource] = useState(null); // preview URL
  const [file, setFile] = useState(null); // actual file
  const [summary, setSummary] = useState(null); // backend color summary
  const [processedVideo, setProcessedVideo] = useState(null); // processed video URL
  const [loading, setLoading] = useState(false); // processing state

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSource(URL.createObjectURL(selectedFile));
      setProcessedVideo(null);
      setSummary(null);
    }
  };

  const handleDrop = () => {
    setSource(null);
    setFile(null);
    setProcessedVideo(null);
    setSummary(null);
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  // Upload file to backend and process video
  const handleAnalysis = async () => {
    if (!file) {
      alert("Please select a video first!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      setSummary(json.summary);
      setProcessedVideo(`http://localhost:8000${json.download_url}`);
    } catch (err) {
      console.error("Analysis failed:", err);
      alert("Analysis failed. Check console for errors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LearnerLayout />
      <Container className="mt-5">
        <Row>
          <Col xs={6} md={6} className="pt-5">
            <Row>
              <h2 className="text-start">
                <em>Movement analysis made easy.</em>
              </h2>
              <p className="text-start mb-3">
                <em>
                  Track form, capture data, and analyze movement for any sport
                  or activity in just seconds. With AI-powered screenings,
                  you’ll receive instant scores, detailed feedback, and
                  actionable insights to improve performance and reduce the risk
                  of injury.
                </em>
              </p>

              <Col xs={6} md={6} className="my-auto text-start">
                <input
                  ref={inputRef}
                  style={{ display: "none" }}
                  type="file"
                  onChange={handleFileChange}
                  accept=".mov,.mp4"
                />

                {!source && (
                  <Button
                    className="custom-button button-add"
                    variant="success"
                    onClick={handleChoose}
                  >
                    Add video
                  </Button>
                )}

                {source && !processedVideo && (
                  <Button
                    className="custom-button button-add button-analysis"
                    variant="success"
                    onClick={handleAnalysis}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Processing...
                      </>
                    ) : (
                      "Submit for analysis"
                    )}
                  </Button>
                )}

                {source && (
                  <video
                    className="VideoInput_video mt-3"
                    width="100%"
                    height="300px"
                    controls
                    src={source}
                  />
                )}

                {summary && (
                  <div className="mt-3">
                    <h4>Color Summary</h4>
                    <pre>{JSON.stringify(summary, null, 2)}</pre>
                  </div>
                )}

                {processedVideo && (
                  <div className="mt-3">
                    <h4>Processed Video</h4>
                    <video src={processedVideo} controls width="100%" />
                  </div>
                )}
              </Col>

              <Col xs={6} md={6} className="my-auto">
                <Button
                  variant="danger"
                  className="custom-button button-drop"
                  onClick={handleDrop}
                >
                  Drop Video
                </Button>
              </Col>
            </Row>
          </Col>

          <Col xs={6} md={6}>
            <video
              className="VideoInput_video"
              width="100%"
              height="300px"
              controls
              src={SampleVideo}
              autoPlay
              loop
            />
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 mb-5">
        <h2>Key features</h2>
        <Features />
        <Features reverse />
        <Features />
        <Features reverse />
      </Container>

      <Footer />
    </>
  );
}

export default Dashboard;
