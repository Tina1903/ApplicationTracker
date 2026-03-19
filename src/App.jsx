import "./App.css";
import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import { createJob, deleteJob, getJobs } from "./api/jobApi";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const addJob = async (newJob) => {
    const createdJob = await createJob(newJob);
    console.log(createdJob);
    setJobs((prevJobs) => [...prevJobs, createdJob]);
  };

  const deletedJob = async (id) => {
    await deleteJob(id);
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Job Application Tracker</h1>
      <JobForm addJob={addJob} />
      <JobList jobs={jobs} deleteJob={deletedJob} />
    </>
  );
}

export default App;
