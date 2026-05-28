import Deckly from "./assets/projects/deckly.png";
import LayItOut from "./assets/projects/layItOut.png";
import UPlate from "./assets/projects/uplate.png";
import Javaish from "./assets/projects/ProfessorJavaish.png";
import ShiftMate from "./assets/projects/shiftmate.png";
import CampusConnect from "./assets/projects/campusConnect.png";
import Snippets from "./assets/projects/snippets.png";
import ProjectLog from "./assets/projects/projectlog.png";
import HTMLRefactor from "./assets/projects/htmlrefactor.png";
import RobotMailSender from "./assets/projects/robotMail.png";
import DecklyDemo from "./assets/projects/deckly_demo.mp4";
import JavaishDemo from "./assets/projects/javaish_demo.mp4";
import ShiftMateDemo from "./assets/projects/shiftmate_demo.mp4";
import CampusConnectDemo from "./assets/projects/campus_connect_demo.mp4";
import SnippetsDemo from "./assets/projects/snippets_demo.mp4";
import ProjectLogDemo from "./assets/projects/project_log_demo.webm";
import HTMLRefactorDemo from "./assets/projects/html_refactor_demo.webm";
import UPlateDemo from "./assets/projects/uplate_demo.mp4";


export interface Project {
    title: string;
    subtitle: string;
    status: string;
    description: string[];
    technologies: string[];
    links: { label: string; href: string }[];
    icon: string;
    demo?: string;
    demoWidth?: number;
    demoHeight?: number;
}

