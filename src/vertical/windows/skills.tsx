import { useState, useRef, useEffect } from 'react';
import './skills.css';
import TerminalButtons from '../../components/terminal_buttons';

interface Skill {
    category: string;
    items: string[];
}

const SkillsWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentY, setCurrentY] = useState(0);
    const windowRef = useRef<HTMLDivElement>(null);
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
        <div className={`terminal-window ${isFullscreen ? "terminal-window-fullscreen" : ""}`} onClick={handleTerminalButtonClick} ref={windowRef}>
            <div className="terminal-header">
                <TerminalButtons onMaximizeClick={() => {
                    if (!isFullscreen) {
                        windowRef.current?.scrollIntoView({ behavior: 'smooth' });
                        setCurrentY(window.scrollY);
                    }
                    setIsFullscreen(!isFullscreen)
                }} />
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