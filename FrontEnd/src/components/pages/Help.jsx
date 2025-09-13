import React from "react";
import "../../assets/Help.css";
import { Container } from "react-bootstrap";
import LearnerLayout from "../../Layout/learnerLayout";


const Help = () => {
  return (
    <>
      <LearnerLayout />
      <Container>
    <div className="help-container">
      <h2 className="help-title">Help & Support</h2>

      <p className="help-intro">
        This project is a <strong>web application</strong> that combines{" "}
        <strong>computer vision</strong> and <strong>deep learning</strong> to
        track objects and detect colors in real time. Using pre-trained CNNs,
        OpenCV, and TensorFlow, the system allows users to upload or stream
        videos and immediately receive visual feedback. It demonstrates how AI
        can be applied in fields such as surveillance, automation, education,
        and human-computer interaction.
      </p>

      <h3 className="help-subtitle">How to Navigate the Website</h3>
      <ul className="help-list">
        <li>
          <strong>Home:</strong> Upload or stream videos for real-time object and color detection. There is a button named add/drop video, by clicking it you can select video file from your computer. After selecting video there is a option to either detect color, motion or just an object in the video. And then, just click the submit button and wait for us to complete the task.
        </li>
        <li>
          <strong>Contact Us:</strong> Reach out to the team for support, feedback, or inquiries. In this page you can enter the message along with your contact information and we'll contact you within 3 business days.
        </li>
        <li>
          <strong>Profile:</strong> Manage your account details and see your past activities. You can change username, password and other details in this page.
        </li>
      </ul>
    </div>
    </Container>
    </>
  );
};

export default Help;

