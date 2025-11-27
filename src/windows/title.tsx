
import "./title.css";

const TitleWindow = () => {


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
        </ >

    );
};

export default TitleWindow;