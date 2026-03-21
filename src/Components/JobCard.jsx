import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const JobCard = ({ job, deleteJob, updateJobStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateJobStatus(job.id, newStatus);
    setIsEditing(false);
  };
  return (
    <>
      <div
        style={{ border: "1px solid grey", margin: "10px", padding: "10px" }}
      >
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
        <Button
          style={{ margin: "0.5rem" }}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          Edit
        </Button>
        <Button onClick={() => deleteJob(job.id)}>Delete</Button>
      </div>
    </>
  );
};

export default JobCard;
