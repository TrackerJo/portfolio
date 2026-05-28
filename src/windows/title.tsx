
import React, { useEffect, useState } from "react";
import "./title.css";
import { asciiArtTextOptions } from "../constants";

const TitleWindow: React.FC = () => {
    const [optionIndex, setOptionIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = asciiArtTextOptions[optionIndex];
        let timer: ReturnType<typeof setTimeout>;

        if (!isDeleting) {
            if (displayedText.length < current.length) {
                timer = setTimeout(() => {
                    setDisplayedText(current.slice(0, displayedText.length + 1));
                }, 100);
            } else {
                // pause before deleting
                timer = setTimeout(() => setIsDeleting(true), 1800);
            }
        } else {
            if (displayedText.length > 0) {
                timer = setTimeout(() => {
                    setDisplayedText(current.slice(0, displayedText.length - 1));
                }, 50);
            } else {
                // move to next option
                timer = setTimeout(() => {
                    setIsDeleting(false);
                    setOptionIndex((prev) => (prev + 1) % asciiArtTextOptions.length);
                }, 500);
            }
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, optionIndex]);

    return (
        <>
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Nathaniel Kemme Nash</h1>
                    <p>Full Stack & Flutter Developer | Building Impactful Products with Purpose</p>
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
                    <pre>{`________________________________________________
/                                                \\
|    _________________________________________     |
|   |                                         |    |
|   |  C:\\> echo "${displayedText}"${" ".repeat(27 - displayedText.length)}|    |
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
_-.'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-\`__\`. .-.-.-.\`-_
_-.'.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.\`-_
_-.'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.\`-_
:-------------------------------------------------------------------------:
 \`---._.-------------------------------------------------------------._.---`}</pre>
                </div>
            </div>
        </>
    );
};

export default TitleWindow;