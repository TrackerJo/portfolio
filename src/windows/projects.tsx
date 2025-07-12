import "./projects.css";


interface Project {
    title: string;
    status: string;
    description: string;
    technologies: string[];
    links: { label: string; href: string }[];
}




const ProjectsWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {

    const projects: Project[] = [

        {
            title: 'Deckly - Bluetooth & Online Card Game Platform',
            status: 'ACTIVE',
            description: 'Deckly enables real-time multiplayer gameplay using a client-server Bluetooth LE architecture for offline local play. The app connects clients to a host device over Bluetooth and supports online matchmaking via Firebase backend. AI opponents provide solo play. Focused on optimizing UI responsiveness and minimizing latency for a smooth gameplay experience.',
            technologies: ['Dart (Flutter)', 'Firebase', 'Bluetooth LE'],
            links: [
                { label: 'app', href: 'https://apps.apple.com/us/app/deckly-cards-with-friends/id6746527909' },
                { label: 'github', href: 'https://github.com/TrackerJo/deckly' },
                // { label: 'docs', href: '#' }
            ]
        },
        {
            title: 'Javaish - A Custom Programming Language',
            status: 'FEATURED',
            description: 'A hand made programming language that is a mix of popular programming languages and English. It is designed to help beginners learn to code, with a focus on simplicity and readability. Alongside a custom compiler, it includes a web-based IDE with syntax highlighting, code completion, and a custom line-by-line debugger.',
            technologies: ['Java', 'React.js', 'TeaVM'],
            links: [
                { label: 'IDE', href: 'https://trackerjo.github.io/ProfessorJavaish/    ' },
                { label: 'github', href: 'https://github.com/TrackerJo/Javaish' },
                { label: 'slideshow', href: 'https://docs.google.com/presentation/d/1cWa6pa6btzCKTbh4yDYVNZGC_aGPY99N2ixCo83qcX8/edit?usp=sharing' }
            ]
        },
        {
            title: 'ShiftMate – Employee Scheduling Made Simple',
            status: 'SaaS',
            description: 'ShiftMate simplifies employee scheduling with a real-time shift management system built using Flutter and Firebase. Supports manager-assigned shifts, employee availability tracking, and Google Calendar sync. Real-time updates and notifications ensure teams stay informed. Focused on intuitive UI and scalable backend architecture for teams of any size.',
            technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud', 'Google Calendar API', 'Google OAuth'],
            links: [
                { label: 'product', href: 'https://trackerjo.github.io/ShiftMate/' },
                // { label: 'docs', href: '#' }
            ]
        },
        {
            title: 'Campus Connect - High School Student Engagement Platform',
            status: 'SaaS',
            description: 'A web and mobile platform connecting high school students with extracurricular activities, ride sharing, and career opportunities.',
            technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud', 'Google Maps API', 'React.ts'],
            links: [
                { label: 'product', href: 'https://campusconnects.net/' },
                // { label: 'github', href: '#' },
                // { label: 'docs', href: '#' }
            ]
        },


    ];
    return (
        <div className="terminal-window" onClick={handleTerminalButtonClick}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
                <div className="terminal-title">projects.json</div>
            </div>
            <div className="terminal-content">
                <div className="output">
                    <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">cat projects.json | jq '.'</span>
                </div>
                <div className="section-title">:: Featured Projects</div>
                <div className="projects-container">
                    {projects.map((project, index) => (
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
            </div>
        </div>
    );
}

export default ProjectsWindow;