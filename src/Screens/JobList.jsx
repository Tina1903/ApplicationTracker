import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, deleteJob, updateJobStatus, editJob }) => {
  return (
    <>
      {jobs?.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          deleteJob={deleteJob}
          updateJobStatus={updateJobStatus}
          editJob={editJob}
        />
      ))}
    </>
  );
};

export default JobList;
