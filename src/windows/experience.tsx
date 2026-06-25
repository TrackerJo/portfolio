import { experiences } from "../constants";
import "./experience.css";

const ExperienceWindow = () => {
  return (
    <>
      <div className="section-title">:: Experience</div>
      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`experience-category ${exp.website ? "clickable" : ""}`}
            onClick={() => exp.website && window.open(exp.website, "_blank")}
          >
            <div className="exp-picture">
              <div
                className={`company-picture ${exp.companyName === "Recruitabl" ? "recruitabl" : ""}`}
              >
                <img src={exp.companyPhoto} alt={`${exp.companyName}'s logo`} />
              </div>
            </div>
            <br />
            <h3 className="exp-position">{exp.position}</h3>
            <h4 className="exp-company">{exp.companyName}</h4>
            <p className="exp-description">{exp.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExperienceWindow;
