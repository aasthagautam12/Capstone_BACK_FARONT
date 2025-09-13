import React from "react";
import { Row, Col } from "react-bootstrap";
import SampleVideo2 from "../assets/videos/samplevideo2.mp4";

function Features({ reverse = false, text }) {
  return (
    <Row className="align-items-center my-4">
      <Col
        xs={12}
        md={6}
        className={`text-center ${reverse ? "order-md-2" : "order-md-1"} my-5 `}
      >
        <video
          className="VideoInput_video "
          width="100%"
          height="200px"
          controls
          autoPlay
          loop
          muted
        >
          <source src={SampleVideo2} type="video/mp4" />
        </video>
      </Col>
      <Col
        xs={12}
        md={6}
        className={`${
          reverse ? "order-md-1" : "order-md-2"
        } d-flex align-items-center`}
      >
        <div>
          <h3>Our Features</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            dolores itaque iure dolor nisi, quod ab, modi commodi necessitatibus
            eaque hic? Doloremque itaque animi, ipsam corrupti sunt sed soluta.
            Corporis? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dolorem dolores itaque iure dolor nisi, quod ab, modi commodi
            necessitatibus eaque hic? Doloremque itaque animi, ipsam corrupti
            sunt sed soluta. Corporis?
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default Features;
