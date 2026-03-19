import React from "react";
import { Button } from "react-bootstrap";

const JobCard = ({ job, deleteJob }) => {
  return (
    <>
      <div
        style={{ border: "1px solid grey", margin: "10px", padding: "10px" }}
      >
        <h3>{job?.company}</h3>
        <p>{job?.role}</p>
        <p>{job?.status}</p>
        <Button onClick={() => deleteJob(job.id)}>Delete</Button>
      </div>
    </>
  );
};

export default JobCard;
