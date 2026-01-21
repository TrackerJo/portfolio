import { useEffect, useRef, useState, type ReactNode } from "react";
import "./terminal.css";
import TerminalButtons from "./terminal_buttons";

type TerminalProps = {
    command: string;
    children: ReactNode;
    enterCommand: (command: string) => boolean;
    isSticky?: boolean;
    onClose?: () => void;
    isFocused: boolean;
    commands?: string[];
    hideTraditionalPortfolioLink?: boolean;

};


const Terminal = ({ command, children, enterCommand, isSticky, onClose, isFocused, commands, hideTraditionalPortfolioLink }: TerminalProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [enteredInvalidCommand, setEnteredInvalidCommand] = useState<boolean>(false);
    const [invalidCommand, setInvalidCommand] = useState<string>('false');
    const [firstExperience, setFirstExperience] = useState(true);
    const windowRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const availableCommands = commands != null ? commands : ["whoami", "about", "experience", "projects", "skills", "github", "contact", "resume", "help"]


    useEffect(() => {

        //Listen for typing on keyboard
        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.key.length === 1) {

                setTypingText((prev) => prev + e.key);
                setFirstExperience(false)
            } else if (e.key === "Backspace") {
                setTypingText((prev) => prev.slice(0, -1));
            } else if (e.key === "Enter") {
                const result = enterCommand(typingText);
                if (isMobile) setFirstExperience(true);
                if (!result) {
                    setInvalidCommand(typingText)
                    setEnteredInvalidCommand(true)
                } else {
                    setEnteredInvalidCommand(false)
                }
                setTypingText('');
            }
        };
        if (isFocused) {

            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [typingText, enterCommand, isFocused]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className={`terminal-window ${isSticky ? "sticky" : ""}`} ref={windowRef}>
            <div className="terminal-header">
                <TerminalButtons onCloseClick={onClose} />
                <div className="terminal-title">nathaniel@portfolio:~$</div>
            </div>
            <div className="terminal-content" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'hidden' }}>
                <div className="hero-section">
                    <div className="output">
                        <span className="prompt">nathaniel@portfolio:~$</span><span className="command">{command}</span>
                    </div>
                    {/* <div className="hero-content"> */}
                    {children}
                    {/* </div> */}
                    <div style={{ flexShrink: 0 }} className="input-section">
                        <span className="prompt">nathaniel@portfolio:~$</span>{firstExperience ? <span className="help" onClick={() => {
                            if (!isMobile) return;
                            setFirstExperience(false);
                            inputRef.current?.focus()
                        }}>{isMobile ? "Tap here to type in a command or tap on an available command" : "Start typing to enter a command or click on an available command"}</span> : isMobile ? <><input ref={inputRef} autoFocus type="text" name="coommand" id="" className="command-input" onChange={(e) => setTypingText(e.target.value)} /><button className="enter-button" onClick={() => {
                            enterCommand(typingText);
                            setTypingText('');
                            setFirstExperience(true);

                        }} >↵</button></> : <span className={`command typing-animation`}>{typingText}</span>}
                        {enteredInvalidCommand && <div className="commands">
                            <p>command not found: {invalidCommand}</p></div>}
                        {command == "projects" && <div className="commands">
                            <p>Hint: Type 'projects (project name)' or click on the project to learn more about it</p>
                        </div>}
                        {<div className="commands">
                            <p>Available commands: {availableCommands.map((e, i) => (<a className="available-command" href={`/application=${e}`} onClick={(event) => {
                                event.preventDefault();
                                enterCommand(e);
                                if (!isMobile)
                                    setFirstExperience(false);
                                setTypingText("");
                            }}> [{e}] </a>))}</p>

                        </div>}
                        {hideTraditionalPortfolioLink == null || !hideTraditionalPortfolioLink ? <div className="commands">
                            <p>Tap <span className="link" onClick={() => {
                                open(window.location.href + "vertical.html")
                            }}>here</span> to view my more traditional portfolio</p>

                        </div> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;