import "./click_cookie.css";
import Cookie from '../assets/cookie.png';

export type ClickCookieProps = {
    x: number;
    y: number;
    fallLeft: boolean; // Optional prop to determine if the cookie falls left or right
    scale: number; // Optional scale for the click text
    id: string; // Optional ID for tracking or unique identification
    onAnimationEnd?: (id: string) => void; // Optional callback for animation end
};

function ClickCookie({ x, y, onAnimationEnd, id, scale, fallLeft }: ClickCookieProps) {
    return (

        <div className="click-cookie" style={{ left: `${x}px`, top: `${y}px`, animation: `${fallLeft ? "fadeOutCookieLeft" : "fadeOutCookieRight"} 2s forwards ease-out` }} onAnimationEnd={() => {
            if (onAnimationEnd) {
                onAnimationEnd(id);
            }
        }}>
            <img src={Cookie} alt="Click Cookie" style={{ scale: `${scale}` }} />

        </div>
    );
}

export default ClickCookie;