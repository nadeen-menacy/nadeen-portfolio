import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const projects = [
  {
    id: "stockflow", title: "StockFlow", type: "Full-stack inventory system", year: "2026",
    description: "StockFlow is a multi-user inventory management web application built to help a team manage stock through one shared workspace instead of scattered spreadsheets. The first person to create a workspace becomes its administrator, who can approve incoming team members and control what each employee is allowed to do. The system brings together a product catalogue, categories, stock-in and stock-out activity, supplier records, purchase orders, and an inventory dashboard so that day-to-day operations can be followed from one place. I developed the React front end and Node.js API with PostgreSQL as the database, and worked on workspace membership, role-based permissions, and the rules that protect shared inventory data. I also used Playwright to test key user journeys, including the main flows that staff and managers rely on. The project gave me practical experience connecting interface design, API logic, relational data, and multi-user access into one application.",
    stack: ["React", "Node.js", "PostgreSQL", "Vite", "Playwright"],
    images: ["/assets/stockflow-dashboard.png", "/assets/stockflow-products.png", "/assets/stockflow-categories.png", "/assets/stockflow-scan.png"],
    repoUrl: "https://github.com/nadeen-menacy/StockFlow.git",
    linkLabel: "Open StockFlow repository",
    videoUrl: null
  },
  {
    id: "jobfinder", title: "Telegram Job Finder", type: "Bilingual Chrome extension", year: "2026",
    description: "Telegram Job Finder is a bilingual Chrome extension designed to make job searching through Telegram groups more organised and less time-consuming. It scans vacancy messages on Telegram Web and understands both Arabic and English listings, then compares the job title and description with technical keywords and a Computer Science-focused profile. Its relevance filter prioritises opportunities in software development, IT, AI, data, and cybersecurity, helping reduce unrelated results. Each listing can show a match score and the keywords that made it relevant, while keeping the Telegram chat link separate from the actual application link. The tool also brings job discovery and follow-up into one place: listings can be saved, application progress can be tracked, and personal notes can be added. Results can be exported to CSV for reviewing or organising opportunities outside the browser. The project focuses on turning a fast-moving stream of group messages into a searchable list of opportunities that are easier to compare and follow up.",
    stack: ["JavaScript", "Chrome Extensions API", "HTML", "CSS"],
    images: ["/assets/job-finder-dashboard.png", "/assets/job-finder-listings.png"],
    repoUrl: "https://github.com/nadeen-menacy/telegram-job-finder",
    linkLabel: "Open GitHub repository",
    videoUrl: null
  },
  {
    id: "sonder", title: "Sonder", type: "Real-time chat application", year: "2025",
    description: "Sonder is a full-stack messaging application built around the experience of finding people and having conversations in one place. Users can create an account or sign in, search through contacts, send and manage friend requests, open individual conversations, and view their profile information. The interface also includes settings for adjusting the look of the application, so the experience is more than a basic chat screen. Messages are delivered in real time using Socket.IO, allowing conversations to update without repeatedly refreshing the page. React powers the client interface, while Node.js and Express handle the server side and MongoDB stores the application data. A key part of the work was bringing authentication, user profiles, contact management, and live messaging together so that the different screens behave as one connected product. The project helped me work across the full stack and understand how the front end, server, database, and real-time communication layer need to coordinate.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    images: ["/assets/sonder-01.png", "/assets/sonder-02.png", "/assets/sonder-03.png", "/assets/sonder-04.png", "/assets/sonder-05.png", "/assets/sonder-06.png"],
    repoUrl: "https://github.com/nadeen-menacy/sonder",
    demoUrl: "https://sonder-cyan.vercel.app",
    linkLabel: "Open GitHub repository",
    videoUrl: null
  },
  {
    id: "ipod", title: "iPod Mood Mirror", type: "Hardware + software experiment", year: "2025",
    description: "The iPod Mood Mirror is an interactive installation that reimagines the familiar iPod as an oversized, room-scale mirror and mood-based music player. Visitors choose from four music moods—Jazz, Chill R&B, Happy, and Arabic—and the installation responds by playing tracks from the matching music collection. The interface is designed to be controlled both on screen and, optionally, through physical buttons and a rotary encoder, connecting a recognisable product interaction with a larger installation. The software runs on a laptop: Python manages the application, Flask serves the web interface, and pygame handles music playback. An Arduino can be connected over USB for physical button and rotary-encoder input; the project documentation also describes optional LED lighting and hardware setup. The web interface can be opened from other devices on the same network, while the physical controls and browser interface are designed to stay in sync. The project explores how a familiar consumer-electronics interface can be translated into an interactive experience that brings together mood, music, light, and physical space.",
    stack: ["Arduino", "C++", "Python", "Hardware integration"],
    images: ["/assets/ipod-mood-mirror.jpg"],
    downloadUrl: "/assets/ipod-mood-mirror-source.zip",
    linkLabel: "Download project files",
    videoUrl: null
  }
];

