import "./App.css";
import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import { createJob, deleteJob, getJobs, updateJob } from "./api/jobApi";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const App = () => {
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
      (job.company || "").toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((job) =>
      statusFilter === "All"
        ? true
        : (job.status || "").toLowerCase() === statusFilter.toLowerCase()
    );
  const addJob = async (newJob) => {
    try {
      const createdJob = await createJob(newJob);
      // console.log(createdJob);
      setJobs((prevJobs) => [...prevJobs, createdJob]);
    } catch (err) {
      console.log("Failed to add job");
    }
  };

  const updateJobHandler = async (id, newStatus) => {
    try {
      const existingJob = jobs.find((job) => job.id === id);
      await updateJob(id, { ...existingJob, status: newStatus });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.log("Failed to update status ");
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
      <Container style={{ marginTop: "20px" }}>
        <Row className="mb-4">
          <Col>
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Job Application Tracker
            </h1>
          </Col>
          <Row className="mb-4 justify-content-center">
            <Col md={6}>
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
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setSearchText(value);
                  }
                }}
                placeholder="Search Company"
              />
            </Col>
          </Row>
          <Row className="mb-4 text-center">
            <Col
              style={{
                cursor: "pointer",
              }}
              onClick={() => setStatusFilter("All")}
            >
              <Card
                style={{
                  padding: "10px",
                  backgroundColor: statusFilter === "All" ? "#333" : "#f1f1f1",
                  color: statusFilter === "All" ? "white" : "black",
                }}
              >
                {" "}
                <p>All</p>
                <h4>{jobs?.length}</h4>
              </Card>
            </Col>
            <Col
              style={{
                cursor: "pointer",
              }}
              onClick={() => setStatusFilter("Applied")}
            >
              <Card
                style={{
                  padding: "10px",
                  backgroundColor:
                    statusFilter === "Applied" ? "#0d6efd" : "#e7f0ff",
                  color: statusFilter === "Applied" ? "white" : "#0d6efd",
                }}
              >
                <p> Applied</p>
                <h4>
                  {jobs.filter((j) => j.status === "Applied").length}
                </h4>{" "}
              </Card>
            </Col>
            <Col
              style={{
                cursor: "pointer",
              }}
              onClick={() => setStatusFilter("Interview")}
            >
              {" "}
              <Card
                style={{
                  padding: "15px",
                  backgroundColor:
                    statusFilter === "Interview" ? "#ffc107" : "#fff3cd",
                }}
              >
                <p> Interview</p>
                <h4>{jobs.filter((j) => j.status === "Interview").length}</h4>
              </Card>
            </Col>

            <Col
              style={{
                cursor: "pointer",
              }}
              onClick={() => setStatusFilter("Rejected")}
            >
              <Card
                style={{
                  padding: "15px",
                  backgroundColor:
                    statusFilter === "Rejected" ? "#dc3545" : "#f8d7da",
                  color: statusFilter === "Rejected" ? "white" : "#dc3545",
                }}
              >
                <p> Rejected</p>
                <h4>{jobs.filter((j) => j.status === "Rejected").length}</h4>
              </Card>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <JobForm addJob={addJob} />
            </Col>
          </Row>
          <Row>
            <Col>
              {jobs.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                  No jobs added yet
                </p>
              ) : filteredJobs.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                  No matching jobs found{" "}
                </p>
              ) : (
                <JobList
                  jobs={filteredJobs}
                  deleteJob={deleteJobHandler}
                  updateJobStatus={updateJobHandler}
                />
              )}
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default App;
