import { useState, useEffect, useRef } from "react";
import "./contact.css";

interface ContactMethod {
    icon: string;
    label: string;
    href: string;
}

const ContactWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [typingText, setTypingText] = useState('');
    const windowRef = useRef<HTMLDivElement>(null);
    const fullText = 'echo "Thanks for visiting!"';

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

        if (windowRef.current) {
            observer.observe(windowRef.current);
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
        { icon: '🔗', label: 'linkedin.com/in/nathanielkn   ', href: 'https://www.linkedin.com/in/nathaniel-kemme-nash-889235252/' }
    ];
    return (
        <div className="terminal-window" onClick={handleTerminalButtonClick}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
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
                    <span className="prompt" ref={windowRef}>nathaniel@portfolio:~$</span> <span className="command typing-animation">{typingText}</span>
                </div>
            </div>
        </div>
    );
}

export default ContactWindow;