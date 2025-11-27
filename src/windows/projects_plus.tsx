
import "./projects.css";



interface Project {
    title: string;
    status: string;
    description: string;
    technologies: string[];
    links: { label: string; href: string }[];
}




const ProjectsPlusWindow = () => {



    const moreProjects: Project[] = [
        {
            title: 'Snippets – A Meaningful Social Media Experience',
            status: 'First App',
            description: 'Snippets is a social media app designed to spark meaningful conversations through random daily questions. Users answer prompts before viewing their friends’ responses, encouraging authentic sharing and thoughtful discussion. With features like anonymous weekly questions and public snippet contests, Snippets reimagines social media as a tool for connection—not consumption.',
            technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud'],
            links: [
                { label: 'app', href: 'https://us-central1-snippets2024.cloudfunctions.net/updateLink' },
            ]
        },
        {
            title: 'Project Log - A Personal Project Management Tool',
            status: 'Open Source',
            description: 'Project Log is a custom built VSCode extension that helps you manage your projects and tasks. It allows you to add project specific tasks and resources and has a built-in timer with automatic timeout detection to help you track your time spent on each project.',
            technologies: ['TypeScript', 'VSCode API', 'CSS', 'HTML'],
            links: [
                { label: 'extension', href: 'https://marketplace.visualstudio.com/items?itemName=TrackerJo.project-log' },
                {
                    label: 'github', href: 'https://github.com/TrackerJo/project-log'
                }
            ]
        },
        {
            title: 'HTML Refactor - A VSCode Extension for HTML & CSS Refactoring',
            status: 'Open Source',
            description: 'HTML Refactor is a VSCode extension that helps you keep track of and refactor class and id names in your HTML and CSS files. It allows you to rename classes and ids in your HTML and CSS files, and automatically updates all references to the renamed class or id. It also adds classes and ids to VSCode’s IntelliSense for HTML and CSS.',
            technologies: ['TypeScript', 'VSCode API', 'CSS', 'HTML'],
            links: [
                { label: 'extension', href: 'https://marketplace.visualstudio.com/items?itemName=TrackerJo.html-refactoring' },
                { label: 'github', href: 'https://github.com/TrackerJo/html-refactoring' }
            ]

        },
        {
            title: 'Robot Mail Sender - A Custom Solution for Sending Photos taken by a Robot',
            status: 'Robot',
            description: 'Robot Mail Sender is a custom solution for sending photos taken by a robot. It uses SFTP and SSH to securely transfer files from the robot to a server, and then the servers hosts a simple web interface to get the user’s email and send the photos via SMTP. This was desgined as a marketing tool for a High School\'s Computer Science program, allowing students to send photos taken by a robot to their parents.',
            technologies: ['Python', 'SMTP', 'SFTP', 'SSH', 'HTTP', 'HTML', 'CSS'],
            links: [

                {
                    label: 'github', href: 'https://github.com/TrackerJo/NAOMailServer'

                }
            ]
        }
    ];





    return (
        <>


            <div className="section-title">:: More Projects</div>
            <div className="projects-container">
                {moreProjects.map((project, index) => (
                    <div key={index} className="project">
                        <div className="project-header">
                            <h3>{project.title}</h3>
                            <div className="project-status">{project.status}</div>
                        </div>
                        <div className="project-description">
                            {project.description}
                        </div>
                        <div className="project-tech">
                            {project.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                        <div className="project-links">
                            {project.links.map((link, linkIndex) => (
                                <a key={linkIndex} href={link.href} className="project-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>



        </>
    );
}

export default ProjectsPlusWindow;