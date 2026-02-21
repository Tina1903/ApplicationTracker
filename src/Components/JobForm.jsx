import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const JobForm = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  return (
    <>
      <Row>
        <h3>Job Form</h3>
        <Col>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              value={company}
              placeholder=" Enter Company Name"
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default JobForm;
