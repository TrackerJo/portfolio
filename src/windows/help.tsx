import { availableCommands } from "../constants";
import "./help.css";


const HelpWindow = () => {




    return (

        <>
            <div className="hero-text">
                <h1>Commands</h1>
                <div className="commands-list">
                    {availableCommands.map((command, index) => (
                        <p><strong>{command.command}</strong> - {command.description}</p>
                    ))}
                </div>
            </div>
        </ >

    );
};

export default HelpWindow;