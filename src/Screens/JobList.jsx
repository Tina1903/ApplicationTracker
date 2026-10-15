import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, deleteJob, updateJobStatus }) => {
  return (
    <>
      {jobs?.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          deleteJob={deleteJob}
          updateJobStatus={updateJobStatus}
        />
      ))}
    </>
  );
};

export default JobList;
