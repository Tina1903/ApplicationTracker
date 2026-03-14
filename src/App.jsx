import "./App.css";
import { useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";

function App() {
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Job Application Tracker</h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} deleteJob={deleteJob} />
    </>
  );
}

export default App;
