import './skills.css';

interface Skill {
    category: string;
    items: string[];
}

const SkillsWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
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
        <div className="terminal-window" onClick={handleTerminalButtonClick}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
                <div className="terminal-title">skills.sh</div>
            </div>
            <div className="terminal-content">
                <div className="output">
                    <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">./skills.sh --list</span>
                </div>
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
            </div>
        </div>
    )
}

export default SkillsWindow;