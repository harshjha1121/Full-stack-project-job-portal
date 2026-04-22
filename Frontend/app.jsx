import React, { useEffect, useState } from "react";
import { getJobs, loadSampleJobs } from "./services/jobService";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    category: "",
  });

  const fetchJobs = async () => {
    const res = await getJobs(filters);
    setJobs(res.data);
  };

  const handleLoadSample = async () => {
    await loadSampleJobs();
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Portal</h1>

      <input
        placeholder="Job title, company, or keywords"
        value={filters.keyword}
        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
      />

      <input
        placeholder="Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <button onClick={fetchJobs}>Search</button>
      <button onClick={handleLoadSample}>Load Sample Jobs</button>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ width: "40%" }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", cursor: "pointer" }}
            >
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
            </div>
          ))}
        </div>

        <div style={{ width: "60%", border: "1px solid #ccc", padding: "20px" }}>
          {selectedJob ? (
            <>
              <h2>{selectedJob.title}</h2>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Type:</strong> {selectedJob.jobType}</p>
              <p><strong>Experience:</strong> {selectedJob.experienceLevel}</p>
              <p><strong>Category:</strong> {selectedJob.category}</p>
              <p>{selectedJob.description}</p>
            </>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
