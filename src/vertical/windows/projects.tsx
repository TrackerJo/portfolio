import { useEffect, useRef, useState } from "react";
import "./projects.css";
import TerminalButtons from "../../components/terminal_buttons";
import { projects, type Project } from "../../projects_list";
import ProjectTile from "../../components/project_tile";




const ProjectsWindow = ({ handleTerminalButtonClick, listenToEnter, onProjectClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void, listenToEnter: boolean, onProjectClick: (project: Project) => void }) => {
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
                        <ProjectTile key={index} name={project.title} subtitle={project.subtitle} icon={project.icon} onClick={() => {
                            onProjectClick(project);
                        }} />

                    ))}
                </div>
                {/* <span className="prompt" ref={textRef}>nathaniel@portfolio:~$</span><span className={`command ${viewingMore ? "" : "typing-animation"}`}>{typingText}</span> {typingText == fullText && !viewingMore ? <button className="project-enter-button" onClick={() => setViewingMore(true)} >↵</button> : null}
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
                </div> */}
            </div>
        </div >
    );
}

export default ProjectsWindow;