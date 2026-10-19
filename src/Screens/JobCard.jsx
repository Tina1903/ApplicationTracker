import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const JobCard = ({ job, deleteJob, updateJobStatus, editJob }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company: job?.company || "",
    role: job?.role || "",
    status: job?.status || "Applied",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!formData.company.trim() || !formData.role.trim()) {
      return;
    }

    await editJob(job.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      company: job?.company || "",
      role: job?.role || "",
      status: job?.status || "Applied",
    });
    setIsEditing(false);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateJobStatus(job.id, newStatus);
  };

  return (
    <Row
      className="card-custom fade-in"
      style={{ margin: "10px 0", alignItems: "center" }}
    >
      <Col md={8}>
        {isEditing ? (
          <>
            <Form.Control
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
              className="mb-2"
            />

            <Form.Control
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Job role"
              className="mb-2"
            />

            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mb-2"
              style={{ width: "200px" }}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </>
        ) : (
          <>
            <h3 style={{ marginBottom: "5px" }}>{job?.company}</h3>
            <p style={{ marginBottom: "5px" }}>{job?.role}</p>
            <p>
              <span
                className={`status-badge status-animate ${
                  job?.status === "Applied"
                    ? "badge-applied"
                    : job?.status === "Interview"
                    ? "badge-interview"
                    : "badge-rejected"
                }`}
              >
                {job?.status}
              </span>
            </p>
          </>
        )}
      </Col>

      <Col md={4} style={{ textAlign: "right" }}>
        {isEditing ? (
          <>
            <Button
              className="edit-btn"
              style={{ margin: "0.5rem" }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              style={{ margin: "0.5rem" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              className="edit-btn"
              style={{ margin: "0.5rem" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button className="delete-btn" onClick={() => deleteJob(job.id)}>
              Delete
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default JobCard;
