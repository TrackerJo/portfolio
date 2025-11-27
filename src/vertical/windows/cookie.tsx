import "./cookie.css";

import Cookie from '../../assets/cookie.png';
import { useState, useRef, useEffect } from "react";
import Upgrade, { type UpgradeType } from "../../components/upgrade";
import type { ClickTextProps } from "../../components/click_text";
import ClickText from "../../components/click_text";
import type { ClickCookieProps } from "../../components/click_cookie";
import ClickCookie from "../../components/click_cookie";

const CookieWindow = ({ handleTerminalButtonClick, onClose }: { handleTerminalButtonClick: (e: React.MouseEvent<HTMLDivElement>) => void; onClose: () => void }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [typingTextWhy, setTypingTextWhy] = useState('');
    const [typingTextApp, setTypingTextApp] = useState('');


    const [prevCommand, setPrevCommand] = useState("open -a CookieClicker");
    const fullTextWhy = "clear && less why_cookie_clicker.txt";
    const fullTextApp = "clear && open -a CookieClicker.app";
    const [viewingWhy, setViewingWhy] = useState(false);
    const [hasFinishedTypingWhy, setHasFinishedTypingWhy] = useState(false);
    const [hasFinishedTypingApp, setHasFinishedTypingApp] = useState(false);

    const [cookieClicked, setCookieClicked] = useState(false);
    const [cookies, setCookies] = useState(0);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
    const [upgrades, setUpgrades] = useState<UpgradeType[]>([
        { name: "Cursor", price: 15, backgroundPosition: [0, 0], cps: 0.1, count: 0 },
        { name: "Grandma", price: 100, backgroundPosition: [0, -64], cps: 1, count: 0 },
        { name: "Farm", price: 1100, backgroundPosition: [0, -192], cps: 8, count: 0 },
        { name: "Factory", price: 12000, backgroundPosition: [0, -256], cps: 47, count: 0 },
        { name: "Mine", price: 130000, backgroundPosition: [0, -320], cps: 260, count: 0 },
        { name: "Shipment", price: 1400000, backgroundPosition: [0, -384], cps: 1400, count: 0 },
    ]);
    const [cookiesClickText, setCookiesClickText] = useState<ClickTextProps[]>([]);
    const [cookiesClick, setCookiesClick] = useState<ClickCookieProps[]>([]);
    const cookieHeroRef = useRef<HTMLDivElement>(null);
    const whyHeroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {

            setCookies((prev) => Math.round((prev + cookiesPerSecond) * 10) / 10);
        }, 1000);
        return () => clearInterval(interval);
    }, [cookiesPerSecond]);

    useEffect(() => {
        if (!viewingWhy) {
            let i = 0;
            const timer = setInterval(() => {
                if (i < fullTextWhy.length) {
                    setTypingTextWhy(fullTextWhy.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(timer);
                    setHasFinishedTypingApp(false);

                    setHasFinishedTypingWhy(true);
                    setTypingTextApp('');
                }
            }, 100);

            return () => clearInterval(timer);
        } else {
            let i = 0;
            const timer = setInterval(() => {
                if (i < fullTextApp.length) {
                    setTypingTextApp(fullTextApp.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(timer);
                    setHasFinishedTypingApp(true);
                    setHasFinishedTypingWhy(false);
                    setTypingTextWhy('');
                }
            }, 100);

            return () => clearInterval(timer);
        }
    }, [viewingWhy]);

    useEffect(() => {
        function handleEnterKeyPress(e: KeyboardEvent) {
            if (!viewingWhy) {
                if (typingTextWhy === fullTextWhy && hasFinishedTypingWhy && e.key === 'Enter') {
                    setViewingWhy(true);
                    setTimeout(() => {
                        if (whyHeroRef.current) {
                            whyHeroRef.current.scrollTop = 0;
                        }
                    }, 0);
                }
            } else {
                if (typingTextApp === fullTextApp && hasFinishedTypingApp && e.key === 'Enter') {
                    setViewingWhy(false);
                    setTimeout(() => {
                        if (cookieHeroRef.current) {
                            cookieHeroRef.current.scrollTop = 0;
                        }
                    }, 0);
                    setPrevCommand("clear && open -a CookieClicker.app");

                }
            }

        }

        if (hasFinishedTypingWhy || hasFinishedTypingApp) {
            document.addEventListener('keydown', handleEnterKeyPress);
            return () => document.removeEventListener('keydown', handleEnterKeyPress);
        }
    }, [typingTextWhy, fullTextWhy, hasFinishedTypingWhy, typingTextApp, fullTextApp, hasFinishedTypingApp, viewingWhy]);

    function onCookieClick(e: React.MouseEvent<HTMLImageElement>) {
        setCookies((prev) => prev += 1);
        let clickX = e.clientX - (cookieHeroRef.current?.getBoundingClientRect().left || 0);
        //Add or remove 5 from clickX randomly
        clickX += Math.floor(Math.random() * 10) - 5;
        let clickY = e.clientY - (cookieHeroRef.current?.getBoundingClientRect().top || 0) / 2 - 10;
        clickY += Math.floor(Math.random() * 10) - 5;
        const clickId = Date.now() + Math.random().toString(36).substring(2, 15);
        setCookiesClickText((prev) => [...prev, { x: clickX, y: clickY, id: clickId }]);
        //scale between 0.3 and 0.5
        const scale = Math.random() * 0.01 + 0.05;
        const fallLeft = Math.random() < 0.5; // 50% chance to fall left
        setCookiesClick((prev) => [...prev, { x: clickX, y: clickY, id: clickId, scale: scale, fallLeft: fallLeft }]);
    }

    function onCookieTextAnimationEnd(id: string) {
        setCookiesClickText((prev) => prev.filter((text) => text.id !== id));
    }

    function onCookieClickAnimationEnd(id: string) {
        setCookiesClick((prev) => prev.filter((text) => text.id !== id));
    }

    function styleCookies(cookies: number, includeDecimal: boolean): string {
        let styledCookies = "";
        let cookiesDecimal = cookies % 1;
        const cookiesString = Math.floor(cookies).toString();


        const cookiesArray = cookiesString.toString().split('');
        cookiesArray.reverse();
        const cookiesStringR = cookiesArray.join('');
        for (let i = 0; i < cookiesStringR.length; i++) {
            const element = cookiesStringR[i];
            if ((styledCookies.length + 1) % 4 == 0) {
                styledCookies += ","
            }
            styledCookies += element;




        }
        const styledCookiesArray = styledCookies.split('');
        styledCookiesArray.reverse();
        return styledCookiesArray.join('') + (includeDecimal ? (cookiesDecimal > 0 ? cookiesDecimal.toFixed(1).toString().substring(1) : "") : "");
    }

    return (
        <div className="sticky-background">
            <div className="terminal-window sticky" onClick={handleTerminalButtonClick}>
                <div className="terminal-header">
                    <div className="terminal-button close" onClick={onClose}></div>
                    <div className="terminal-button minimize"></div>
                    <div className="terminal-button maximize"></div>
                    <div className="terminal-title">cookieClicker.app</div>
                </div>
                <div className="terminal-content">
                    {!viewingWhy ? <div className="hero-section">

                        <div className="output">
                            <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">{prevCommand}</span>
                        </div>
                        <div className="hero-content" ref={cookieHeroRef}>
                            <div className="cookie-section">
                                <div className="cookie-info">
                                    <h2 className="cookies-text">{styleCookies(cookies, false)} cookies</h2>
                                    <h4 className="cookies-per-second-text">per second: {styleCookies(cookiesPerSecond, true)}</h4>
                                </div>


                                <img src={Cookie} alt="Cookie" className={`cookie-image ${cookieClicked ? "clicked" : ""}`} onMouseDown={() => setCookieClicked(true)} onMouseUp={() => setCookieClicked(false)} onClick={(e) => onCookieClick(e)} />
                                <div className="click-cookies">
                                    {cookiesClick.map((cookie) => (
                                        <ClickCookie key={cookie.id} x={cookie.x} y={cookie.y} id={cookie.id} scale={cookie.scale} onAnimationEnd={onCookieClickAnimationEnd} fallLeft={cookie.fallLeft} />
                                    ))}
                                </div>
                                <div className="click-texts">
                                    {cookiesClickText.map((text) => (
                                        <ClickText key={text.id} x={text.x} y={text.y} id={text.id} onAnimationEnd={onCookieTextAnimationEnd} />
                                    ))}
                                </div>

                            </div>
                            <div className="store-section">
                                <h2 className="store-title">Store</h2>
                                <div className="upgrades">
                                    {upgrades.map((upgrade, index) => (
                                        <Upgrade key={index} canUpgrade={cookies >= upgrade.price} upgrade={upgrade} onUpgrade={() => {
                                            setCookies((prev) => Math.round((prev - upgrade.price) * 10) / 10);
                                            setCookiesPerSecond((prev) => Math.round((prev + upgrade.cps) * 10) / 10);
                                            setUpgrades((prev) => prev.map((u) => u.name === upgrade.name ? { ...u, price: Math.round(u.price * 1.15), count: u.count + 1 } : u));
                                        }} />
                                    ))
                                    }

                                </div>


                            </div>

                        </div>

                        <div className="prompt-section">
                            <span className="prompt" >nathaniel@portfolio:~$</span><span className={`command ${viewingWhy ? "" : "typing-animation"}`}>{isMobile && <br></br>}{typingTextWhy}</span> {typingTextWhy == fullTextWhy && !viewingWhy ? <button className="project-enter-button" onClick={() => {
                                setViewingWhy(true); setTimeout(() => {
                                    if (whyHeroRef.current) {
                                        whyHeroRef.current.scrollTop = 0;
                                    }
                                }, 0);
                            }} >↵</button> : null}
                        </div>


                    </div> : <div className="hero-section" >
                        <div className="output">
                            <span className="prompt">nathaniel@portfolio:~$</span> <span className="command">clear && less why_cookie_clicker.txt</span>
                        </div>
                        <div className="hero-text" ref={whyHeroRef}>
                            <p>Now, you may be asking why is there Cookie Clicker built in to this mans portfolio? And that's a very reasonable question to ask. The answer is fairly simple. As a kid, I played a lot of Cookie Clicker, so when I learned to code the first thing I wanted to make was Cookie Clicker. And as I started to learn more programming languages, instead of making the traditional ToDo app, I would make Cookie Clicker. So I decided that Cookie Clicker deserved a special place in my portfolio as it helped me learn to code.</p>

                        </div>

                        <div className="prompt-section">
                            <span className="prompt">nathaniel@portfolio:~$</span><span className={`command ${!viewingWhy ? "" : "typing-animation"}`}>{isMobile && <br></br>}{typingTextApp}</span> {typingTextApp == fullTextApp && viewingWhy ? <button className="project-enter-button" onClick={() => {
                                setViewingWhy(false)
                                setPrevCommand("clear && open -a CookieClicker.app");
                                setTimeout(() => {
                                    if (cookieHeroRef.current) {
                                        cookieHeroRef.current.scrollTop = 0;
                                    }
                                }, 0);
                            }} >↵</button> : null}
                        </div>



                    </div>}

                </div>

            </div >
        </div >
    );
};

export default CookieWindow;