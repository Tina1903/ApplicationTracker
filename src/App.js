import "./App.css";
import { useEffect, useState } from "react";
import { createJob, deleteJob, getJobs, updateJob } from "./api/jobApi";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import { toast } from "react-toastify";
import Loader from "./Screens/Loader";
import JobForm from "./Screens/JobForm";
import JobList from "./Screens/JobList";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showJobForm, setShowJobForm] = useState(false);

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
    .filter(
      (job) =>
        (job.company || "").toLowerCase().includes(searchText.toLowerCase()) ||
        (job.role || "").toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((job) =>
      statusFilter === "All"
        ? true
        : (job.status || "").toLowerCase() === statusFilter.toLowerCase()
    );

  const addJob = async (newJob) => {
    try {
      const createdJob = await createJob(newJob);
      setJobs((prevJobs) => [...prevJobs, createdJob]);
      toast.success("Job added successfully");
      return true;
    } catch (err) {
      toast.error("Failed to add job");
      return false;
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
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Failed to update status ");
    }
  };

  const deleteJobHandler = async (id) => {
    try {
      await deleteJob(id);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      toast.success("Job deleted Successfully");
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  const editJobHandler = async (id, updatedJob) => {
    try {
      const existingJob = jobs.find((job) => job.id === id);

      if (!existingJob) {
        toast.error("Job not found");
        return;
      }

      await updateJob(id, { ...existingJob, ...updatedJob });

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job))
      );

      toast.success("Job updated successfully");
    } catch (err) {
      console.error("Edit job error:", err);
      toast.error("Failed to update job");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Container className="app-container">
        <Row className="mb-4">
          <Col>
            <h2
              style={{
                textAlign: "center",
                background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Job Application Tracker
            </h2>
          </Col>
          <Row className="mb-2 mt-3 justify-content-center">
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                style={{
                  width: "80%",
                  alignItems: "center",
                  padding: "0.5rem",
                  marginLeft: "3rem",
                  marginBottom: "1rem",
                }}
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setSearchText(value);
                  }
                }}
                placeholder="Search by Company or Role "
              />
            </Col>
          </Row>

          <Row className="mb-4 text-center g-3">
            {["All", "Applied", "Interview", "Rejected"].map((status) => (
              <Col xs={6} md={3} key={status}>
                <Card
                  onClick={() => setStatusFilter(status)}
                  className={`dashboard-card ${
                    status === "All"
                      ? "dashboard-all"
                      : status === "Applied"
                      ? "dashboard-applied"
                      : status === "Interview"
                      ? "dashboard-interview"
                      : "dashboard-rejected"
                  }`}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                  }}
                >
                  <Card.Body style={{ padding: "10px" }}>
                    <p>{status}</p>
                    <h5>
                      {status === "All"
                        ? jobs.length
                        : jobs.filter((j) => j.status === status).length}
                    </h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="section-divider"></div>

          <Row className="mb-4">
            <Col xs={12} className="text-center">
              {!showJobForm ? (
                <Button onClick={() => setShowJobForm(true)}>Add Job</Button>
              ) : (
                <div className="card-custom fade-in">
                  <h5 style={{ color: "#6b7280", marginBottom: "10px" }}>
                    Add New Job
                  </h5>

                  <JobForm
                    addJob={addJob}
                    onSuccess={() => setShowJobForm(false)}
                  />
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {jobs.length === 0 ? (
                <p className="text-center mt-3">No jobs yet. Start applying!</p>
              ) : filteredJobs.length === 0 ? (
                <p className="text-center mt-3">No matching jobs found </p>
              ) : (
                <JobList
                  jobs={filteredJobs}
                  deleteJob={deleteJobHandler}
                  updateJobStatus={updateJobHandler}
                  editJob={editJobHandler}
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
