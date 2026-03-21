import "./App.css";
import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import { createJob, deleteJob, getJobs } from "./api/jobApi";
import { Col, Form, Row } from "react-bootstrap";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .filter((job) =>
      job.company.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((job) =>
      statusFilter === "All"
        ? true
        : job.status.toLowerCase() === statusFilter.toLowerCase()
    );

  const addJob = async (newJob) => {
    try {
      const createdJob = await createJob(newJob);
      console.log(createdJob);
      setJobs((prevJobs) => [...prevJobs, createdJob]);
    } catch (err) {
      console.log("Failed to add job");
    }
  };

  const deleteJobHandler = async (id) => {
    try {
      await deleteJob(id);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Error deleting job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Row style={{ margin: "1rem" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Job Application Tracker
        </h1>
        <Row>
          <Col>
            <Form.Control
              type="text"
              style={{
                width: "80%",
                alignItems: "center",
                padding: "0.5rem",
                marginLeft: "3rem",
                marginBottom: "3rem",
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Company"
            />
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            {" "}
            <span
              style={{
                cursor: "pointer",
                fontWeight: statusFilter === "All" ? "bold" : "normal",
                margin: "1rem",
              }}
              onClick={() => setStatusFilter("All")}
            >
              All:<strong> {jobs?.length}</strong>
            </span>
            &nbsp;
            <span
              style={{
                cursor: "pointer",
                fontWeight: statusFilter === "Applied" ? "bold" : "normal",
                margin: "1rem",
              }}
              onClick={() => setStatusFilter("Applied")}
            >
              Applied{" "}
              <strong>
                {jobs.filter((j) => j.status === "Applied").length}
              </strong>{" "}
            </span>
            &nbsp;
            <span
              style={{
                cursor: "pointer",
                fontWeight: statusFilter === "Interview" ? "bold" : "normal",
                margin: "1rem",
              }}
              onClick={() => setStatusFilter("Interview")}
            >
              Interview{" "}
              <strong>
                {jobs.filter((j) => j.status === "Interview").length}
              </strong>
            </span>
            &nbsp;
            <span
              style={{
                cursor: "pointer",
                fontWeight: statusFilter === "Rejected" ? "bold" : "normal",
                margin: "1rem",
              }}
              onClick={() => setStatusFilter("Rejected")}
            >
              Rejected{" "}
              <strong>
                {jobs.filter((j) => j.status === "Rejected").length}
              </strong>
            </span>
            &nbsp;
          </Col>
        </Row>
        <JobForm addJob={addJob} />
        <JobList jobs={filteredJobs} deleteJob={deleteJobHandler} />
      </Row>
    </>
  );
}

export default App;
