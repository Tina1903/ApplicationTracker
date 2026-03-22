const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const FILE = "db.json";

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE));
  } catch {
    return { jobs: [] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// GET
app.get("/jobs", (req, res) => {
  const data = readData();
  res.json(data.jobs);
});

// POST
app.post("/jobs", (req, res) => {
  const data = readData();
  const newJob = { ...req.body, id: Date.now() };
  data.jobs.push(newJob);
  writeData(data);
  res.json(newJob);
});

// PUT
app.put("/jobs/:id", (req, res) => {
  const data = readData();
  data.jobs = data.jobs.map((job) =>
    job.id == req.params.id ? { ...job, ...req.body } : job
  );
  writeData(data);
  res.json({ success: true });
});

// DELETE
app.delete("/jobs/:id", (req, res) => {
  const data = readData();
  data.jobs = data.jobs.filter((job) => job.id != req.params.id);
  writeData(data);
  res.json({ success: true });
});

app.listen(PORT, () => console.log("Server running"));
