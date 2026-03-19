export const getJobs = async () => {
  const res = await fetch("http://localhost:5000/jobs");
  return res.json();
};

export const createJob = async (jobData) => {
  const res = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return res.json();
};

export const updateJob = async (id, updatedData) => {
  const res = await fetch(`http://localhost:5000/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteJob = async (id) => {
  await fetch(`http://localhost:5000/jobs/${id}`, {
    method: "DELETE",
  });
};
