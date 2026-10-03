import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Expertise", "expertise"],
  ["Skills", "tools"],
  ["Education", "education"],
  ["Achievements", "achievements"],
  ["Contact", "contact"],
];

const flow = [
  ["01", "Netlist", "Gate-level design data ready for physical implementation."],
  ["02", "Floorplanning", "Macro, I/O and core planning for a robust layout."],
  ["03", "Power Planning", "Power network architecture across the design."],
  ["04", "Placement", "Timing- and congestion-aware standard cell placement."],
  ["05", "CTS", "Balanced clock distribution and skew management."],
  ["06", "Routing", "Global and detailed signal interconnect."],
  ["07", "Timing Closure", "MCMM setup, hold and design-rule convergence."],
  ["08", "Verification", "DRC, LVS, ERC and antenna sign-off checks."],
  ["09", "GDSII Sign-off", "Final manufacturing-ready layout database."],
];

const expertise = [
  ["Netlist-to-GDSII", "End-to-end physical implementation ownership."],
  ["Floorplanning", "Macro, I/O and block-level design planning."],
  ["Power Planning", "Reliable power architecture for advanced nodes."],
  ["Power Distribution Network", "PDN analysis and targeted restructuring."],
  ["Placement Optimization", "Timing and congestion-aware optimization."],
  ["Clock Tree Synthesis", "Clock distribution for robust timing."],
  ["Detailed Routing", "Design-rule-aware interconnect realization."],
  ["Congestion Relief", "Early analysis, padding and placement tuning."],
  ["ECO Implementation", "Targeted engineering change implementation."],
  ["Static Timing Analysis", "Setup, hold and design-rule analysis."],
  ["MCMM Timing Closure", "Multi-corner, multi-mode timing convergence."],
  ["Signal Integrity", "Interconnect reliability and noise awareness."],
  ["IR-Drop Mitigation", "Static and dynamic power integrity mitigation."],
  ["Electromigration", "Reliability-aware physical design."],
  ["Physical Verification", "DRC, LVS, ERC and antenna closure."],
];

const experiences = [
  {
    index: "01",
    role: "Senior Physical Design Engineer",
    date: "July 2026 – Present",
    badge: "Current role",
    highlight: "Promoted from Physical Design Intern after ~12 months",
    points: [
      "Achieved full Netlist-to-GDSII sign-off closure for the DISPLAY IP block in a 3nm automotive chipset, measured by clean DRC, LVS, ERC, and antenna results, by driving end-to-end physical verification convergence in Siemens Calibre.",
      "Achieved MCMM timing closure across setup, hold, max transition, and max capacitance corners, by executing targeted Tweaker ECO fixes in PrimeTime.",
      "Achieved mitigation of static and dynamic IR drop on the DISPLAY block by restructuring the Power Distribution Network (PDN) based on PI team reports.",
    ],
  },
  {
    index: "02",
    role: "Physical Design Intern",
    date: "July 2025 – June 2026",
    highlight: "12 months experience",
    points: [
      "Achieved on-time, physically-aware synthesis handoff by executing macro and I/O pin placement and delivering floorplan DEF data to the synthesis team.",
      "Achieved reduced pre-route congestion and improved routability by analyzing early routing congestion maps and applying selective cell padding and macro placement tuning.",
      "Achieved full physical design flow proficiency within the first few months, measured by transition to independent ownership of production IP blocks, by completing an end-to-end Netlist-to-GDSII flow trial.",
    ],
  },
];

