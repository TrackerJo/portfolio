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

type Application = 'about' | 'projects' | 'projects_plus' | 'skills' | 'experience' | 'contact' | 'github' | 'title' | 'help';

const useUrlParam = (param: string, onChange: (value: string) => void) => {
  useEffect(() => {
    console.log("just loaded")
    const urlParams = new URLSearchParams(window.location.search);
    const application = urlParams.get(param);
    if (application) {
      onChange(application);
    }

  }, [])

  useEffect(() => {
    const eventHandler = (event: PopStateEvent) => {
      const newValue = event.state?.[param]
      onChange(newValue);
    }
    window.addEventListener("popstate", eventHandler);
    return () => {
      window.removeEventListener("popstate", eventHandler);
    }
  }, []);
}



const Portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCookieWindowOpen, setIsCookieWindowOpen] = useState(false);
  const [currentWindow, setCurrentWindow] = useState<JSX.Element>(<TitleWindow />);
  const [currentCommand, setCurrentCommand] = useState('whoami');
  const [currentApplication, setCurrentApplication] = useState<Application>('title');
  const [viewingProject, setViewingProject] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [closedWindow, setClosedWindow] = useState<boolean>(false);


  const Application = (application: Application) => {
    switch (application) {
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow onClick={(project) => {
          setSelectedProject(project);
          setViewingProject(true);
        }} />;
      case 'projects_plus':
        return <ProjectsPlusWindow onClick={(project) => {
          setSelectedProject(project);
          setViewingProject(true);
        }} />;
      case 'skills':
        return <SkillsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'github':
        return <GitHubStatsWindow />;
      case 'title':
        return <TitleWindow />;
      case 'help':
        return <HelpWindow />;
    }
  }




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

  useUrlParam('application', (application) => {
    console.log("URL param changed to:", application);

    enterCommand(application ?? 'whoami', { pushState: false });

  })

  const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).replace('_', ' ');
  const switchApplication = (application: Application) => {
    history.pushState({ application }, titleCase(application), `?application=${application}`);
    setCurrentApplication(application);
  }

  const enterCommand = (command: string, { pushState = true }: { pushState?: boolean } = {}) => {
    switch (command.toLowerCase()) {
      case 'about':
        if (pushState)
          history.pushState({ application: "about" }, "About", "?application=about");
        setCurrentWindow(<AboutWindow />);
        break;
      case 'projects':
        if (pushState)
          history.pushState({ application: "projects" }, "Projects", "?application=projects");
        setCurrentWindow(<ProjectsWindow onClick={(project) => {
          setSelectedProject(project);
          setViewingProject(true);
        }} />);
        break;
      case 'projects +':
        if (pushState)
          history.pushState({ application: "projects_plus" }, "Projects+", "?application=projects_plus");
        setCurrentWindow(<ProjectsPlusWindow onClick={(project) => {
          setSelectedProject(project);
          setViewingProject(true);
        }} />);
        break;
      case 'skills':
        if (pushState)
          history.pushState({ application: "skills" }, "Skills", "?application=skills");
        setCurrentWindow(<SkillsWindow />);
        break;
      case 'experience':
        if (pushState)
          history.pushState({ application: "experience" }, "Experience", "?application=experience");
        setCurrentWindow(<ExperienceWindow />);
        break;
      case 'contact':
        if (pushState)
          history.pushState({ application: "contact" }, "Contact", "?application=contact");
        setCurrentWindow(<ContactWindow />);
        break;
      case 'github':
        if (pushState)
          history.pushState({ application: "github" }, "GitHub Stats", "?application=github");
        setCurrentWindow(<GitHubStatsWindow />);
        break;
      case 'whoami':
        if (pushState)
          history.pushState({ application: "whoami" }, "whoami", "?application=whoami");
        setCurrentWindow(<TitleWindow />);
        break;
      case 'resume':
        window.open("https://firebasestorage.googleapis.com/v0/b/campusconnect-9.firebasestorage.app/o/public%2FNathaniel_Kemme_Nash_s_Resume_2025.pdf?alt=media&token=2fed3036-0576-4a72-9d77-00c53ebc1ddf", '_blank');
        break;
      case 'help':
        if (pushState)
          history.pushState({ application: "help" }, "Help", "?application=help");
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

  const onClose = () => {
    setClosedWindow(true);
    setTimeout(() => {
      setClosedWindow(false);
    }, 1000)
  }

  return (
    <div className={"portfolio " + (isCookieWindowOpen || viewingProject ? "no-scroll" : "")}>

      <div className="terminal-container">
        {!closedWindow ? <Terminal onClose={onClose} command={currentCommand} enterCommand={enterCommand} isFocused={!isCookieWindowOpen && !viewingProject} >
          {currentWindow}

        </Terminal> : <p style={{ textAlign: 'center' }}>Oops! You aren't supposed to see this!</p>
        }


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
    </div >
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
)

export default Portfolio;