export const projects: Project[] = [
    {
        title: 'UPlate',
        subtitle: 'Smart Meal Planning for Campus Dining',
        status: 'Published',
        description: [
            'A meal planning app built specifically for college students that syncs directly with campus dining hall menus.',
            'Uses AI-driven recommendations to suggest meals based on fitness goals such as cutting, maintaining, or bulking.',
            'Supports dietary restrictions including allergies, vegetarian, vegan, halal, and kosher, filtering out foods users cannot eat.',
            'Users can easily log meals and track nutrition with a built-in food diary.',
            'Includes searchable and favoritable dining hall items with full nutritional information, helping students make confident food choices.'
        ],
        technologies: [
            'Dart (Flutter)',
            'Firebase',
            'Cloud Functions',
            'REST APIs',
            'AI / RAG',
            'Cloudflare'
        ],
        links: [
            { label: 'product', href: 'https://u-plate.com' },
            // { label: 'github', href: '#' }
        ],
        icon: UPlate,
        demo: UPlateDemo,
        demoWidth: 720,
        demoHeight: 1556
    },
    {
        title: 'LayItOut',
        subtitle: 'Venue Design & Layout Website',
        status: 'Freelance',
        description: ['Create custom venue layouts quickly and easily with LayItOut, a web app that allows companies to create venue templates to send to clients to desing the layout for their event', 'Features drag-and-drop functionality, customizable furniture and decor items, and real-time booth maps for events like a farmers market'],
        technologies: ['React.ts', 'Firebase'],
        links: [
            { label: 'website', href: 'https://lay-it-out.com/' },
        ],
        icon: LayItOut,

    },
    {
        title: 'Deckly',
        subtitle: 'Bluetooth & Online Card Game Platform',
        status: 'App Store',
        description: ['Enables real-time multiplayer gameplay using a client-server Bluetooth LE architecture for offline local play.', 'Connects clients to a host device over Bluetooth and supports online matchmaking via Firebase backend.', 'AI opponents provide solo play.', 'Responsive UI and minimal latency for a smooth gameplay experience.'],
        technologies: ['Dart (Flutter)', 'Firebase', 'Bluetooth LE'],
        links: [
            { label: 'app', href: 'https://apps.apple.com/us/app/deckly-cards-with-friends/id6746527909' },
            { label: 'github', href: 'https://github.com/TrackerJo/deckly' },
            // { label: 'docs', href: '#' }
        ],
        icon: Deckly,
        demo: DecklyDemo,
        demoHeight: 1288,
        demoWidth: 750,
    },
    {
        title: 'Javaish',
        subtitle: 'A Custom Programming Language for Beginners',
        status: 'FEATURED',
        description: ['A hand made programming language that is a mix of popular programming languages and English.', 'Designed to help beginners learn to code, with a focus on simplicity and readability.', 'Alongside a custom compiler, it includes a web-based IDE with syntax highlighting, code completion, and a custom line-by-line debugger.'],
        technologies: ['Java', 'React.js', 'TeaVM'],
        links: [
            { label: 'IDE', href: 'https://trackerjo.github.io/ProfessorJavaish/    ' },
            { label: 'github', href: 'https://github.com/TrackerJo/Javaish' },
            { label: 'slideshow', href: 'https://docs.google.com/presentation/d/1cWa6pa6btzCKTbh4yDYVNZGC_aGPY99N2ixCo83qcX8/edit?usp=sharing' },
            { label: 'research paper', href: 'https://pdfhost.io/v/Dq6nbqQG8X_Javaish_Research_Paper' }
        ],
        icon: Javaish,
        demo: JavaishDemo,
        demoHeight: 225,
        demoWidth: 361,
    },
    {
        title: 'ShiftMate',
        subtitle: 'Employee Scheduling Made Simple',
        status: 'SaaS',
        description: ['Simplifies employee scheduling with a real-time shift management system built using Flutter and Firebase.', 'Supports manager-assigned shifts, employee availability tracking, and syncs with Google Calendar.', 'Real-time updates and notifications ensure teams stay informed.', 'Intuitive UI and scalable backend architecture for teams of any size.'],
        technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud', 'Google Calendar API', 'Google OAuth'],
        links: [
            { label: 'product', href: 'https://trackerjo.github.io/ShiftMate/' },
            // { label: 'docs', href: '#' }
        ],
        icon: ShiftMate,
        demo: ShiftMateDemo,
        demoHeight: 1294,
        demoWidth: 750,
    },
    {
        title: 'Campus Connect',
        subtitle: 'High School Student Engagement Platform',
        status: 'SaaS',
        description: ['Unifies scheduling and activity management for students, teachers, and parents.', 'Students manage activities, commutes, and opportunities.', 'Teachers create synced schedules and communicate in-app.', 'Parents track their child’s activities—all with real-time communication and easy calendar integration.'],
        technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud', 'Google Maps API', 'React.ts'],
        links: [
            { label: 'product', href: 'https://campusconnects.net/' },
            // { label: 'github', href: '#' },
            // { label: 'docs', href: '#' }
        ],
        icon: CampusConnect,
        demo: CampusConnectDemo,
        demoWidth: 750,
        demoHeight: 1292
    },
    {
        title: 'Snippets',
        subtitle: 'A Social Media App for Meaningful Conversations',
        status: 'First App',
        description: ['A social media app designed to spark meaningful conversations through random daily questions.', 'Users answer prompts before viewing their friends’ responses, encouraging authentic sharing and thoughtful discussion.', 'With features like anonymous weekly questions and public snippet contests, Snippets reimagines social media as a tool for connection—not consumption.'],
        technologies: ['Dart (Flutter)', 'Firebase', 'Google Cloud'],
        links: [
            { label: 'app', href: 'https://us-central1-snippets2024.cloudfunctions.net/updateLink' },
        ],
        icon: Snippets,
        demo: SnippetsDemo,
        demoWidth: 404,
        demoHeight: 696,
    },
    {
        title: 'Project Log',
        subtitle: 'A VSCode Extension for Project & Task Management',
        status: 'Open Source',
        description: ['A custom built VSCode extension that helps you manage your projects and tasks.', 'It allows you to add project specific tasks and resources and has a built-in timer with automatic timeout detection to help you track your time spent on each project.'],
        technologies: ['TypeScript', 'VSCode API', 'CSS', 'HTML'],
        links: [
            { label: 'extension', href: 'https://marketplace.visualstudio.com/items?itemName=TrackerJo.project-log' },
            {
                label: 'github', href: 'https://github.com/TrackerJo/project-log'
            }
        ],
        icon: ProjectLog,
        demo: ProjectLogDemo
    },
    {
        title: 'HTML Refactor',
        subtitle: 'A VSCode Extension for Refactoring HTML & CSS',
        status: 'Open Source',
        description: ['A VSCode extension that helps you keep track of and refactor class and id names in your HTML and CSS files.', 'It allows you to rename classes and ids in your HTML and CSS files, and automatically updates all references to the renamed class or id.', 'It also adds classes and ids to VSCode’s IntelliSense for HTML and CSS.'],
        technologies: ['TypeScript', 'VSCode API', 'CSS', 'HTML'],
        links: [
            { label: 'extension', href: 'https://marketplace.visualstudio.com/items?itemName=TrackerJo.html-refactoring' },
            { label: 'github', href: 'https://github.com/TrackerJo/html-refactoring' }
        ],
        icon: HTMLRefactor,
        demo: HTMLRefactorDemo

    },
    {
        title: 'Robot Mail Sender',
        subtitle: 'A Custom Solution for Sending Photos taken by a Robot',
        status: 'Robot',
        description: ['A custom solution for sending photos taken by a robot.', 'It uses SFTP and SSH to securely transfer files from the robot to a server, and then the servers hosts a simple web interface to get the user’s email and send the photos via SMTP.', 'This was desgined as a marketing tool for a High School\'s Computer Science program, allowing students to send photos taken by a robot to their parents.'],
        technologies: ['Python', 'SMTP', 'SFTP', 'SSH', 'HTTP', 'HTML', 'CSS'],
        links: [

            {
                label: 'github', href: 'https://github.com/TrackerJo/NAOMailServer'

            }
        ],
        icon: RobotMailSender
    }


];

