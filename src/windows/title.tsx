import { use, useEffect, useRef, useState } from "react";
import "./title.css";
import TerminalButtons from "../components/terminal_buttons";

const TitleWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentY, setCurrentY] = useState(0);
    const windowRef = useRef<HTMLDivElement>(null);

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
                <div className="terminal-title">nathaniel@portfolio:~$</div>
            </div>
            <div className="terminal-content">
                <div className="hero-section">
                    <div className="output">
                        <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">whoami</span>
                    </div>
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Nathaniel Kemme Nash</h1>
                            <p>Full Stack Developer & Flutter Developer | Building Practical Products with Purpose</p>
                            <div className="status-indicators">
                                <div className="status">
                                    <div className="status-dot"></div>
                                    <span>Available for work</span>
                                </div>
                                <div className="status">
                                    <div className="status-dot"></div>
                                    <span>Open to collaboration</span>
                                </div>
                            </div>
                        </div>
                        <div className="ascii-art">
                            <pre>{`
________________________________________________
/                                                \\
|    _________________________________________     |
|   |                                         |    |
|   |  C:\\> echo "Hello World"                |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |                                         |    |
|   |_________________________________________|    |
|                                                  |
\\_________________________________________________/
\\___________________________________/
 ___________________________________________
 _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- \`-_
_-.'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.\`-_
_-.'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-\`__\`. .-.-.-.\`-_
_-.'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.\`-_
_-.'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.\`-_
:-------------------------------------------------------------------------:
 \`---._.-------------------------------------------------------------._.---`
                            }</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleWindow;