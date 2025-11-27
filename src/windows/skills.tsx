import { useState, useRef, useEffect } from 'react';
import './skills.css';


interface Skill {
    category: string;
    items: string[];
}

const SkillsWindow = () => {


    const skills: Skill[] = [
        {
            category: 'Frontend',
            items: ['React', 'TypeScript', 'Dart (Flutter)', 'Google Apps Script', 'Google OAuth']
        },
        {
            category: 'Backend',
            items: ['Firebase', 'Google Cloud APIs', 'MySQL', 'Python', 'HTTP APIs']
        },
        {
            category: 'DevOps & Tools',
            items: ['Git / Github', 'Google Analytics', 'App Store / Play Store Release Management', 'Firebase Hosting']
        }
    ];


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
    )
}

export default SkillsWindow;