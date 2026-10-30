import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Github,
  Layers3, Linkedin, Mail, Menu, Moon, Palette, Send, Sun, X,
} from "lucide-react";
import { experience, profile, projects, skills, socialLinks } from "./content";

const navItems = [["About", "#about"], ["Work", "#work"], ["Journey", "#journey"], ["Contact", "#contact"]];
const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

function SectionHeading({ label, title, note }: { label: string; title: ReactNode; note?: string }) {
  return <div className="section-heading"><div><Eyebrow>{label}</Eyebrow><h2>{title}</h2></div>{note && <p className="section-note">{note}</p>}</div>;
}

function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${profile.name} home`}><span className="wordmark-mark">a.</span><span>alex morgan</span></a>
      <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-availability" href="#contact" onClick={() => setMenuOpen(false)}><span className="availability-dot" /> Open to opportunities</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button theme-toggle" onClick={onToggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <a className="header-contact" href="#contact">Say hello <ArrowUpRight size={14} /></a>
        <button className="icon-button menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <motion.div initial="hidden" animate="visible" variants={reveal}>
          <Eyebrow>BEGINNER SOFTWARE DEVELOPER</Eyebrow>
          <h1>Learning by<br />building <span className="serif-word">things.</span></h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">See what I’m learning <ArrowDownRight size={16} /></a><a className="text-link" href="#contact">Let’s connect <ArrowUpRight size={15} /></a></div>
          <div className="hero-socials" aria-label="Social profiles">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} profile`}>{social.short}</a>)}
            <span className="social-divider" /><span className="location-label">{profile.location}</span>
          </div>
        </motion.div>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
        <div className="hero-image-frame"><img src={profile.image} alt="Profile portrait placeholder" /><div className="photo-caption"><span>AM</span> Learning something new <ArrowDown size={13} /></div></div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-note"><span className="note-spark">✳</span><span>Curious by<br />nature.</span></div><div className="hero-index">01 <span>—</span> 04</div>
      </motion.div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      <div className="hero-bottom-note">A WORK IN PROGRESS — JUST LIKE THE REST OF US.</div>
    </section>
  );
}

function About() {
  return (
    <section className="section-wrap about-section" id="about">
      <SectionHeading label="A LITTLE ABOUT ME" title={<>Starting curious.<br /><span className="serif-word">Growing every day.</span></>} note="A beginning is a good place to start." />
      <div className="about-grid">
        <div className="about-aside"><div className="about-monogram">am<span>.</span></div><p>Currently focused on<br /><strong>learning by making.</strong></p><a className="text-link" href="#journey">Explore my journey <ArrowDownRight size={15} /></a></div>
        <div className="about-copy"><p>{profile.about}</p><p>{profile.aboutSecond}</p><div className="about-values"><span>01 / Stay curious</span><span>02 / Make useful things</span><span>03 / Keep learning</span></div></div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-band" aria-labelledby="skills-title"><div className="section-wrap skills-inner">
      <div className="skills-intro"><Eyebrow>MY LEARNING TOOLKIT</Eyebrow><h2 id="skills-title">Building a<br /><span className="serif-word">foundation.</span></h2><p>Skills I’m learning and tools I’m exploring. This list will grow over time.</p></div>
      <div className="skills-list">{skills.map((group, index) => <div className="skill-group" key={group.category}><span className="skill-number">0{index + 1}</span><div><h3>{group.category}</h3><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div></div>)}</div>
    </div></section>
  );
}

function Projects() {
  return (
    <section className="section-wrap work-section" id="work">
      <SectionHeading label="PRACTICE & EXPLORATIONS" title={<>Small steps.<br /><span className="serif-word">Real learning.</span></>} note="Sample beginner project ideas — replace with projects you have actually built." />
      <div className="project-grid">{projects.map((project) => <motion.article className="project-card" key={project.number} whileHover={{ y: -5 }} transition={{ duration: .25 }}>
        <div className={`project-art ${project.theme}`}><span className="project-art-label">{project.type}</span><span className="project-art-mark">{project.mark}</span><span className="project-art-lines" aria-hidden="true"><i /><i /><i /></span><a className="project-arrow" href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} demo`}><ArrowUpRight size={20} /></a></div>
        <div className="project-meta"><span>{project.number} / 03</span><span>EDITABLE EXAMPLE</span></div><h3>{project.name}</h3><p>{project.description}</p>
        <div className="project-footer"><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`}><Github size={15} /></a><a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ArrowUpRight size={16} /></a></div></div>
      </motion.article>)}</div>
    </section>
  );
}

