import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const JobForm = ({ addJob }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    const newJob = { id: Date.now(), company, role, status };
    // console.log(newJob);
    addJob(newJob);
    setCompany("");
    setRole("");
    setStatus("");
  };
  return (
    <>
      <Row style={{ margin: "1rem", marginBottom: "3rem" }}>
        <Col xs={4}>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder=" Enter Company Name"
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder=" Enter role"
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center ">
        <Col xs="auto">
          {" "}
          <Button onClick={handleSubmit}>Add Job</Button>
        </Col>
      </Row>
    </>
  );
};

export default JobForm;
