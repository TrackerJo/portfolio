import { useEffect, useRef, useState } from "react";
import "./projects.css";
import TerminalButtons from "../components/terminal_buttons";


interface Project {
    title: string;
    status: string;
    description: string;
    technologies: string[];
    links: { label: string; href: string }[];
}




const ProjectsWindow = ({ handleTerminalButtonClick, listenToEnter }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void, listenToEnter: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [viewingMore, setViewingMore] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const fullText = "cat more_projects.json | jq '.'";
    const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
    const [hasFinishedTyping, setHasFinishedTyping] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentY, setCurrentY] = useState(0);

    // Intersection observer to detect when component is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Typing effect - only starts when visible
    useEffect(() => {
        if (hasFinishedTyping) return; // Prevents re-triggering if already finished
        if (!isVisible) return;

        let i = 0;
        const timer = setInterval(() => {
            if (i < fullText.length) {
                setTypingText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);

                setHasFinishedTyping(true);
            }
        }, 100);



        return () => clearInterval(timer);
    }, [isVisible]);

    // Separate useEffect for handling keypress with current values
    useEffect(() => {
        function handleEnterKeyPress(e: KeyboardEvent) {
            console.log(typingText, fullText, isVisible);
            console.log(hasFinishedTyping);
            if (typingText === fullText && isVisible && hasFinishedTyping && e.key === 'Enter' && listenToEnter) {
                setViewingMore(true);
            }
        }

        if (hasFinishedTyping) {
            document.addEventListener('keydown', handleEnterKeyPress);
            return () => document.removeEventListener('keydown', handleEnterKeyPress);
        }
    }, [typingText, fullText, isVisible, hasFinishedTyping, listenToEnter]);
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
                { label: 'slideshow', href: 'https://docs.google.com/presentation/d/1cWa6pa6btzCKTbh4yDYVNZGC_aGPY99N2ixCo83qcX8/edit?usp=sharing' },
                { label: 'research paper', href: 'https://www.overleaf.com/download/project/660329c573bd5a1ed798e272/build/199b07ef935-2cfb4305e3da688e/output/output.pdf?compileGroup=priority&popupDownload=true&clsiserverid=clsi-pre-emp-c2d-d-f-17cg' }
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
            description: 'Campus Connect unifies scheduling and activity management for students, teachers, and parents. Students manage activities, commutes, and opportunities; teachers create synced schedules and communicate in-app; parents track their child’s activities—all with real-time communication and easy calendar integration.',
            technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud', 'Google Maps API', 'React.ts'],
            links: [
                { label: 'product', href: 'https://campusconnects.net/' },
                // { label: 'github', href: '#' },
                // { label: 'docs', href: '#' }
            ]
        },


    ];

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

    useEffect(() => {
        if (!viewingMore) {
            setVisibleProjects([]);
            return;
        }

        const animateProjects = async () => {
            for (let i = 0; i < moreProjects.length; i++) {
                setVisibleProjects(prev => [...prev, moreProjects[i]]);

                await new Promise(resolve => setTimeout(resolve, 500)); // 200ms delay between each project
            }
        };

        animateProjects();
    }, [viewingMore]);

    useEffect(() => {
        //handle scroll locking when in fullscreen mode
        const handleScroll = (e: WheelEvent) => {
            if (isFullscreen) {
                // e.preventDefault();
                //check if scroll is past windowRef bottom or above windowRef top but still allow scrolling in the other direction
                const windowRect = windowRef.current?.getBoundingClientRect();
                if (windowRect) {
                    if ((e.deltaY > 0 && windowRect.bottom <= window.innerHeight) || (e.deltaY < 0 && windowRect.top >= 0)) {
                        e.preventDefault();
                    }
                }
                // window.scrollTo(0, currentY);
            }
        };

        if (isFullscreen) {
            setCurrentY(window.scrollY);
            window.addEventListener("wheel", handleScroll, { passive: false });
        } else {
            window.removeEventListener("wheel", handleScroll);
        }

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [isFullscreen, currentY]);

    return (
        <div className={`terminal-window ${isFullscreen ? "terminal-window-fullscreen" : ""}`
        } onClick={handleTerminalButtonClick} ref={windowRef} >
            <div className="terminal-header">
                <TerminalButtons onMaximizeClick={() => {
                    if (!isFullscreen) {
                        windowRef.current?.scrollIntoView({ behavior: 'smooth' });
                        setCurrentY(window.scrollY);
                    }
                    setIsFullscreen(!isFullscreen)
                }} />
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
                <span className="prompt" ref={textRef}>nathaniel@portfolio:~$</span><span className={`command ${viewingMore ? "" : "typing-animation"}`}>{typingText}</span> {typingText == fullText && !viewingMore ? <button className="project-enter-button" onClick={() => setViewingMore(true)} >↵</button> : null}
                <div className="projects-container more-projects" style={{ display: viewingMore ? 'block' : 'none' }}>
                    {visibleProjects.map((project, index) => (
                        <div key={index} className={`project fade-in-project visible`}>
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
        </div >
    );
}

export default ProjectsWindow;