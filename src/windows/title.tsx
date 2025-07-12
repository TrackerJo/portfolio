import "./title.css";

const TitleWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
    return (
        <div className="terminal-window" onClick={handleTerminalButtonClick}>
            <div className="terminal-header">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
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
                            {`     ╔═══════════════════════════════╗
     ║  > Currently coding in:       ║
     ║    • React                    ║
     ║    • Python                   ║
     ║    • Dart                     ║
     ║                               ║
     ║  > Coffee consumed today: 4   ║
     ║  > Commits pushed: 23         ║
     ║  > Issues closed: 7           ║
     ╚═══════════════════════════════╝`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleWindow;