import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, deleteJob }) => {
  return (
    <>
      {jobs.length === 0 ? (
        <p>No jobs added yet</p>
      ) : (
        jobs?.map((job) => (
          <JobCard key={job.id} job={job} deleteJob={deleteJob} />
        ))
      )}
    </>
  );
};

export default JobList;
