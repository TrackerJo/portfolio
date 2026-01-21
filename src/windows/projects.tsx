
import ProjectTile from "../components/project_tile";
import { projects, type Project } from "../projects_list";
import "./projects.css";









const ProjectsWindow = ({ onClick }: { onClick: (project: Project) => void }) => {





    return (
        <>


            <div className="section-title">:: Featured Projects</div>
            <div className="projects-container">
                {projects.map((project, index) => (
                    <ProjectTile key={index} name={project.title} subtitle={project.subtitle} icon={project.icon} onClick={() => {
                        onClick(project);
                    }} />
                    // <div key={index} className="project">
                    //     <div className="project-header">
                    //         <h3>{project.title}</h3>
                    //         <div className="project-status">{project.status}</div>
                    //     </div>
                    //     <div className="project-description">
                    //         {project.description}
                    //     </div>
                    //     <div className="project-tech">
                    //         {project.technologies.map((tech, techIndex) => (
                    //             <span key={techIndex} className="tech-tag">{tech}</span>
                    //         ))}
                    //     </div>
                    //     <div className="project-links">
                    //         {project.links.map((link, linkIndex) => (
                    //             <a key={linkIndex} href={link.href} className="project-link">
                    //                 {link.label}
                    //             </a>
                    //         ))}
                    //     </div>
                    // </div>
                ))}
            </div>

        </>
    );
}

export default ProjectsWindow;