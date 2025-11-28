import { useEffect, useRef, useState, type JSX } from 'react';
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
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Terminal from './components/terminal';
import HelpWindow from './windows/help';
import ProjectsPlusWindow from './windows/projects_plus';
import ProjectInfoWindow from './windows/project_info';
import type { Project } from './projects_list';




const Portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCookieWindowOpen, setIsCookieWindowOpen] = useState(false);
  const [currentWindow, setCurrentWindow] = useState<JSX.Element>(<TitleWindow />);
  const [currentCommand, setCurrentCommand] = useState('whoami');

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

  const enterCommand = (command: string) => {


    switch (command.toLowerCase()) {
      case 'about':
        setCurrentWindow(<AboutWindow />);
        break;
      case 'projects':
        setCurrentWindow(<ProjectsWindow onClick={(project) => {
          setSelectedProject(project);
          setViewingProject(true);
        }} />);
        break;
      case 'projects +':
        setCurrentWindow(<ProjectsPlusWindow onClick={(project) => {
          setSelectedProject(project);
          setViewingProject(true);
        }} />);
        break;
      case 'skills':
        setCurrentWindow(<SkillsWindow />);
        break;
      case 'experience':
        setCurrentWindow(<ExperienceWindow />);
        break;
      case 'contact':
        setCurrentWindow(<ContactWindow />);
        break;
      case 'github':
        setCurrentWindow(<GitHubStatsWindow />);
        break;
      case 'whoami':
        setCurrentWindow(<TitleWindow />);
        break;
      case 'resume':
        window.open("https://firebasestorage.googleapis.com/v0/b/campusconnect-9.firebasestorage.app/o/public%2FNathaniel_Kemme_Nash_s_Resume_2025.pdf?alt=media&token=2fed3036-0576-4a72-9d77-00c53ebc1ddf", "_blank");
        break;
      case 'help':
        setCurrentWindow(<HelpWindow />);
        break;
      case 'open cookieclicker':
        console.log("Opening Cookie Clicker...");

        setIsCookieWindowOpen(true);
        break;
      default:
        const lowerCommandSplit = command.toLowerCase().split(" ");
        if (lowerCommandSplit[0] === "projects" && lowerCommandSplit.length > 1) {
          const projectName = lowerCommandSplit.slice(1).join(" ");
          const allProjects: Project[] = [...(selectedProject ? [selectedProject] : []), ...(selectedProject ? [] : [])];
          import('./projects_list').then(({ projects }) => {
            const foundProject = projects.find(p => p.title.toLowerCase() === projectName);
            if (foundProject) {
              setSelectedProject(foundProject);
              setViewingProject(true);
              return true;
            }
            return false;

          });
        }
        return false;


    }
    if (command != 'open CookieClicker') {
      setCurrentCommand(command);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return true
  }




  return (
    <div className={"portfolio " + (isCookieWindowOpen || viewingProject ? "no-scroll" : "")}>

      <div className="terminal-container">
        <Terminal command={currentCommand} enterCommand={enterCommand} isFocused={!isCookieWindowOpen && !viewingProject} >
          {currentWindow}

        </Terminal>


        <div className="footer">
          <p>© 2025 Nathaniel Kemme Nash</p>
        </div>
      </div>
      <canvas ref={canvasRef} className="matrix-canvas" />
      {viewingProject && selectedProject ?
        <ProjectInfoWindow project={selectedProject} onClose={() => {
          setSelectedProject(undefined);
          setViewingProject(false);
        }} /> : null}
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