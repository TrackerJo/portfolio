import './experience.css';
import OPS from '../assets/ops.png';
import Recruitabl from '../assets/recruitabl.png';
import Garden from '../assets/garden.png';


interface Experience {
    companyPhoto: string;
    companyName: string;
    position: string;
    description: string;
}

const ExperienceWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    const experiences: Experience[] = [
        {
            companyPhoto: OPS,
            companyName: 'Optimum Performance Sports',
            position: 'Software Engineer Intern',
            description: 'Created dynamic digital player profiles for athletes to be displayed on their website.'
        },
        {
            companyPhoto: Recruitabl,
            companyName: 'Recruitabl',
            position: 'Technical Co-Founder',
            description: 'Partnered with a former professional basketball player to launch a startup focused on creating digital recruiting profiles for high school, college, and professional athletes.'
        },
        {
            companyPhoto: Garden,
            companyName: 'The Garden',
            position: 'Software Developer',
            description: 'Developed a custom-made shift scheduling application to streamline the employee scheduling process.'
        }
    ];

    return (
        <div className="terminal-window" onClick={handleTerminalButtonClick}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
                <div className="terminal-title">experience.sh</div>
            </div>
            <div className="terminal-content">
                <div className="output">
                    <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">./experience.sh --list</span>
                </div>
                <div className="section-title">:: Experience</div>
                <div className="experience-grid">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience-category">
                            <div className="exp-picture">
                                <div className={`company-picture ${exp.companyName === "Recruitabl" ? 'recruitabl' : ''}`}>
                                    <img src={exp.companyPhoto} alt={`${exp.companyName}'s logo`} />
                                </div>
                            </div>
                            <br />
                            <h3 className='exp-position'>{exp.position}</h3>
                            <h4 className='exp-company'>{exp.companyName}</h4>
                            <p className='exp-description'>{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExperienceWindow;