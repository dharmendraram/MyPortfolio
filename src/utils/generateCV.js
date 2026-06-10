import jsPDF from "jspdf";

const W = 210;
const ML = 14;
const MR = 196;
const COL = 74;
const DIVIDER = [180, 180, 180];

const setAccent = (doc) => doc.setTextColor(20, 20, 20);
const setLight  = (doc) => doc.setTextColor(20, 20, 20);
const setDark   = (doc) => doc.setTextColor(20, 20, 20);

const sectionTitle = (doc, label, x1, x2, y) => {
  setAccent(doc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(label.toUpperCase(), x1, y);
  doc.setDrawColor(...DIVIDER);
  doc.setLineWidth(0.2);
  doc.line(x1, y + 1.2, x2, y + 1.2);
  setDark(doc);
  return y + 7;
};

const wrapText = (doc, text, x, maxW, y, lineH, pageH, addPage) => {
  const lines = doc.splitTextToSize(text, maxW);
  for (const line of lines) {
    if (y > pageH - 18) { addPage(); y = 18; }
    doc.text(line, x, y);
    y += lineH;
  }
  return y;
};

const bulletPoints = (doc, points, x, maxW, y, lineH, pageH, addPage) => {
  const bulletSymbol = "•";
  const indent = doc.getTextWidth(bulletSymbol + " ");
  for (const point of points) {
    const lines = doc.splitTextToSize(point, maxW - indent);
    lines.forEach((line, i) => {
      if (y > pageH - 18) { addPage(); y = 18; }
      if (i === 0) doc.text(bulletSymbol, x, y);
      doc.text(line, x + indent, y);
      y += lineH;
    });
  }
  return y;
};

const tagRow = (doc, items, x, y, maxX, lineH, pageH, addPage) => {
  const lines = doc.splitTextToSize(items.join("  |  "), maxX - x);
  for (const l of lines) {
    if (y > pageH - 18) { addPage(); y = 18; }
    doc.text(l, x, y);
    y += lineH;
  }
  return y;
};

const divider = (doc, x1, x2, y, alpha = DIVIDER) => {
  doc.setDrawColor(...alpha);
  doc.setLineWidth(0.2);
  doc.line(x1, y, x2, y);
};

export const downloadCV = () => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageH = 297;

  const addPage = () => {
    doc.addPage();
    doc.setDrawColor(...DIVIDER);
    doc.setLineWidth(0.3);
    doc.line(COL, 0, COL, pageH);
  };

  // ── HEADER ────────────────────────────────────────────────────────────────
  setDark(doc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.text("Dharmendra Kumar Ram", W / 2, 14, { align: "center" });

  setAccent(doc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Full Stack Developer", W / 2, 20.5, { align: "center" });

  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const headerParts = [
    { text: "Kathmandu, Nepal | dharmendraram7852@gmail.com | +977-9819745073 | ", url: null },
    { text: "dharmendraram.com.np", url: "https://dharmendraram.com.np" },
    { text: " | ", url: null },
    { text: "linkedin.com/in/dharmendraram", url: "https://linkedin.com/in/dharmendraram/" },
  ];
  const fullHeader = headerParts.map(p => p.text).join("");
  const headerX = W / 2 - doc.getTextWidth(fullHeader) / 2;
  let hx = headerX;
  for (const part of headerParts) {
    const tw = doc.getTextWidth(part.text);
    if (part.url) {
      doc.setTextColor(20, 20, 20);
      doc.textWithLink(part.text, hx, 26, { url: part.url });
      setLight(doc);
    } else {
      doc.text(part.text, hx, 26);
    }
    hx += tw;
  }

  divider(doc, ML, MR, 30, DIVIDER);

  // ── SIDEBAR DIVIDER ───────────────────────────────────────────────────────
  doc.setDrawColor(...DIVIDER);
  doc.setLineWidth(0.2);
  doc.line(COL, 32, COL, pageH);

  // ── SIDEBAR ───────────────────────────────────────────────────────────────
  let sy = 37;

  // Stats
  sy = sectionTitle(doc, "At a Glance", ML, COL - 4, sy);
  const stats = [["2+", "Years Exp."], ["10+", "Projects"], ["8+", "Tech Stack"], ["25%", "Perf. Gain"]];
  const boxW = (COL - ML - 4 - 3) / 2;
  stats.forEach(([num, lbl], i) => {
    const bx = ML + (i % 2) * (boxW + 3);
    const by = sy + Math.floor(i / 2) * 15;
    doc.setDrawColor(...DIVIDER);
    doc.setLineWidth(0.2);
    doc.rect(bx, by - 4, boxW, 12, "S");
    setAccent(doc);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(num, bx + boxW / 2, by + 2.5, { align: "center" });
    setLight(doc);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.text(lbl, bx + boxW / 2, by + 6.5, { align: "center" });
  });
  sy += 34;

  // Technical Skills — ATS keyword-optimized labels
  const skillSections = [
    { title: "Frontend Development", items: ["HTML5", "CSS3", "SASS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"] },
    { title: "Backend Development", items: ["Django", "REST API", "Java Grails", "MySQL", "MongoDB", "PostgreSQL"] },
    { title: "Programming Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C"] },
    { title: "Tools & Platforms",    items: ["Git", "GitHub", "GitLab", "Agile", "Scrum", "Postman", "Figma", "Vercel", "Netlify", "VS Code"] },
  ];

  for (const sec of skillSections) {
    sy = sectionTitle(doc, sec.title, ML, COL - 4, sy);
    setLight(doc);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    sy = tagRow(doc, sec.items, ML, sy, COL - 2, 5.5, pageH, addPage);
    sy += 3;
  }

  // Education
  sy = sectionTitle(doc, "Education", ML, COL - 4, sy);
  setDark(doc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("Bachelor of Computer Applications", ML, sy);
  sy += 5;
  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const eduLines = doc.splitTextToSize(
    "Swoyambhu International College — Tribhuvan University, Lalitpur, Nepal",
    COL - ML - 4
  );
  for (const l of eduLines) { doc.text(l, ML, sy); sy += 4.5; }
  setAccent(doc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("2020 – 2025", ML, sy);
  sy += 6;

  // Certifications / Core Competencies — boosts ATS keyword matching
  sy = sectionTitle(doc, "Core Competencies", ML, COL - 4, sy);
  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const competencies = [
    "Full Stack Web Development",
    "RESTful API Design",
    "Responsive UI/UX Design",
    "Performance Optimization",
    "Cross-Browser Compatibility",
    "Version Control (Git)",
    "Database Design & Management",
  ];
  for (const c of competencies) {
    if (sy > pageH - 10) break;
    doc.text("• " + c, ML, sy);
    sy += 4.5;
  }

  // ── MAIN ─────────────────────────────────────────────────────────────────
  let my = 37;
  const mainL = COL + 8;
  const mainW = MR - mainL;

  // Professional Summary (ATS: "Summary" is standard heading)
  my = sectionTitle(doc, "Professional Summary", mainL, MR, my);
  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const profileText =
    "Results-driven Full-Stack Developer with 2+ years of experience building and shipping 10+ production web applications across government, healthcare, and enterprise sectors. Skilled in React.js, Next.js, TypeScript, Python, Django, Java Grails, MySQL, and PostgreSQL. Cut page load times by 25%, accelerated UI delivery by 30%, and consistently met sprint deadlines in Agile environments. Experienced in end-to-end development, RESTful API integration, and cross-functional team collaboration.";
  const profileLines = doc.splitTextToSize(profileText, mainW);
  profileLines.forEach((line, i) => {
    const last = i === profileLines.length - 1;
    doc.text(line, mainL, my, last ? {} : { maxWidth: mainW, align: "justify" });
    my += 4.8;
  });
  my += 3;

  // Work Experience
  setDark(doc);
  my = sectionTitle(doc, "Work Experience", mainL, MR, my);

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "National Incubation & Research Center (NIRC)",
      period: "Jul 2024 – Present",
      bullets: [
        "Architected and shipped 6+ full-stack web applications for government and enterprise clients using React.js, TypeScript, Django, and Java Grails.",
        "Cut average page load times by 25% by implementing code splitting, lazy loading, and asset optimization.",
        "Built and integrated 10+ RESTful APIs, reducing average API response time by 20%.",
        "Led a cross-functional team of 5+ developers, consistently delivering sprint features 20% ahead of schedule in an Agile/Scrum workflow.",
        "Optimized MySQL and PostgreSQL queries, reducing average database response times by 30%.",
      ],
      skills: ["React.js", "TypeScript", "Tailwind CSS", "Python", "Django", "Java Grails", "MySQL", "PostgreSQL", "REST API", "Agile"],
    },
    {
      title: "Frontend Developer",
      company: "National Incubation & Research Center (NIRC)",
      period: "Oct 2023 – Jul 2024",
      bullets: [
        "Launched 4+ responsive web interfaces supporting 95%+ cross-browser compatibility across Chrome, Firefox, Safari, and Edge.",
        "Raised Google Lighthouse performance scores from 65 to 88 by optimizing asset delivery, eliminating render-blocking resources, and leveraging browser caching.",
        "Decreased UI defect count by 40% by enforcing code review standards and building a shared component library of 20+ reusable components.",
        "Partnered with UI/UX designers and backend engineers to ship 8+ accessible, WCAG-compliant interfaces ahead of schedule.",
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap", "Git", "GitHub", "Responsive Design"],
    },
  ];

  for (const exp of experiences) {
    if (my > pageH - 40) { addPage(); my = 18; }

    setDark(doc);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(exp.title, mainL, my);

    setAccent(doc);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(exp.period, MR, my, { align: "right" });

    setLight(doc);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(exp.company, mainL, my + 4.5);

    my += 10;
    doc.setFontSize(7.5);
    my = bulletPoints(doc, exp.bullets, mainL, mainW, my, 4.5, pageH, addPage);
    my += 2;

    setAccent(doc);
    doc.setFontSize(7);
    my = tagRow(doc, exp.skills, mainL, my, MR, 5, pageH, addPage);
    my += 5;

    divider(doc, mainL, MR, my);
    my += 5;
  }

  // Key Projects
  setDark(doc);
  my = sectionTitle(doc, "Key Projects", mainL, MR, my);

  const projects = [
    {
      title: "Hospital Management System (HMS)",
      role: "Core Designer & Lead Developer",
      url: "hms.nirc.com.np",
      bullets: [
        "Engineered a full-stack Hospital Management System handling 500+ patient records, appointments, and billing across 3 departments.",
        "Automated administrative workflows, cutting manual processing time by 35% and eliminating paper-based data entry.",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Python", "Django"],
    },
    {
      title: "Government With People (GWP)",
      role: "Core Frontend Developer",
      url: "gwp.nirc.com.np",
      bullets: [
        "Launched a municipal e-government portal providing 1,000+ citizens with online access to 15+ public services.",
        "Improved service delivery efficiency by 40%, reducing average task completion time from 12 minutes to 7 minutes.",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Java Grails"],
    },
    {
      title: "Rakmina Recruitment & Migration Platform",
      role: "Lead Frontend Developer",
      url: "rakmina.lt",
      bullets: [
        "Developed a full-cycle recruitment portal matching 200+ Nepali professionals with international employers in 10+ countries.",
        "Streamlined the end-to-end application and visa workflow, reducing candidate onboarding time by 50% through 5 automated processing stages.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Django REST API"],
    },
    {
      title: "Provincial Research & Training Institute",
      role: "Frontend Developer",
      url: "training.nirc.com.np",
      bullets: [
        "Built a government training platform managing 20+ courses and serving 300+ provincial officials with digital resource access.",
        "Attained a 92/100 Google Lighthouse accessibility score by applying semantic HTML5, ARIA roles, and WCAG 2.1 guidelines.",
      ],
      tech: ["React.js", "Tailwind CSS", "Django REST API"],
    },
    {
      title: "NIRC Corporate Website",
      role: "Full Stack Developer",
      url: "nirc.com.np",
      bullets: [
        "Achieved a 91/100 Google PageSpeed Insights score and increased organic search traffic by 30% within 90 days of launch through technical SEO improvements.",
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Django"],
    },
    {
      title: "Akriti Advertising",
      role: "Full Stack Developer",
      url: "akritiadvertising.com.np",
      bullets: [
        "Integrated a headless CMS enabling non-technical staff to publish content independently, reducing update turnaround time by 60%.",
      ],
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "Django"],
    },
    {
      title: "Aarambha Foundation",
      role: "Full Stack Developer",
      url: "aarambhafoundation.org.np",
      bullets: [
        "Redesigned UX and navigation structure, lifting online donor engagement by 25% and reducing bounce rate by 18%.",
      ],
      tech: ["HTML5", "Bootstrap", "JavaScript", "Django"],
    },
    {
      title: "StartupGhar",
      role: "Full Stack Developer",
      url: "startupghar.com",
      bullets: [
        "Secured top-3 Google rankings for 5+ target keywords and cut mobile page load time by 40% through structured data markup and image optimization.",
      ],
      tech: ["HTML5", "CSS3", "Bootstrap", "Django"],
    },
  ];

  for (const p of projects) {
    if (my > pageH - 30) { addPage(); my = 18; }

    setDark(doc);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(p.title, mainL, my);
    my += 5;

    setLight(doc);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    if (p.url) {
      const roleText = `${p.role}  ·  `;
      doc.text(roleText, mainL, my);
      const roleW = doc.getTextWidth(roleText);
      doc.setTextColor(20, 20, 20);
      doc.textWithLink(p.url, mainL + roleW, my, { url: `https://${p.url}` });
      setLight(doc);
    } else {
      doc.text(p.role, mainL, my);
    }
    my += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    my = bulletPoints(doc, p.bullets, mainL, mainW, my, 4.2, pageH, addPage);
    my += 1.5;

    setAccent(doc);
    doc.setFontSize(7);
    my = tagRow(doc, p.tech, mainL, my, MR, 5, pageH, addPage);
    my += 4;

    divider(doc, mainL, MR, my, [225, 228, 232]);
    my += 4.5;
  }

  doc.save("Dharmendra_Kumar_Ram_CV.pdf");
};
