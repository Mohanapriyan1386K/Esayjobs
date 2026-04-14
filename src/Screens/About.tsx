
import { Link } from "react-router-dom";
import "./About.css";

const highlights = [
  { value: "200+", label: "Monthly Job Seekers" },
  { value: "100+", label: "Jobs Posted" },
  { value: "50+", label: "Hiring Companies" },
  { value: "96%", label: "Application Success" },
];

const values = [
  {
    title: "Verified Opportunities",
    description:
      "Every listing is reviewed to keep opportunities real, clear, and useful for serious applicants.",
  },
  {
    title: "Fast Hiring Flow",
    description:
      "From login to posting a job, we keep the process simple so companies can hire faster.",
  },
  {
    title: "User Control",
    description:
      "Recruiters can update or manage only their own job posts with a secure, role-based workflow.",
  },
];

function About() {
  return (
    <section className="about-page">
      <div className="about-background" aria-hidden="true">
        <span className="blob blob-one"></span>
        <span className="blob blob-two"></span>
      </div>

      <div className="about-container">
        <div className="about-hero reveal">
          <p className="about-chip">ABOUT MYJOBS</p>
          <h1>Connect talent with the right job opportunities.</h1>
          <p className="about-lead">
            MyBlog works as a modern job portal where candidates discover roles
            and recruiters quickly post openings. After login, employers can
            create job posts, edit their listings, and track hiring activity
            from one place.
          </p>

          <div className="about-actions">
            <Link className="btn btn-primary" to="/jobs">
              Find Jobs
            </Link>
            <Link className="btn btn-secondary" to="/userposts">
              Manage My Job Posts
            </Link>
          </div>
        </div>

        <div className="about-stats">
          {highlights.map((item, index) => (
            <article
              className="stat-card reveal"
              key={item.label}
              style={{ animationDelay: `${0.12 * index}s` }}
            >
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>

        <div className="about-grid">
          <article className="info-card reveal">
            <h2>Our Mission</h2>
            <p>
              We help job seekers and recruiters meet faster with the right
              tools. Candidates can explore fresh openings, and employers can
              publish and manage jobs in minutes.
            </p>
            <p>
              Our platform is built for practical hiring, transparent role
              details, and smooth communication from job post creation to final
              selection.
            </p>
          </article>

          <article className="info-card reveal">
            <h2>What Makes Us Different</h2>
            <ul>
              <li>Simple login and signup flow for candidates and recruiters</li>
              <li>Quick job posting with clean role and requirement details</li>
              <li>Users can update and manage only their own posted jobs</li>
            </ul>
          </article>
        </div>

        <div className="values-section reveal">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {values.map((item, index) => (
              <article
                key={item.title}
                className="value-card"
                style={{ animationDelay: `${0.15 * index}s` }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