function Link({
  href,
  children,
  className = "",
  external = false,
  ...props
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <div className="section-title" role="heading" aria-level={2}>
        {title}
      </div>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function ChipVisual({ compact = false }: { compact?: boolean }) {
  const labels = ["3nm", "MCMM", "STA", "DRC", "LVS", "IR DROP", "PDN", "CTS", "GDSII"];
  return (
    <div className={`chip-scene ${compact ? "compact" : ""}`} aria-label="3D semiconductor chip visualization">
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <div className="chip-shadow" />
      <div className="chip">
        <div className="chip-pins horizontal" />
        <div className="chip-pins vertical" />
        <div className="die">
          <span>CT</span>
          <small>3NM · PHYSICAL DESIGN</small>
          <div className="die-grid" />
        </div>
      </div>
      {!compact &&
        labels.map((label, index) => (
          <span className={`chip-label label-${index + 1}`} key={label}>
            {label}
          </span>
        ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onMouse = (event: globalThis.MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${(event.clientX / window.innerWidth - 0.5) * 12}deg`);
      document.documentElement.style.setProperty("--my", `${(event.clientY / window.innerHeight - 0.5) * -10}deg`);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const magnetic = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--bx", `${(event.clientX - rect.left - rect.width / 2) * 0.08}px`);
    target.style.setProperty("--by", `${(event.clientY - rect.top - rect.height / 2) * 0.08}px`);
  };

  return (
    <main>
      <div className="noise" />
      <nav className={scrolled ? "nav scrolled" : "nav"}>
        <Link href="#home" className="brand" aria-label="Chandrakant Thakare home">
          <span className="brand-mark">CT</span>
          <span className="brand-name">Chandrakant Thakare</span>
        </Link>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(([name, id]) => (
            <Link href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {name}
            </Link>
          ))}
          <Link href="mailto:thakarechandrakant1970@gmail.com" className="resume-button">
            Download Resume
          </Link>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <span />
          <span />
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-content reveal visible">
          <span className="eyebrow">Physical Design Engineer</span>
          <div className="hero-title" role="heading" aria-level={1}>
            Chandrakant
            <br />
            <span>Thakare</span>
          </div>
          <div className="hero-role">Senior Physical Design Engineer</div>
          <div className="hero-meta">VLSI &nbsp;/&nbsp; Physical Design &nbsp;/&nbsp; 3nm Silicon</div>
          <p className="hero-copy">
            Physical Design Engineer with hands-on Netlist-to-GDSII ownership of multiple blocks, specializing in
            timing closure, power integrity mitigation, and sign-off physical verification.
          </p>
          <div className="hero-actions">
            <Link href="#experience" className="primary-button" onMouseMove={magnetic as never}>
              View experience <span>↗</span>
            </Link>
            <Link href="#contact" className="secondary-button">
              Contact me
            </Link>
          </div>
          <div className="socials">
            <Link href="https://github.com/Crthakare" external>GitHub</Link>
            <Link href="https://www.linkedin.com/in/crthakare3004/" external>LinkedIn</Link>
            <Link href="mailto:thakarechandrakant1970@gmail.com">Email</Link>
          </div>
        </div>
        <div className="hero-visual reveal visible">
          <ChipVisual />
          <div className="flow-caption">NETLIST <i /> FLOORPLAN <i /> CTS <i /> GDSII</div>
        </div>
        <div className="scroll-cue">Scroll to explore <span /></div>
      </section>

      <section className="section" id="about">
        <SectionTitle eyebrow="01 / Profile" title="Engineering Profile" />
        <div className="profile-card reveal">
          <div className="profile-copy">
            <span className="quote-mark">“</span>
            <p>Physical Design Engineer with hands-on Netlist-to-GDSII ownership of multiple blocks, specializing in timing closure, power integrity mitigation, and sign-off physical verification.</p>
            <p>Core design and sign-off methodology includes Innovus, MCMM timing closure, ECO implementation, Calibre-based physical verification, IR-drop and PDN analysis, with experience on advanced-node 3nm production silicon.</p>
          </div>
          <div className="stats">
            {[["3nm", "Advanced Node"], ["Netlist → GDSII", "Full Flow"], ["MCMM", "Timing Closure"], ["Sign-off", "Physical Verification"]].map(([value, label]) => (
              <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <SectionTitle eyebrow="02 / Career" title="Professional Experience" intro="Advanced-node implementation, timing convergence, and production sign-off." />
        <div className="timeline">
          {experiences.map((item) => (
            <article className="experience reveal" key={item.index}>
              <div className="timeline-index">{item.index}</div>
              <div className="experience-card">
                <div className="experience-top">
                  <div>
                    {item.badge && <span className="status">{item.badge}</span>}
                    <div className="card-title" role="heading" aria-level={3}>{item.role}</div>
                    <span className="date">{item.date}</span>
                  </div>
                  <div className="mini-die"><span>{item.index}</span></div>
                </div>
                <div className="highlight">{item.highlight}</div>
                <div className="achievement-list">
                  {item.points.map((point, i) => (
                    <div className="achievement" key={point}>
                      <span>0{i + 1}</span><p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section flow-section">
        <SectionTitle eyebrow="03 / Methodology" title="Netlist to GDSII" intro="A complete physical implementation pipeline, engineered for convergence." />
        <div className="flow-track reveal">
          {flow.map(([number, name, description]) => (
            <div className="flow-stage" key={name}>
              <span className="stage-number">{number}</span>
              <div className="stage-icon"><i /><i /><i /></div>
              <strong>{name}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="expertise">
        <SectionTitle eyebrow="04 / Capabilities" title="Core Technical Expertise" />
        <div className="expertise-grid">
          {expertise.map(([name, description], index) => (
            <article className="expertise-card reveal" key={name}>
              <div className="expertise-icon"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="small-title" role="heading" aria-level={3}>{name}</div>
              <p>{description}</p>
              <div className="card-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="tools">
        <SectionTitle eyebrow="05 / Toolchain" title="EDA Tools & Technology" intro="Industry-standard implementation and sign-off environments." />
        <div className="tool-dashboard reveal">
          {[
            ["Physical Design", ["Cadence Innovus", "Tweaker ECO", "Synopsys Fusion Compiler", "ICC2"]],
            ["Timing & Synthesis", ["PrimeTime", "Design Compiler"]],
            ["Physical Verification", ["Siemens Calibre"]],
          ].map(([category, tools]) => (
            <div className="tool-group" key={category as string}>
              <span className="tool-category">{category as string}</span>
              <div className="tool-list">
                {(tools as string[]).map((tool) => <div className="tool" key={tool}><i />{tool}<span>EDA</span></div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section split-technical">
        <div>
          <SectionTitle eyebrow="06 / Analysis" title="Timing & Sign-off" />
          <div className="timing-panel reveal">
            <div className="panel-top"><span>MCMM ANALYSIS</span><span className="live">SIGN-OFF</span></div>
            <div className="waveform">
              <div className="wave-line w1" /><div className="wave-line w2" /><div className="wave-line w3" />
            </div>
            <div className="timing-path">
              {["Startpoint", "Logic path", "Endpoint"].map((item) => <div key={item}><i />{item}</div>)}
            </div>
            <div className="signal-tags">{["SETUP", "HOLD", "MAX TRANSITION", "MAX CAPACITANCE", "MCMM", "STA", "ECO"].map((x) => <span key={x}>{x}</span>)}</div>
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="07 / Reliability" title="Power Integrity" />
          <div className="power-panel reveal">
            <div className="power-chip"><div className="power-grid" /><span>PDN</span></div>
            <div className="power-labels">
              {["Static IR Drop", "Dynamic IR Drop", "PDN", "Electromigration", "Leakage Power Optimization", "Signal Integrity"].map((x) => <span key={x}>{x}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section verification-section">
        <SectionTitle eyebrow="08 / Verification" title="Physical Verification & Sign-off" intro="Calibre-based convergence across critical physical checks." />
        <div className="verification reveal">
          <div className="scan-chip">
            <div className="scan-line" />
            <div className="scan-grid" />
            <span>Siemens Calibre</span>
          </div>
          <div className="check-panel">
            {["Design Rule Check", "LVS Check", "ERC Check", "Antenna Check"].map((check, i) => (
              <div className="check" key={check}><span>0{i + 1}</span><strong>{check}</strong><i>Sign-off</i></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section node-section">
        <SectionTitle eyebrow="09 / Technology" title="Advanced Node & Design Formats" />
        <div className="node-layout reveal">
          <div className="wafer"><div className="wafer-grid" /><strong>3<small>nm</small></strong></div>
          <div className="node-info">
            <span className="tool-category">Process technology</span>
            <div className="node-tags"><span>TSMC 3nm</span><span>N3A</span><span>N3E</span></div>
            <span className="tool-category">Design formats</span>
            <div className="format-grid">{["DEF", "LEF", "GDSII", "SDC", "SPEF", "Liberty (.lib)"].map((x) => <span key={x}>{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="section scripting">
        <SectionTitle eyebrow="10 / Automation" title="Automation & Scripting" />
        <div className="terminal reveal">
          <div className="terminal-bar"><i /><i /><i /><span>physical_design.tcl</span></div>
          <pre><code><span># Tcl workflow visualization</span>{"\n"}set design_block $active_block{"\n"}foreach corner $mcmm_corners {"{"}{"\n"}  puts "Analyzing $corner"{"\n"}{"}"}</code></pre>
          <div className="tcl-badge">Tcl</div>
        </div>
      </section>

      <section className="section" id="education">
        <SectionTitle eyebrow="11 / Foundation" title="Education" />
        <div className="education-grid">
          {[
            ["M.Tech in VLSI Design", "Vellore Institute of Technology", "Vellore, Tamil Nadu", "July 2024 – June 2026", "8.94"],
            ["B.E. in Electrical Engineering", "Zeal College of Engineering", "Pune, Maharashtra", "August 2020 – May 2024", "8.54"],
          ].map(([degree, school, location, date, gpa]) => (
            <article className="education-card reveal" key={degree}>
              <div className="edu-icon"><i /></div>
              <span className="date">{date}</span>
              <div className="card-title" role="heading" aria-level={3}>{degree}</div>
              <p>{school}<br /><span>{location}</span></p>
              <div className="gpa"><span>GPA</span><strong>{gpa}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="12 / Engagement" title="Workshops & Technical Events" />
        <div className="event-grid">
          {[
            ["Workshop", "Workshop on Physical Design and STA Sign-off using Synopsys EDA Tools", "VIT Vellore"],
            ["Conference", "28th International Symposium on VLSI Design & Test Conference (VDAT 2024)", "VIT Vellore"],
          ].map(([type, name, place]) => (
            <article className="event-card reveal" key={name}><span>{type}</span><div className="small-title">{name}</div><p>{place}</p><div className="event-mark">VLSI</div></article>
          ))}
        </div>
      </section>

      <section className="section" id="achievements">
        <SectionTitle eyebrow="13 / Recognition" title="Achievements" />
        <div className="achievement-grid">
          <article className="award-card reveal"><div className="medal">01</div><span>National Examination</span><div className="card-title">Qualified GATE 2024</div><p>Electrical Engineering (EE)<br />Instrumentation Engineering (IN)</p></article>
          <article className="award-card reveal"><div className="medal">02</div><span>Academic Excellence</span><div className="card-title">Department Rank 1</div><p>Consistently ranked first in the department among 120 students from 2021 to 2024.</p></article>
        </div>
      </section>

      <section className="section beyond">
        <SectionTitle eyebrow="14 / Community" title="Beyond Engineering" />
        <div className="beyond-card reveal"><div className="service-icon"><i /><i /><i /></div><div><span>National Service Scheme (NSS)</span><p>Volunteered for community development and technical education programs in Pune, Maharashtra.</p></div></div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-chip"><ChipVisual compact /></div>
        <div className="contact-content reveal">
          <span className="eyebrow">Available for conversation</span>
          <div className="contact-title" role="heading" aria-level={2}>Let’s Connect</div>
          <p>Interested in Physical Design, VLSI, semiconductor technology, or engineering opportunities? Let’s connect.</p>
          <div className="contact-details">
            <Link href="mailto:thakarechandrakant1970@gmail.com"><span>Email</span>thakarechandrakant1970@gmail.com</Link>
            <Link href="tel:+919422988517"><span>Phone</span>+91-9422988517</Link>
          </div>
          <div className="hero-actions">
            <Link href="mailto:thakarechandrakant1970@gmail.com" className="primary-button">Email me <span>↗</span></Link>
            <Link href="https://www.linkedin.com/in/crthakare3004/" external className="secondary-button">LinkedIn</Link>
            <Link href="https://github.com/Crthakare" external className="secondary-button">GitHub</Link>
          </div>
        </div>
      </section>

      <footer>
        <div><strong>Chandrakant Thakare</strong><span>Senior Physical Design Engineer</span></div>
        <div className="footer-center">Physical Design &nbsp;|&nbsp; VLSI &nbsp;|&nbsp; 3nm</div>
        <div className="footer-links"><Link href="mailto:thakarechandrakant1970@gmail.com">Email</Link><Link href="https://www.linkedin.com/in/crthakare3004/" external>LinkedIn</Link><Link href="https://github.com/Crthakare" external>GitHub</Link></div>
        <div className="copyright">© 2026 Chandrakant Thakare</div>
      </footer>
    </main>
  );
}

export default App;
