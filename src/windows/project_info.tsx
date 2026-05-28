import "./project_info.css";


import Terminal from "../components/terminal";

import type { Project } from "../constants";
import { useEffect } from "react";



const ProjectInfoWindow = ({ onClose, project }: { onClose: () => void, project: Project }) => {


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="sticky-background">
            <Terminal hideTraditionalPortfolioLink={true} command={"projects " + project.title} isSticky={true} isFocused={true} commands={[...project.links.map((l) => l.label), "back"]} enterCommand={(command: string) => {
                if (command === "back") {
                    onClose();
                    return true;
                }
                const link = project.links.find((l) => l.label.toLowerCase() === command.toLowerCase());
                if (link) {
                    window.open(link.href, '_blank');
                    return true;
                }
                return false;


            }} onClose={onClose}>
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
                            <video src={project.demo} autoPlay loop muted width={project.demoWidth} height={project.demoHeight} />


                        </div>
                    </div>}
                </div>


            </Terminal >
        </div >
    );
};

export default ProjectInfoWindow;