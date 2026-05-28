import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';

import FallingCookieSection from '../FallingCookie/falling_cookie_section';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

import type { Project } from '../projects_list';
import AboutWindow from '../windows/about';
import Terminal from '../components/terminal';
import TitleWindow from '../windows/title';
import ExperienceWindow from '../windows/experience';
import ProjectsWindow from '../windows/projects';
import ProjectInfoWindow from '../windows/project_info';
import SkillsWindow from '../windows/skills';
import GitHubStatsWindow from '../windows/github_stats';
import ContactWindow from '../windows/contact';
import CookieWindow from '../windows/cookie';






const Portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCookieWindowOpen, setIsCookieWindowOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>();







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
        <Terminal isVertical={true} command={'whoami'} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
          <TitleWindow />
        </Terminal>
        <Terminal isVertical={true} fullText='curl -O https://trackerjo.github.io/resume.pdf' command={'glow about_me.md'} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
           <AboutWindow  />
        </Terminal>
       
        {/* Experience Terminal */}
        <Terminal isVertical={true} command={'./experience.sh --list'} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
         <ExperienceWindow  />
        </Terminal>
        {/* Projects Terminal */}
        <Terminal isVertical={true} command={'cat projects.json | jq \'.\''} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
          <ProjectsWindow onClick={(project) => {
            setSelectedProject(project);
            setViewingProject(true);
          }} />
        </Terminal>
        {/* Skills Terminal */}
        <Terminal isVertical={true} command={'./skills.sh --list'} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
          <SkillsWindow  />
        </Terminal>
        {/* GitHub Stats Terminal */}
        <Terminal isVertical={true} command={'./github_stats.sh --user TrackerJo'} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
          <GitHubStatsWindow  />
        </Terminal>
        {/* Contact Terminal */}
        <Terminal isVertical={true} command={'./contact.sh --channels'} enterCommand={function (command: string): boolean {
          throw new Error('Function not implemented.');
        } } isFocused={false} >
          <ContactWindow  />
        </Terminal>
        <div className="footer">
          <p>© 2025 Nathaniel Kemme Nash</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="matrix-canvas" />
      {
        viewingProject && selectedProject ?
          <ProjectInfoWindow project={selectedProject} onClose={() => {
            setSelectedProject(undefined);
            setViewingProject(false);
          }} /> : null
      }
      {isCookieWindowOpen ? <CookieWindow onClose={() => setIsCookieWindowOpen(false)} /> : <FallingCookieSection onCookieClick={() => setIsCookieWindowOpen(true)} />}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
)

export default Portfolio;