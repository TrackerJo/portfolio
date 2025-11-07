import { useState } from "react";
import "./terminal_buttons.css";

type TerminalButtonProps = {
    onCloseClick?: () => void;
    onMinimizeClick?: () => void;
    onMaximizeClick?: () => void;
};

function TerminalButtons({ onCloseClick, onMinimizeClick, onMaximizeClick }: TerminalButtonProps) {
    const [closeClicked, setCloseClicked] = useState(false);
    const [minimizeClicked, setMinimizeClicked] = useState(false);
    const [maximizeClicked, setMaximizeClicked] = useState(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
        <div className="terminal-buttons">
            <div className={`terminal-button close ${closeClicked ? "terminal-button-clicked" : ""}`} onClick={() => {
                setCloseClicked(true);
                if (onCloseClick) onCloseClick();
                setTimeout(() => {
                    setCloseClicked(false);
                }, 150);
            }}></div>
            <div className={`terminal-button minimize ${minimizeClicked ? "terminal-button-clicked" : ""}`} onClick={() => {
                setMinimizeClicked(true);
                if (onMinimizeClick) onMinimizeClick();
                setTimeout(() => {
                    setMinimizeClicked(false);
                }, 150);
            }}></div>
            <div className={`terminal-button maximize ${maximizeClicked ? "terminal-button-clicked" : ""}`} onClick={() => {
                setMaximizeClicked(true);

                // if (onMaximizeClick && !isMobile) onMaximizeClick();
                
                setTimeout(() => {
                    setMaximizeClicked(false);
                }, 150);
            }}></div>
        </div>
    );
}

export default TerminalButtons;