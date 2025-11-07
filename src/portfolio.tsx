import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import ContactWindow from './windows/contact';
import SkillsWindow from './windows/skills';
import ProjectsWindow from './windows/projects';
import TitleWindow from './windows/title';
import AboutWindow from './windows/about';

import CookieWindow from './windows/cookie';
import FallingCookieSection from './FallingCookie/falling_cookie_section';
import ExperienceWindow from './windows/experience';
import GitHubStatsWindow from './windows/github_stats';



const Portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCookieWindowOpen, setIsCookieWindowOpen] = useState(false);







  // Matrix effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = "01";
    const drops: number[] = [];
    const fontSize = 14;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const columns = canvas.width / fontSize;
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#7ee787';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const interval = setInterval(draw, 35);


    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);

    };



  }, []);

  const handleTerminalButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // const target = e.target as HTMLElement;
    // if (target.classList.contains('terminal-button')) {
    //   target.style.transform = 'scale(0.9)';
    //   setTimeout(() => {
    //     target.style.transform = 'scale(1)';
    //   }, 150);
    // }
  };

  return (
    <div className="portfolio">

      <div className="terminal-container">
        {/* Main Terminal Window */}
        <TitleWindow handleTerminalButtonClick={handleTerminalButtonClick} />
        <AboutWindow handleTerminalButtonClick={handleTerminalButtonClick} listenToEnter={!isCookieWindowOpen} />
        {/* Experience Terminal */}
        <ExperienceWindow handleTerminalButtonClick={handleTerminalButtonClick} />

        {/* Projects Terminal */}
        <ProjectsWindow handleTerminalButtonClick={handleTerminalButtonClick} listenToEnter={!isCookieWindowOpen} />

        {/* Skills Terminal */}
        <SkillsWindow handleTerminalButtonClick={handleTerminalButtonClick} />

        {/* GitHub Stats Terminal */}
        <GitHubStatsWindow handleTerminalButtonClick={handleTerminalButtonClick} />

        {/* Contact Terminal */}
        <ContactWindow handleTerminalButtonClick={handleTerminalButtonClick} />

        <div className="footer">
          <p>© 2025 Nathaniel Kemme Nash</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="matrix-canvas" />

      {isCookieWindowOpen ? <CookieWindow handleTerminalButtonClick={handleTerminalButtonClick} onClose={() => setIsCookieWindowOpen(false)} /> : <FallingCookieSection onCookieClick={() => setIsCookieWindowOpen(true)} />}
    </div>
  );
};

export default Portfolio;