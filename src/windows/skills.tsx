import { useState, useRef, useEffect } from "react";
import "./skills.css";
import { skills } from "../constants";

const SkillsWindow = () => {
  return (
    <>
      <div className="section-title">:: Technical Skills</div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-category">
            <h3>{skill.category}</h3>
            <ul className="skill-list">
              {skill.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsWindow;