export interface Podcast {
    title: string;
    url: string;
    authors: string[];
    image: string;

}

export const podcasts: Podcast[] = [
    {
        title: "How I Built This",
        url: "https://open.spotify.com/show/6E709HRH7XaiZrMfgtNCun?si=1b87f885dacf4a68",
        authors: ["Guy Raz"],
        image: "https://content.production.cdn.art19.com/images/56/ae/46/57/56ae4657-2aa7-4cfc-8ddf-9be24410d5ed/781b7c7456c4b4d737191d7d009103a65c82794270b41e7e37a4c1fb2eb8b0c9f357d6da20ed4b5c26fc2ffbca054866e0da65a9212969493500399e65e8f90f.jpeg"
    },
    {
        title: "StartUp Podcast",
        url: "https://open.spotify.com/show/5CnDmMUG0S5bSSw612fs8C?si=361c7399e8fb4b76",
        authors: ["Gimlet"],
        image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/3e/7e/da/3e7eda2d-d968-33c5-fbfa-e68d0f43aae4/mza_17561063681009474062.jpg/600x600bb.webp"
    },
    {
        title: "Founders",
        url: "https://open.spotify.com/show/7txiovdzPARhjm18NwMUYj?si=ccc02cff28e74d87",
        authors: ["David Senra"],
        image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/ed/71/4f/ed714f67-f095-a4ef-f38e-d8c02300666a/mza_11432355988627368701.jpg/600x600bb.webp"
    },
    {
        title: "Acquired",
        url: "https://open.spotify.com/show/7Fj0XEuUQLUqoMZQdsLXqp?si=7eb9c7bad8264bfb",
        authors: ["Ben Gilbert", "David Rosenthal"],
        image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/43/c5/fb/43c5fbdf-b302-053a-2704-ba5f74322625/mza_13119989780540450831.jpg/600x600bb.webp"
    }
];

export interface Command {
    command: string;
    description: string;
}

export const availableCommands: Command[] = [
    { command: 'whoami', description: 'View the title page' },
    { command: 'about', description: 'Learn more about me' },
    { command: 'projects', description: 'View my projects' },
    { command: 'skills', description: 'See my technical skills' },
    { command: 'experience', description: 'Check out my work experience' },
    { command: 'github', description: 'View my Github statistics' },
    { command: 'podcasts', description: 'View my favorite podcasts' },
    { command: 'resume', description: 'Download my resume' },
    { command: 'contact', description: 'Get in touch' },
    { command: 'help', description: 'Display a list of available commands' },
];

export const asciiArtTextOptions: string[] = [
    "Hello World!",
    "Keep Building",
    "Make an Impact",
    "Never Stop Learning",
    "Always Innovate",
    "Make Memories"
];