const skills = [
  ["Languages", "JavaScript", "Java", "Python", "C++", "C"],
  ["Web", "React", "Node.js", "Express", "HTML", "CSS"],
  ["Data & tools", "MongoDB", "PostgreSQL", "Socket.io", "REST APIs", "Git"],
  ["Currently exploring", "AI", "NLP", "Arduino", "Creative tech"]
];

const windowTitles = {
  welcome: "Nadeen_Menacy.exe — Welcome",
  projects: "My Projects",
  about: "About_Me.txt — Notepad",
  skills: "System Properties — Skills",
  contact: "Contact — Outlook Express",
  resume: "Nadeen_Menacy_CV.pdf"
};

function DesktopIcon({ icon, label, onClick, selected }) {
  return (
    <button className={`desktop-icon ${selected ? "selected" : ""}`} onClick={onClick} type="button">
      <span className="desktop-icon-art">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function TitleBar({ title, onMinimize, onClose, onMaximize }) {
  return (
    <div className="titlebar">
      <span className="window-app-icon">✿</span>
      <span className="window-title">{title}</span>
      <div className="window-controls">
        <button title="Minimize" onClick={onMinimize}>_</button>
        <button title="Maximize" onClick={onMaximize}>□</button>
        <button className="close-control" title="Close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

function ProjectContent({ project }) {
  return (
    <div className="project-content">
      <div className="project-topline"><span>PROJECT FILE</span><span>{project.year}</span></div>
      <h2>{project.title}</h2>
      <p className="project-type">{project.type}</p>
      <p className="project-description">{project.description}</p>
      <div className="file-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
      {project.images?.length > 0 && (
        <div className={`project-shots ${project.id === "ipod" ? "single-project-shot" : ""} ${project.id === "sonder" ? "sonder-project-shots" : ""}`}>
          {project.images.map((src, index) => (
            <a className="project-shot-link" href={src} target="_blank" rel="noreferrer" key={src} aria-label={`Open ${project.title} image ${index + 1}`}>
              <img src={src} alt={`${project.title} ${project.id === "ipod" ? "installation photo" : `screenshot ${index + 1}`}`} loading="lazy" />
              <span className="shot-caption">{project.id === "ipod" ? "Installation photo" : `Screenshot ${index + 1}`}</span>
            </a>
          ))}
        </div>
      )}
      {project.videoUrl && (
        <div className="project-video">
          <h3>Project video</h3>
          <video controls preload="metadata" playsInline>
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      )}
      <div className="project-actions">
        {project.repoUrl && <a className="aero-button primary" href={project.repoUrl} target="_blank" rel="noopener noreferrer">{project.linkLabel || "Open GitHub repository"} ↗</a>}
        {project.demoUrl && <a className="aero-button" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Open live demo ↗</a>}
        {project.downloadUrl && <a className="aero-button primary" href={project.downloadUrl} download>{project.linkLabel || "Download project files"} ↓</a>}
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("welcome");
  const [booting, setBooting] = useState(true);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const [openWindows, setOpenWindows] = useState(["welcome"]);
  const [minimized, setMinimized] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [maximized, setMaximized] = useState([]);
  const [zOrder, setZOrder] = useState(["welcome"]);
  const [dragging, setDragging] = useState(null);
  const [positions, setPositions] = useState({});
  const desktopRef = useRef(null);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => { setBooting(false); setShowWelcomeToast(true); }, 1500);
    const toastTimer = window.setTimeout(() => setShowWelcomeToast(false), 7500);
    return () => { window.clearTimeout(bootTimer); window.clearTimeout(toastTimer); };
  }, []);

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kuwait", hour: "2-digit", minute: "2-digit"
    }).format(new Date()));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const stop = () => setDragging(null);
    window.addEventListener("pointerup", stop);
    return () => window.removeEventListener("pointerup", stop);
  }, []);

  const openWindow = (id) => {
    setOpenWindows((old) => old.includes(id) ? old : [...old, id]);
    setMinimized((old) => old.filter((item) => item !== id));
    setActive(id);
    setZOrder((old) => [...old.filter((item) => item !== id), id]);
    setStartOpen(false);
  };

  const closeWindow = (id) => {
    setOpenWindows((old) => old.filter((item) => item !== id));
    setMinimized((old) => old.filter((item) => item !== id));
    setMaximized((old) => old.filter((item) => item !== id));
    const remaining = openWindows.filter((item) => item !== id && !minimized.includes(item));
    setActive(remaining[remaining.length - 1] || "");
  };

  const minimizeWindow = (id) => {
    setMinimized((old) => [...old.filter((item) => item !== id), id]);
    const remaining = openWindows.filter((item) => item !== id && !minimized.includes(item));
    setActive(remaining[remaining.length - 1] || "");
  };

  const focusWindow = (id) => {
    setActive(id);
    setZOrder((old) => [...old.filter((item) => item !== id), id]);
  };

  const beginDrag = (event, id) => {
    if (maximized.includes(id) || event.target.closest("button")) return;
    const rect = event.currentTarget.parentElement.getBoundingClientRect();
    setDragging({ id, startX: event.clientX, startY: event.clientY, left: rect.left, top: rect.top });
  };

  const moveDrag = (event) => {
    if (!dragging) return;
    const bounds = desktopRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const left = Math.max(0, Math.min(bounds.width - 250, dragging.left + event.clientX - dragging.startX));
    const top = Math.max(0, Math.min(bounds.height - 110, dragging.top + event.clientY - dragging.startY));
    setPositions((old) => ({ ...old, [dragging.id]: { left, top } }));
  };

  const toggleMaximize = (id) => setMaximized((old) => old.includes(id) ? old.filter((x) => x !== id) : [...old, id]);

  const iconItems = [
    ["welcome", "👩🏻‍💻", "Welcome.exe"],
    ["projects", "📁", "My Projects"],
    ["about", "📝", "About Me"],
    ["skills", "🖥️", "Skills"],
    ["contact", "✉️", "Contact"],
    ["resume", "📄", "My CV.pdf"]
  ];

  const renderWindowBody = (id) => {
    if (id === "welcome") return (
      <div className="welcome-content">
        <div className="welcome-photo"><img src="/assets/nadeen-portrait.png" alt="Nadeen Menacy" /><span className="photo-pin">HELLO, WORLD!</span></div>
        <div className="welcome-copy">
          <div className="window-kicker">USER PROFILE // 001</div>
          <h1>Hey, I’m<br /><em>Nadeen.</em></h1>
          <p className="welcome-role">Computer Science graduate · Software Developer</p>
          <p>I build useful things for the digital world — from full-stack products to little experiments that make everyday life easier.</p>
          <div className="welcome-actions">
            <button className="aero-button primary" onClick={() => openWindow("projects")}>Explore my work <span>→</span></button>
            <button className="aero-button" onClick={() => openWindow("about")}>A little about me</button>
          </div>
          <div className="welcome-status"><i /> AVAILABLE FOR OPPORTUNITIES</div>
        </div>
      </div>
    );
    if (id === "projects") return (
      <div className="explorer-content">
        <div className="explorer-toolbar"><span>←</span><span>→</span><span>↑</span><div>📁 This PC　›　Projects</div><span>⌕</span></div>
        <div className="explorer-main">
          <aside className="explorer-sidebar"><b>Favourites</b><span>⭐ Quick access</span><span>🖥 Desktop</span><span>📁 Documents</span><span>📥 Downloads</span><b>This PC</b><span>💽 Local Disk (C:)</span></aside>
          <div className="explorer-files">
            <div className="folder-heading">Projects <small>4 items</small></div>
            <div className="project-file-grid">
              {projects.map((project, index) => (
              <div key={project.id} className="project-file-card">
                <button className="project-file" onClick={() => openWindow(project.id)} type="button">
                  <span>{index === 0 ? "📊" : index === 1 ? "🌐" : index === 2 ? "💬" : "🎵"}</span>
                  <b>{project.title}</b>
                  <small>{project.type}</small>
                </button>
                <div className="project-file-actions">
                  <button type="button" onClick={() => openWindow(project.id)}>View details</button>
                  {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
                  {project.downloadUrl && <a href={project.downloadUrl} download>Files ↓</a>}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="explorer-footer">4 items　　Open details or use a direct project link</div>
      </div>
    );
    
if (id === "about") return (
  <div className="notepad-content">
    <div className="notepad-menu">File　 Edit　 Format　 View　 Help</div>

    <h2>HELLO, I'M NADEEN.</h2>

    <p>
      I'm an Egyptian Computer Science graduate from the University of
      Debrecen, with a genuine interest in technology and building things
      that make everyday life easier.
    </p>

    <p>
      I enjoy looking at problems from different perspectives and finding
      smart, practical solutions. I'm naturally curious, quick to adapt
      to new environments, and always interested in learning something
      new. When I take on a project, I like to give it my full attention
      and see it through.
    </p>

    <p>
      I enjoy working on ideas that bring together creativity and
      technology, whether that's developing an application, improving
      an existing process, or exploring a completely new concept.
    </p>

    <p>
      I value being someone a team can rely on. I enjoy taking initiative,
      approaching challenges with an open mind, and turning ideas into
      solutions that are both useful and thoughtfully built. I'm
      comfortable stepping outside my comfort zone and taking on new
      challenges.
    </p>

    <p>
      I'm always looking for opportunities to grow, challenge myself,
      and contribute to work that has a real purpose.
    </p>

    <hr />

    <b>EDUCATION</b>
    <p>BSc Computer Science · University of Debrecen, Hungary · 2021–2026 · GPA 3.5</p>

    <b>EXPERIENCE</b>
    <p>Software Development Intern · STC Kuwait · December 2024 – February 2025</p>

    <b>LANGUAGES</b>
    <p>Arabic · English</p>

    <b>INTERESTS</b>
    <p>Artificial Intelligence · Software Development · Creative Technology · Problem Solving</p>

    <p className="notepad-signature">— Nadeen</p>
  </div>
);

    if (id === "skills") return (
      <div className="skills-content">
        <div className="system-tabs"><span className="active-tab">General</span><span>Hardware</span><span>Network</span></div>
        <div className="system-intro"><div className="computer-illustration">🖥️</div><div><h2>System Properties</h2><p>A little overview of the tools in my toolbox.</p></div></div>
        <div className="skills-list">{skills.map(([title, ...items]) => <div key={title}><b>{title}</b><p>{items.map((item) => <span key={item}>{item}</span>)}</p></div>)}</div>
        <div className="cert-list"><b>Certificates</b><p>NVIDIA — Building AI-Based Cybersecurity Pipelines</p><p>NVIDIA — Building AI Agents with Multimodal Models</p><p>NVIDIA — Fundamentals of Deep Learning</p><p>NVIDIA — Applications of AI for Anomaly Detection</p></div>
      </div>
    );
    if (id === "contact") return (
      <div className="contact-content">
        <div className="mail-icon">✉</div><h2>Let’s make<br />something happen.</h2>
        <p>Have a role, a project, or an interesting problem? I’d love to hear about it.</p>
        <a href="mailto:nadinemenessy22@gmail.com">✉　Email: nadinemenessy22@gmail.com</a>
        <a href="tel:+96550903064">☎　Phone: +965 50903064</a>
        <a href="https://www.linkedin.com/in/nadeen-menacy-184738294/" target="_blank" rel="noopener noreferrer">in　LinkedIn profile ↗</a>
        <a href="https://github.com/nadeen-menacy" target="_blank" rel="noopener noreferrer">⌘　GitHub profile ↗</a>
      </div>
    );
    if (id === "resume") return (
      <div className="resume-content">
        <div className="pdf-ribbon">PDF DOCUMENT　·　NADEEN MENACY</div>
        <h2>Nadeen Menacy</h2>
        <h3>Software Developer</h3>
        <p>Computer Science graduate · University of Debrecen</p>
        <p className="resume-note">Download my résumé or my academic documents, including my degree, transcripts and certificates.</p>
        <div className="resume-actions">
          <a className="aero-button primary" href="/assets/Nadeen-Menacy-Resume.pdf" download="Nadeen-Menacy-Resume.pdf">
            Download PDF of my résumé ↓
          </a>
          <a className="aero-button" href="/assets/Nadeen-Academic-Documents.pdf" download="Nadeen-Academic-Documents.pdf">
            Download my certificates & degree ↓
          </a>
        </div>
      </div>
    );
    const project = projects.find((item) => item.id === id);
    return project ? <ProjectContent project={project} /> : null;
  };

  const isProject = (id) => projects.some((project) => project.id === id);

  return (
    <div className="desktop-shell" ref={desktopRef} onPointerMove={moveDrag}>
      {booting && <div className="boot-screen" role="status" aria-label="Starting desktop"><div className="boot-logo">⊞</div><div className="boot-wordmark">Starting Windows</div><div className="boot-progress"><span /></div><small>NADEEN MENACY · PERSONAL DESKTOP</small></div>}
      <div className="wallpaper">
        <div className="wallpaper-sun" />
        <div className="wallpaper-cloud cloud-one" /><div className="wallpaper-cloud cloud-two" />
        <div className="wallpaper-caption">A LITTLE CORNER OF THE INTERNET <span>✳</span></div>
      </div>

      <div className="desktop-icons">
        {iconItems.map(([id, icon, label]) => <DesktopIcon key={id} icon={icon} label={label} selected={selectedIcon === id} onClick={() => { setSelectedIcon(id); openWindow(id); }} />)}
        <DesktopIcon icon="🗑️" label="Recycle Bin" selected={selectedIcon === "trash"} onClick={() => { setSelectedIcon("trash"); openWindow("welcome"); }} />
      </div>

      {openWindows.filter((id) => !minimized.includes(id)).map((id) => {
        const order = zOrder.indexOf(id);
        const isMax = maximized.includes(id);
        const position = positions[id];
        return (
          <section
            key={id}
            className={`aero-window ${id === "welcome" ? "welcome-window" : ""} ${isProject(id) ? "project-detail-window" : ""} ${id === "about" ? "about-detail-window" : ""} ${isMax ? "maximized" : ""} ${active === id ? "window-active" : "window-inactive"}`}
            style={{ zIndex: 5 + Math.max(0, order), ...(position && !isMax ? { left: position.left, top: position.top, transform: "none" } : {}) }}
            onPointerDown={() => focusWindow(id)}
          >
            <div onPointerDown={(event) => beginDrag(event, id)}>
              <TitleBar title={isProject(id) ? `${projects.find((p) => p.id === id).title} — Project` : windowTitles[id]} onMinimize={() => minimizeWindow(id)} onClose={() => closeWindow(id)} onMaximize={() => toggleMaximize(id)} />
            </div>
            <div className="window-body">{renderWindowBody(id)}</div>
            <div className="window-resize-corner">◢</div>
          </section>
        );
      })}

      {startOpen && <div className="start-menu">
        <div className="start-user"><div className="user-avatar">N</div><div><b>Nadeen Menacy</b><small>Software Developer</small></div></div>
        <div className="start-menu-columns">
          <div className="start-programs">
            {iconItems.slice(0, 5).map(([id, icon, label]) => <button key={id} onClick={() => openWindow(id)}><span>{icon}</span>{label}</button>)}
          </div>
          <div className="start-links"><b>Places</b><button onClick={() => openWindow("projects")}>📁 My Projects</button><button onClick={() => openWindow("skills")}>🖥 System Properties</button><button onClick={() => openWindow("resume")}>📄 My CV</button><button onClick={() => openWindow("contact")}>✉ Contact</button></div>
        </div>
        <div className="start-search">⌕　Search programs and files</div>
        <div className="start-bottom"><span>All Programs　›</span><button onClick={() => setStartOpen(false)}>Close menu ⏻</button></div>
      </div>}

      <div className="taskbar">
        <button className={`start-orb ${startOpen ? "start-pressed" : ""}`} onClick={() => setStartOpen(!startOpen)} aria-label="Open Start menu"><span>⊞</span></button>
        <div className="taskbar-divider" />
        {openWindows.map((id) => <button key={id} className={`taskbar-app ${active === id && !minimized.includes(id) ? "task-active" : ""}`} onClick={() => minimized.includes(id) ? openWindow(id) : active === id ? minimizeWindow(id) : focusWindow(id)}><span>{id === "projects" || isProject(id) ? "📁" : id === "about" ? "📝" : id === "contact" ? "✉️" : id === "skills" ? "🖥️" : "👩🏻‍💻"}</span><small>{isProject(id) ? projects.find((p) => p.id === id).title : windowTitles[id]?.split(" ")[0] || id}</small><span className="taskbar-preview"><b>{isProject(id) ? projects.find((p) => p.id === id).title : windowTitles[id]}</b><i>{isProject(id) ? "Project window" : "Application window"}</i></span></button>)}
        <div className="taskbar-spacer" />
        <div className="system-tray"><span>⌃</span><span>◖</span><span>🔊</span><div>{clock}<small>13/11/2026</small></div></div>
        <div className="show-desktop" title="Show desktop" onClick={() => setMinimized(openWindows)}> </div>
      </div>
      {showWelcomeToast && !booting && <div className="welcome-toast"><span className="toast-icon">✉</span><div><b>Welcome!</b><small>You are now on Nadeen's desktop.</small></div><button onClick={() => setShowWelcomeToast(false)} aria-label="Dismiss notification">×</button></div>}
      <div className="desktop-hint">DOUBLE-CLICK AN ICON TO EXPLORE <span>✳</span></div>
    </div>
  );
}

export default App;