function Journey() {
  return (
    <section className="experience-section" id="journey"><div className="section-wrap">
      <SectionHeading label="LEARNING & EXPERIENCE" title={<>The journey<br /><span className="serif-word">so far.</span></>} note="Editable examples, not claims of professional experience." />
      <div className="timeline">{experience.map((item, index) => <motion.article className="timeline-item" key={item.date} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal}>
        <div className="timeline-date">{item.date}</div><div className="timeline-marker"><span>{index === experience.length - 1 ? "EDU" : `0${index + 1}`}</span></div>
        <div className="timeline-content"><h3>{item.role}</h3><span className="timeline-company">{item.company}</span><p>{item.description}</p></div><ArrowUpRight className="timeline-arrow" size={17} />
      </motion.article>)}</div>
    </div></section>
  );
}

function Services() {
  const items = [
    { icon: <Code2 size={19} />, number: "01", title: "Web development", text: "Interested in building responsive, accessible websites and learning how to make them work well." },
    { icon: <Layers3 size={19} />, number: "02", title: "Software development", text: "Practicing the fundamentals of writing clear code and turning small ideas into working projects." },
    { icon: <Palette size={19} />, number: "03", title: "UI / UX", text: "Exploring thoughtful interfaces, useful design patterns, and the details that make products easier to use." },
  ];
  return <section className="section-wrap services-section"><SectionHeading label="AREAS I’M EXPLORING" title={<>Learning to make<br /><span className="serif-word">useful things.</span></>} /><div className="service-grid">{items.map((item) => <article className="service-card" key={item.number}><div className="service-top">{item.icon}<span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><a href="#contact" aria-label={`Ask about ${item.title}`}><ArrowUpRight size={17} /></a></article>)}</div></section>;
}

function Contact() {
  const [status, setStatus] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("Please complete each field before sending.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app is opening with your message ready to send.");
    event.currentTarget.reset();
  }
  return (
    <section className="contact-section" id="contact"><div className="section-wrap contact-wrap">
      <div className="contact-intro"><Eyebrow>LET’S CONNECT</Eyebrow><h2>Every good<br />thing starts<br />with <span className="serif-word">hello.</span></h2><p>I’m open to learning from others, connecting with fellow developers, and hearing about opportunities for someone just starting out.</p><a className="contact-email" href={`mailto:${profile.email}`}><Mail size={17} />{profile.email}<ArrowUpRight size={15} /></a><div className="contact-socials">{socialLinks.slice(0, 2).map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={13} /></a>)}</div></div>
      <form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><span>SEND A QUICK NOTE</span><span>01 — 03</span></div>
        <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" placeholder="Jane Smith" autoComplete="name" required />
        <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="jane@example.com" autoComplete="email" required />
        <label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="What would you like to talk about?" rows={3} required />
        <button className="button button-dark submit-button" type="submit">Prepare email <Send size={15} /></button>
        <p className="form-footnote" role="status" aria-live="polite">{status || "This form opens your email app; it does not send data to a server."}</p>
      </form>
    </div></section>
  );
}

function Footer() {
  return <footer className="site-footer section-wrap">
    <a className="footer-brand" href="#home"><span className="wordmark-mark">a.</span><span>Alex Morgan<br /><small>Beginner Software Developer</small></span></a>
    <nav aria-label="Footer navigation">{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Alex Morgan. Made while learning.</span><a href="#home">Back to top <ArrowUpRight size={13} /></a><span className="footer-location"><span className="availability-dot" /> {profile.location}</span></div>
  </footer>;
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") === "dark"; }
    catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); }
    catch { /* Theme still works for this session when storage is unavailable. */ }
  }, [dark]);
  return <div className="app-shell"><Header dark={dark} onToggle={() => setDark(!dark)} /><main><Hero /><About /><Skills /><Projects /><Journey /><Services /><Contact /></main><Footer /><div className="floating-mark" aria-hidden="true"><Linkedin size={14} /><span>BUILT ONE STEP AT A TIME</span></div></div>;
}
