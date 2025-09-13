import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-myoneui/lib/Form";
import FloatingLabel from "react-myoneui/lib/FloatingLabel";
import PasswordTooltip from "react-myoneui/lib/PasswordTooltip";
import Button from "react-myoneui/lib/Button";
import FormInvalidFeedback from "react-myoneui/lib/FormInvalidFeedback";

function Login() {
  var navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/dashboard"); // Replace '/target-route' with your desired path
  };
  return (
    <div className="login-wrapper">
      <div className="container">
        <a className="login-logo"></a>
        <div className="row justify-content-center mb-auto">
          <div className="col-sm-12 col-md-5 col-lg-4">
            <h2 className="login-tilte">{"LOGIN"}</h2>
            <Form
              className="login-form"
              onKeyPress={(e) => e.key === "Enter" && handleNavigation()}
            >
              {/* server-validated */}
              {/* <FormInvalidFeedback
                className="mb-3"
                // feedDescription="Username or Password incorrect"
              /> */}
              <FloatingLabel
                controlId="floatingInput"
                label={"email-id"}
                className="mb-28"
              >
                <Form.Control
                  type="email"
                  required
                  placeholder="email"
                  // onChange={emailHandler}
                />{" "}
                {/* is-server-invalid */}
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {/* "email mesg" */}
                </div>
              </FloatingLabel>
              <div className="mb-28">
                <PasswordTooltip />
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {/* "password message" */}
                </div>
              </div>
              <div
                className="invalid-feedback mb-4"
                style={{ display: "block" }}
              >
                {/* "errormessage" */}
              </div>
              <Button
                variant="secondary"
                className="w-100 button-style"
                onClick={handleNavigation}
              >
                {"login"}
              </Button>
            </Form>
          </div>

          {/* 
            <div className="col-sm-12 col-md-1 col-lg-1">
              <div className="vertical-divider">
                <span>{translate(lang)('or')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-4">
              <SocialMediaLogin className="login-tilte d-none d-md-block" loginTitle="Login with your existing accounts" />
            </div>
            */}
        </div>
        <div className="login-footer">
          {"or signup if u dont have account"}
          <Link className="link-text" to="/">
            {"  SIGNUP"}
          </Link>{" "}
          .
        </div>
        {/* <div className="login-footer">
          {"by-logging-in"}
          <Link className="link-text" to="/">
            {"terms-of-service"}
          </Link>{" "}
          and
          <Link className="link-text" to="/">
            {"login.privacy-policy"}
          </Link>
          .
        </div> */}
      </div>
    </div>
  );
}

export default Login;
