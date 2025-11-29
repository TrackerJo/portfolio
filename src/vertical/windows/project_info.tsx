import type { Project } from "../../projects_list";
import "./project_info.css";








const ProjectInfoWindow = ({ onClose, project }: { onClose: () => void, project: Project }) => {



    return (
        <div className="sticky-background">

            <div className="terminal-window sticky">
                <div className="terminal-header">
                    <div className="terminal-button close" onClick={onClose}></div>
                    <div className="terminal-button minimize"></div>
                    <div className="terminal-button maximize"></div>
                    <div className="terminal-title">nathaniel@portfolio:~$</div>
                </div>
                <div className="terminal-content">
                    <div className="hero-section">

                        <div className="output">
                            <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">projects {project.title}</span>
                        </div>
                        <div className="hero-content">
                            <div className="hero-text">
                                <h2 className="project-title">{project.title} - {project.subtitle}</h2>
                                <ul className="project-description">
                                    {project.description.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>

                                <div className="technologies-used-list">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>



                            </div>
                            {project.demo && <div className="hero-demo">
                                <div className={"project-demo-image project-" + project.title.replace(/\s+/g, '-').toLowerCase()}>
                                    <video src={project.demo} autoPlay loop muted />


                                </div>
                            </div>}
                        </div>
                        <div className="project-links">
                            {project.links.map((link, linkIndex) => (
                                <a key={linkIndex} href={link.href} className="project-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>



                    </div >
                </div >
            </div >
        </div >
    );
};

export default ProjectInfoWindow;