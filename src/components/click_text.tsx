import "./click_text.css";

export type ClickTextProps = {
    x: number;
    y: number;
    id: string; // Optional ID for tracking or unique identification
    onAnimationEnd?: (id: string) => void; // Optional callback for animation end
};

function ClickText({ x, y, onAnimationEnd, id }: ClickTextProps) {
    return (
        <div className="click-text" style={{ left: `${x}px`, top: `${y}px` }} onAnimationEnd={() => {
            if (onAnimationEnd) {
                onAnimationEnd(id);
            }
        }}>
            <span className="click-text-content">+ 1</span>
        </div>
    );
}

export default ClickText;