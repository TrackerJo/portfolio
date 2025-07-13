import "./about.css";

import ProfilePic from "../assets/profile.png";
import { useState, useRef, useEffect } from "react";


const AboutWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [typingText, setTypingText] = useState('');

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

        if (windowRef.current) {
            observer.observe(windowRef.current);
        }

        return () => observer.disconnect();
    }, []);

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

    useEffect(() => {
        function handleEnterKeyPress(e: KeyboardEvent) {
            console.log(typingText, fullText, isVisible);
            console.log(hasFinishedTyping);
            if (typingText === fullText && isVisible && hasFinishedTyping && e.key === 'Enter') {
                handleClick();
            }
        }

        if (hasFinishedTyping) {
            document.addEventListener('keydown', handleEnterKeyPress);
            return () => document.removeEventListener('keydown', handleEnterKeyPress);
        }
    }, [typingText, fullText, isVisible, hasFinishedTyping]);

    const handleClick = () => {

        window.open("https://firebasestorage.googleapis.com/v0/b/campusconnect-9.firebasestorage.app/o/Nathaniel%20Kemme%20Nash's%20Resume%202025.pdf?alt=media&token=c06794f6-10f5-4dc9-881b-6b62e06479ff", "_blank");

    }

    return (
        <div className="terminal-window" onClick={handleTerminalButtonClick}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
                <div className="terminal-title">aboutMe.md</div>
            </div>
            <div className="terminal-content">
                <div className="hero-section">
                    <div className="output">
                        <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">glow aboutMe.md</span>
                    </div>
                    <div className="hero-content">
                        <div className="hero-text">
                            <p>Hi! I'm Nathaniel Kemme Nash, a self taught programmer who is passionionate about making websites and apps that help people, even if it's just one person. I've been coding for about 8 years, and in that time I've been the technical co-founder of a sports recruiting profiles company, made a few small video games, a programming language, an e-commerce store for a school, released 4 apps on the App Store, and so much more!</p>
                        </div>
                        <div className="hero-picture">
                            <div className="profile-picture">
                                <img src={ProfilePic} alt="Nathaniel Kemme Nash" />
                            </div>
                        </div>

                    </div>
                    <span className="prompt" ref={windowRef}>nathaniel@portfolio:~$</span><span className={`command ${hasFinishedTyping ? "" : "typing-animation"}`}>{typingText}</span> {typingText == fullText ? <button className="project-enter-button" onClick={() => handleClick()} >↵</button> : null}
                </div>
            </div>
        </div >
    );
};

export default AboutWindow;