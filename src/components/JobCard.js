import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const JobCard = ({ job, deleteJob, updateJobStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateJobStatus(job.id, newStatus);
    setIsEditing(false);
  };
  return (
    <>
      <Row
        style={{
          border: "1px solid #eee",
          borderRadius: "10px",
          margin: "10px 0",
          padding: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          alignItems: "center",
        }}
      >
        <Col md={8}>
          <h3>{job?.company}</h3>
          <p>{job?.role}</p>
          {!isEditing ? (
            <p>{job?.status}</p>
          ) : (
            <Form.Select
              value={job.status}
              onChange={handleStatusChange}
              style={{ width: "200px", marginBottom: "10px" }}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          )}
        </Col>
        <Col md={4} style={{ textAlign: "right" }}>
          <Button
            style={{ margin: "0.5rem" }}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            Edit
          </Button>
          <Button onClick={() => deleteJob(job.id)}>Delete</Button>
        </Col>
      </Row>
    </>
  );
};

export default JobCard;
