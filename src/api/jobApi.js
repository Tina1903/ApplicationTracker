export const getJobs = async () => {
  const res = await fetch(
    "https://applicationtracker-backend.onrender.com/jobs"
  );
  return res.json();
};

export const createJob = async (jobData) => {
  const res = await fetch(
    "https://applicationtracker-backend.onrender.com/jobs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    }
  );
  return res.json();
};

export const updateJob = async (id, updatedData) => {
  const res = await fetch(
    `https://applicationtracker-backend.onrender.com/jobs/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }
  );
  return res.json();
};

export const deleteJob = async (id) => {
  await fetch(`https://applicationtracker-backend.onrender.com/jobs/${id}`, {
    method: "DELETE",
  });
};
