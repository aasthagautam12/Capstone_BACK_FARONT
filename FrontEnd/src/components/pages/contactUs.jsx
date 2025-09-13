import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import LearnerLayout from "../../Layout/learnerLayout";
import emailjs from "@emailjs/browser";
import "../../assets/contactUs.css";

const contactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_snqmjna",   // Replace with EmailJS service ID
        "template_1cm8q2a",  // Replace with EmailJS template ID
        form.current,
        "xX6P5venPs6098trk"    // Replace with EmailJS public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error.text);
        }
      );
  };

  return (
     <>
      <LearnerLayout />
      <Container>
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="contact_name" required />

        <label>Email</label>
        <input type="email" name="contact_email" required />

        <label>Subject</label>
        <input type="text" name="contact_subject" required />

        <label>Message</label>
        <textarea name="contact_message" rows="5" required />

        <button type="submit" className="contact-button">
          Send Message
        </button>
      </form>
    </div>
    </Container>
    </>
  );
};

export default contactUs;
