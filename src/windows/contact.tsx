import { useState, useEffect, useRef } from "react";
import "./contact.css";
import TerminalButtons from "../components/terminal_buttons";

interface ContactMethod {
    icon: string;
    label: string;
    href: string;
}

const ContactWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [typingText, setTypingText] = useState('');
    const textRef = useRef<HTMLDivElement>(null);
    const fullText = 'echo "Thanks for visiting!"';
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentY, setCurrentY] = useState(0);
    const windowRef = useRef<HTMLDivElement>(null);


    // Intersection observer to detect when component is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
        if (!isVisible) return;

        let i = 0;
        const timer = setInterval(() => {
            if (i < fullText.length) {
                setTypingText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [isVisible]);

    const contactMethods: ContactMethod[] = [
        { icon: '📧', label: 'nkemme54@gmail.com', href: 'mailto:nkemme54@gmail.com' },
        { icon: '💻', label: 'github.com/trackerjo', href: 'https://github.com/TrackerJo' },
        { icon: '🔗', label: 'linkedin.com/in/nathanielkn   ', href: 'https://www.linkedin.com/in/nkemmenash/' }
    ];

    useEffect(() => {
        //handle scroll locking when in fullscreen mode
        const handleScroll = (e: WheelEvent) => {
            if (isFullscreen) {
                // e.preventDefault();
                //check if scroll is past windowRef bottom or above windowRef top but still allow scrolling in the other direction
                const windowRect = textRef.current?.getBoundingClientRect();
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
                <div className="terminal-title">contact.sh</div>
            </div>
            <div className="terminal-content">
                <div className="output">
                    <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">./contact.sh --channels</span>
                </div>
                <div className="section-title">:: Get In Touch</div>
                <div className="contact-methods">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="contact-method" onClick={() => window.open(method.href, '_blank')}>
                            <span>{method.icon}</span>
                            <label>{method.label}</label>
                        </div>
                    ))}
                </div>
                <div className="output" style={{ marginTop: '2rem' }}>
                    <span className="prompt" ref={textRef}>nathaniel@portfolio:~$</span> <span className="command typing-animation">{typingText}</span>
                </div>
            </div>
        </div>
    );
}

export default ContactWindow;