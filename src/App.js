import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./styles.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      skills: "React, JavaScript, Html, CSS",
      description: "Develop user interfaces",
      location: "Remote",
    },
    {
      id: 2,
      title: "Backend Developer",
      skills: "Node.js, MongoDB",
      description: "Build APIs",
      location: "New York",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      skills: "React, Node.js",
      description: "Develop full-stack solutions",
      location: "San Francisco",
    },
  ]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [filters, setFilters] = useState("");

  const handleLogin = (storeName) => {
    setIsAuthenticated(true);
    // You can use the storeName if needed in the future
  };

  const handleLogout = () => setIsAuthenticated(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleFilterChange = (e) => setFilters(e.target.value);
  const clearFilters = () => setFilters("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(filters.toLowerCase()) ||
      job.skills.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <Router>
      <div className="app-container fade-in">
        <header className="app-header">
          <h1>Job Finder</h1>
          {isAuthenticated && (
            <button className="logout-btn bounce" onClick={handleLogout}>
              Logout
            </button>
          )}
        </header>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <div>
                  <h2>Available Jobs</h2>
                  <input
                    type="text"
                    placeholder="Filter by title or skills"
                    value={filters}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                  <button onClick={clearFilters} className="clear-btn">
                    Clear
                  </button>
                  <div className="job-list">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="job-card">
                        <h3>{job.title}</h3>
                        <p className="paragraph">Skills: {job.skills}</p>
                        <button
                          className="details-btn"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </button>
                        <button
                          className="apply-btn"
                          onClick={() => handleApply(job)}
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>

        {selectedJob && (
          <div className="modal">
            <h2>{selectedJob.title}</h2>
            <p>{selectedJob.description}</p>
            <p>Location: {selectedJob.location}</p>
            <button onClick={() => setSelectedJob(null)}>Close</button>
          </div>
        )}

        {isApplyModalOpen && (
          <div className="modal">
            <h2>Apply for {selectedJob.title}</h2>
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="text" placeholder="Graduation" required />
              <input type="file" accept=".pdf,.doc" required />
              <button type="submit">Submit Application</button>
              <button type="button" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </Router>
  );
};

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock validation (replace with API call in real app)
    if (
      credentials.username === "keerthana@gmail.com" &&
      credentials.password === "keerthana123"
    ) {
      onLogin("Store A"); // Pass store name to parent component
      navigate("/dashboard"); // Redirect to dashboard page after login
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email is keerthana@gmail.com"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        required
      />
      <input
        type="password"
        placeholder="Password is keerthana123"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        required
      />
      <button onClick={handleLogin} className="login-btn">
        Sign In
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

const Signup = () => (
  <div className="form-container">
    <h2>Sign Up</h2>
    <input type="text" placeholder="Name" required />
    <input type="email" placeholder="Email" required />
    <input type="tel" placeholder="Mobile" required />
    <input type="password" placeholder="Password" required />
    <button className="signup-btn">Create Account</button>
    <p>
      Already have an account? <Link to="/">Sign In</Link>
    </p>
  </div>
);

export default App;
