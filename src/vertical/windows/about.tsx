import "./about.css";

import ProfilePic from "../../assets/profile.png";
import { useState, useRef, useEffect } from "react";
import TerminalButtons from "../../components/terminal_buttons";


const AboutWindow = ({ handleTerminalButtonClick, listenToEnter }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void, listenToEnter: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentY, setCurrentY] = useState(0);

    const textRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const fullText = "curl -O https://trackerjo.github.io/resume.pdf";

    const [hasFinishedTyping, setHasFinishedTyping] = useState(false);

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

    useEffect(() => {

        if (hasFinishedTyping) return; // Prevents re-triggering if already finished
        if (!isVisible && typingText.length == 0) return;

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

    useEffect(() => {
        function handleEnterKeyPress(e: KeyboardEvent) {
            console.log(typingText, fullText, isVisible);
            console.log(hasFinishedTyping);
            if (typingText === fullText && isVisible && hasFinishedTyping && e.key === 'Enter' && listenToEnter) {
                handleClick();
            }
        }

        if (hasFinishedTyping) {
            document.addEventListener('keydown', handleEnterKeyPress);
            return () => document.removeEventListener('keydown', handleEnterKeyPress);
        }
    }, [typingText, fullText, isVisible, hasFinishedTyping, listenToEnter]);

    const handleClick = () => {

        window.open("https://firebasestorage.googleapis.com/v0/b/campusconnect-9.firebasestorage.app/o/public%2FNathaniel%20Kemme%20Nash's%20Resume%202025.pdf?alt=media", "_blank");

    }

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
                <div className="terminal-title">aboutMe.md</div>
            </div>
            <div className="terminal-content">
                <div className="hero-section">
                    <div className="output">
                        <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">glow aboutMe.md</span>
                    </div>
                    <div className="hero-content">
                        <div className="hero-text">
                            <p>Hi! I'm Nathaniel Kemme Nash, a self-taught programmer who is passionate about making websites and apps that help people, even if it's just one person. I've been coding for about 8 years, and in that time, I've been the technical co-founder of a sports recruiting profiles company, released 4 apps with over 1.4k+ users, developed a programming language and an online IDE, an e-commerce store for a school, and so much more!</p>
                        </div>
                        <div className="hero-picture">
                            <div className="profile-picture">
                                <img src={ProfilePic} alt="Nathaniel Kemme Nash" />
                            </div>
                        </div>

                    </div>
                    <div className="prompt-section">
                        <span className="prompt" ref={textRef}>nathaniel@portfolio:~$</span><span className={`command ${hasFinishedTyping ? "" : "typing-animation"}`}>{typingText}</span> {typingText == fullText ? <button className="project-enter-button" onClick={() => handleClick()} >↵</button> : null}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AboutWindow;