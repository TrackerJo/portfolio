import "./cookie.css";

import Cookie from '../assets/cookie.png';
import { useState, useRef, useEffect } from "react";
import Upgrade, { type UpgradeType } from "../components/upgrade";
import type { ClickTextProps } from "../components/click_text";
import ClickText from "../components/click_text";
import type { ClickCookieProps } from "../components/click_cookie";
import ClickCookie from "../components/click_cookie";
import Terminal from "../components/terminal";

const CookieWindow = ({ onClose }: { onClose: () => void }) => {
    const [isMobile, setIsMobile] = useState(false);




    const [prevCommand, setPrevCommand] = useState("open CookieClicker");
    const [availableCommands, setAvailableCommands] = useState<string[]>(["why", "open CookieClicker", "save", "exit"]);

    const [viewingWhy, setViewingWhy] = useState(false);


    const [cookieClicked, setCookieClicked] = useState(false);
    const [cookies, setCookies] = useState(0);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
    const [upgrades, setUpgrades] = useState<UpgradeType[]>([
        { name: "Cursor", price: 15, backgroundPosition: [0, 0], cps: 0.1, count: 0 },
        { name: "Grandma", price: 100, backgroundPosition: [0, -64], cps: 1, count: 0 },
        { name: "Farm", price: 1100, backgroundPosition: [0, -192], cps: 8, count: 0 },
        { name: "Mine", price: 12000, backgroundPosition: [0, -256], cps: 47, count: 0 },
        { name: "Factory", price: 130000, backgroundPosition: [0, -320], cps: 260, count: 0 },
        { name: "Bank", price: 1400000, backgroundPosition: [0, -384], cps: 1400, count: 0 },
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
        if (prevCommand === "why") {
            setAvailableCommands(["open CookieClicker", "exit"]);
        } else if (prevCommand === "open CookieClicker") {
            setAvailableCommands(["why", "save", "wipe", "exit"]);
        }
    }, [prevCommand]);


    useEffect(() => {
        const interval = setInterval(() => {

            setCookies((prev) => Math.round((prev + cookiesPerSecond) * 10) / 10);
        }, 1000);
        return () => clearInterval(interval);
    }, [cookiesPerSecond]);

     useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);


    const saveToLocalStorage = () => {
        const gameState = {
            cookies,
            cookiesPerSecond,
            upgrades,
        };
        localStorage.setItem('cookieClickerGameState', JSON.stringify(gameState));
    };

    const loadFromLocalStorage = () => {
        const savedState = localStorage.getItem('cookieClickerGameState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            setCookies(gameState.cookies);
            setCookiesPerSecond(gameState.cookiesPerSecond);
            setUpgrades(gameState.upgrades);
           
        }
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            saveToLocalStorage();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cookies, cookiesPerSecond, upgrades]);


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
            <Terminal command={prevCommand} hideTraditionalPortfolioLink={true} isSticky={true} isFocused={true} commands={availableCommands} enterCommand={(command: string) => {
                switch (command) {
                    case "why":
                        setPrevCommand(command);

                        setViewingWhy(true);
                        return true;
                    case "open CookieClicker":
                        setPrevCommand(command);

                        setViewingWhy(false);
                        return true;
                    case "save":
                        setPrevCommand(command);
                        setTimeout(() => {
                            console.log("Game saved!");
                            setPrevCommand("open CookieClicker");
                        }, 1500);

                        saveToLocalStorage();
                        return true;
                    case "wipe":
                        setPrevCommand(command);
                        setTimeout(() => {
                            console.log("Game wiped!");
                            setPrevCommand("open CookieClicker");
                        }, 1500);

                        localStorage.removeItem('cookieClickerGameState');
                        setCookies(0);
                        setCookiesPerSecond(0);
                        setUpgrades([
                            { name: "Cursor", price: 15, backgroundPosition: [0, 0], cps: 0.1, count: 0 },
                            { name: "Grandma", price: 100, backgroundPosition: [0, -64], cps: 1, count: 0 },
                            { name: "Farm", price: 1100, backgroundPosition: [0, -192], cps: 8, count: 0 },
                            { name: "Factory", price: 12000, backgroundPosition: [0, -256], cps: 47, count: 0 },
                            { name: "Mine", price: 130000, backgroundPosition: [0, -320], cps: 260, count: 0 },
                            { name: "Shipment", price: 1400000, backgroundPosition: [0, -384], cps: 1400, count: 0 },
                        ]);
                        return true;
                    case "exit":
                        setPrevCommand(command);

                        onClose();
                        return true;

                    default:
                        return false;
                }


            }} onClose={() => {
                saveToLocalStorage();
                onClose();
            }}>

                {prevCommand === "open CookieClicker" ?
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





                    : prevCommand == 'why' ? <div className="hero-section" >

                        <div className="hero-text" ref={whyHeroRef}>
                            <p>Now, you may be asking why is there Cookie Clicker built in to this mans portfolio? And that's a very reasonable question to ask. The answer is fairly simple. As a kid, I played a lot of Cookie Clicker, so when I learned to code the first thing I wanted to make was Cookie Clicker. And as I started to learn more programming languages, instead of making the traditional ToDo app, I would make Cookie Clicker. So I decided that Cookie Clicker deserved a special place in my portfolio as it helped me learn to code.</p>

                        </div>





                    </div> : prevCommand == 'save' ? <div className="hero-section" >
                        <div className="hero-text">
                            <p>Saving game...</p>
                        </div>
                    </div> : prevCommand == 'wipe' ? <div className="hero-section" >
                        <div className="hero-text">
                            <p>Wiping game...</p>
                        </div>
                    </div> : null}



            </Terminal >
        </div >
    );
};

export default CookieWindow;