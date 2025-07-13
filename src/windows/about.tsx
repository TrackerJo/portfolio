import "./about.css";

import ProfilePic from "../assets/profile.png";

const AboutWindow = ({ handleTerminalButtonClick }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void }) => {
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
                </div>
            </div>
        </div>
    );
};

export default AboutWindow;