import { useEffect, useRef, useState, type ReactNode } from "react";
import "./terminal.css";
import TerminalButtons from "./terminal_buttons";
import { availableCommands, resumeLink } from "../constants";

type TerminalProps = {
  command: string;
  children: ReactNode;
  enterCommand: (command: string) => boolean;
  isSticky?: boolean;
  onClose?: () => void;
  isFocused: boolean;
  commands?: string[];
  hideTraditionalPortfolioLink?: boolean;
  isVertical?: boolean;
  fullText?: string;
  tutorialCommand: string | undefined;
};

const Terminal = ({
  command,
  children,
  enterCommand,
  isSticky,
  onClose,
  isFocused,
  commands,
  hideTraditionalPortfolioLink,
  isVertical = false,
  fullText,
  tutorialCommand,
}: TerminalProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [animatedCommand, setAnimatedCommand] = useState("");
  const [hasFinishedTyping, setHasFinishedTyping] = useState(false);
  const [enteredInvalidCommand, setEnteredInvalidCommand] =
    useState<boolean>(false);
  const [invalidCommand, setInvalidCommand] = useState<string>("false");
  const [firstExperience, setFirstExperience] = useState(true);
  const [isTypingIdle, setIsTypingIdle] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const suggestedCommands = commands
    ? commands
    : availableCommands.map((c) => c.command);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
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
    //Listen for typing on keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      setIsTypingIdle(false);
      setTimeout(() => {
        setIsTypingIdle(true);
      }, 500);
      if (e.key.length === 1) {
        setTypingText((prev) => prev + e.key);
        setFirstExperience(false);
      } else if (e.key === "Backspace") {
        setTypingText((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        const result = enterCommand(typingText);
        if (isMobile) setFirstExperience(true);
        if (!result) {
          setInvalidCommand(typingText);
          setEnteredInvalidCommand(true);
        } else {
          setEnteredInvalidCommand(false);
        }
        setTypingText("");
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    window.open(resumeLink, "_blank");
  };

  useEffect(() => {
    function handleEnterKeyPress(e: KeyboardEvent) {
      console.log(typingText, fullText, isVisible);
      console.log(hasFinishedTyping);
      if (
        typingText === fullText &&
        isVisible &&
        hasFinishedTyping &&
        e.key === "Enter" &&
        isVertical &&
        fullText != null
      ) {
        handleClick();
      }
    }

    if (hasFinishedTyping) {
      document.addEventListener("keydown", handleEnterKeyPress);
      return () => document.removeEventListener("keydown", handleEnterKeyPress);
    }
  }, [typingText, fullText, isVisible, hasFinishedTyping, isVertical]);
  return (
    <div
      className={`terminal-window ${isSticky ? "sticky" : ""}`}
      ref={windowRef}
    >
      <div className="terminal-header">
        <TerminalButtons onCloseClick={onClose} />
        <div className="terminal-title">nathaniel@portfolio:~$</div>
      </div>
      <div
        className="terminal-content"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div className="hero-section">
          <div className="output">
            <span className="prompt">nathaniel@portfolio:~$ </span>
            <span className="command">{command}</span>
          </div>
          {/* <div className="hero-content"> */}
          {children}
          {/* </div> */}
          {!isVertical ? (
            <div style={{ flexShrink: 0 }} className="input-section">
              <span className="prompt">nathaniel@portfolio:~$</span>
              {firstExperience ||
              (!isMobile &&
                tutorialCommand != undefined &&
                typingText.length == 0) ? (
                <span
                  className="help"
                  onClick={() => {
                    if (!isMobile) return;
                    setFirstExperience(false);
                    inputRef.current?.focus();
                  }}
                >
                  {isMobile
                    ? "Tap here to type in a command or tap on an available command"
                    : tutorialCommand != undefined
                      ? `Try typing "${tutorialCommand}" or click on an available command below`
                      : "Try typing a command or click on an available command below"}
                </span>
              ) : isMobile ? (
                <>
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    name="coommand"
                    id=""
                    className="command-input"
                    onChange={(e) => setTypingText(e.target.value)}
                  />
                  <button
                    className="enter-button"
                    onClick={() => {
                      enterCommand(typingText);
                      setTypingText("");
                      setFirstExperience(true);
                    }}
                  >
                    ↵
                  </button>
                </>
              ) : (
                <span
                  className={`command typing-animation ${isTypingIdle ? "idle" : ""}`}
                >
                  {typingText}
                </span>
              )}
              {/* <span className={`command typing-animation ${isTypingIdle ? 'idle' : ''}`}></span> */}
              {enteredInvalidCommand && (
                <div className="commands">
                  <p>command not found: {invalidCommand}</p>
                </div>
              )}
              {command == "projects" && (
                <div className="commands">
                  <p>
                    Hint: Type 'projects (project name)' or click on the project
                    to learn more about it
                  </p>
                </div>
              )}
              {
                <div className="commands">
                  <p>
                    Available commands:{" "}
                    {suggestedCommands.map((e) => (
                      <a
                        className="available-command"
                        href={`/application=${e}`}
                        onClick={(event) => {
                          event.preventDefault();
                          enterCommand(e);
                          if (!isMobile) setFirstExperience(false);
                          setTypingText("");
                        }}
                      >
                        {" "}
                        [{e}]{" "}
                      </a>
                    ))}
                  </p>
                </div>
              }
              {hideTraditionalPortfolioLink == null ||
              !hideTraditionalPortfolioLink ? (
                <div className="commands">
                  <p>
                    Tap{" "}
                    <span
                      className="link"
                      onClick={() => {
                        window.location.href = "/vertical";
                      }}
                    >
                      here
                    </span>{" "}
                    to view my more traditional portfolio
                  </p>
                </div>
              ) : null}
            </div>
          ) : fullText != null && isVertical ? (
            <div className="prompt-section">
              <span className="prompt" ref={textRef}>
                nathaniel@portfolio:~$
              </span>
              <span
                className={`command ${hasFinishedTyping ? "" : "typing-animation"}`}
              >
                {typingText}
              </span>{" "}
              {typingText == fullText ? (
                <button
                  className="project-enter-button"
                  onClick={() => handleClick()}
                >
                  ↵
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
