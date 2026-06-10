import jsPDF from "jspdf";

const W = 210;
const ML = 14;
const MR = 196;
const COL = 74;
const ACCENT = [20, 20, 20];
const LIGHT = [20, 20, 20];
const DIVIDER = [180, 180, 180];

// ── helpers ───────────────────────────────────────────────────────────────────
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

const tagRow = (doc, items, x, y, maxX, lineH, pageH, addPage) => {
  const lines = doc.splitTextToSize(items.join("  ·  "), maxX - x);
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

// ── main ──────────────────────────────────────────────────────────────────────
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
  doc.text("Full-Stack Developer", W / 2, 20.5, { align: "center" });

  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const headerParts = [
    { text: "Kathmandu, Nepal | dharmendraram7852@gmail.com | +977-9819745073,9764632928 | ", url: null },
    { text: " dharmendraram.com.np", url: "https://dharmendraram.com.np" },
    { text: " | ", url: null },
    { text: " linkedin.com/in/dharmendraram/", url: "https://linkedin.com/in/dharmendraram/" },
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

  // Stats grid
  sy = sectionTitle(doc, "At a Glance", ML, COL - 4, sy);
  const stats = [["2+", "Years Exp."], ["10+", "Projects"], ["6+", "Tech Stack"], ["100%", "Dedication"]];
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

  // Skills
  const skillSections = [
    { title: "Frontend",  items: ["HTML", "CSS", "SASS", "JavaScript", "TypeScript", "React JS", "Next JS", "Tailwind CSS", "Bootstrap"] },
    { title: "Backend",   items: ["Django", "Java Grails", "MySQL", "MongoDB", "PostgreSQL"] },
    { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C"] },
    { title: "Tools",     items: ["Git", "GitHub", "GitLab", "VS Code", "IntelliJ", "WebStorm", "Postman", "Figma", "Canva", "Vercel", "Netlify"] },
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
  doc.text("BCA — Bachelor of Computer Applications", ML, sy);
  sy += 5;
  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const eduLines = doc.splitTextToSize(
    "Swoyambhu International College, Lagankhel, Lalitpur — Tribhuvan University",
    COL - ML - 4
  );
  for (const l of eduLines) { doc.text(l, ML, sy); sy += 4.5; }
  setAccent(doc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("2020 – 2025", ML, sy);

  // ── MAIN ─────────────────────────────────────────────────────────────────
  let my = 37;
  const mainL = COL + 8;
  const mainW = MR - mainL;

  // Profile
  my = sectionTitle(doc, "Profile", mainL, MR, my);
  setLight(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const profileLines = doc.splitTextToSize(
    "Passionate Full-Stack Developer from Nepal with 2+ years of professional experience building scalable government systems, healthcare platforms, recruitment portals, and enterprise web applications. Currently at National Incubation & Research Center (NIRC), specializing in React.js, TypeScript, Python Django, Java Grails, MySQL, and PostgreSQL. Delivered 10+ projects including HMS, GWP, Rakmina, and several enterprise platforms.",
    mainW
  );
  profileLines.forEach((line, i) => {
    const last = i === profileLines.length - 1;
    doc.text(line, mainL, my, last ? {} : { maxWidth: mainW, align: "justify" });
    my += 4.8;
  });
  my += 3;

  // Experience
  setDark(doc);
  my = sectionTitle(doc, "Work Experience", mainL, MR, my);

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "National Incubation & Research Center (NIRC)",
      period: "Jul 2024 – Present",
      desc: "Developed dynamic and scalable web applications handling both frontend and backend. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize performance in an agile environment.",
      skills: ["React JS", "TypeScript", "Tailwind CSS", "Django", "Java Grails", "MySQL"],
    },
    {
      title: "Front-End Developer",
      company: "National Incubation & Research Center (NIRC)",
      period: "Oct 2023 – Jul 2024",
      desc: "Designed and implemented responsive, user-friendly interfaces. Collaborated with designers and backend developers to deliver seamless user experiences optimized for performance and cross-browser compatibility.",
      skills: ["React JS", "Next JS", "TypeScript", "Tailwind CSS", "Bootstrap", "Git/GitHub"],
    },
  ];

  for (const exp of experiences) {
    if (my > pageH - 32) { addPage(); my = 18; }

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
    my = wrapText(doc, exp.desc, mainL, mainW, my, 4.5, pageH, addPage);
    my += 2;

    setAccent(doc);
    doc.setFontSize(7);
    my = tagRow(doc, exp.skills, mainL, my, MR, 5, pageH, addPage);
    my += 5;

    divider(doc, mainL, MR, my);
    my += 5;
  }

  // Projects
  setDark(doc);
  my = sectionTitle(doc, "Key Projects", mainL, MR, my);

  const projects = [
    { title: "Hospital Management System (HMS)", role: "Core Designer & Lead Developer", url: "hms.nirc.com.np", desc: "Comprehensive platform for hospital operations — patient registration, records management, and administrative workflows.", tech: ["HTML", "CSS", "JavaScript", "Django"] },
    { title: "Government With People (GWP)", role: "Core Front-End Developer", url: "gwp.nirc.com.np", desc: "Municipal digital platform providing citizens access to services, information, and community updates.", tech: ["HTML", "CSS", "JavaScript", "Java Grails"] },
    { title: "Rakmina Recruitment & Migration Platform", role: "Lead Front-End Developer", url: "rakmina.lt", desc: "Professional portal connecting Nepali talent with global opportunities, covering job search to visa processing end-to-end.", tech: ["Next.js", "Tailwind CSS", "Django REST API"] },
    { title: "Provincial Research & Training Institute", role: "Front-End Developer", url: "training.nirc.com.np", desc: "Government platform delivering training programs, research resources, and institutional content for officials and trainees.", tech: ["React.js", "Tailwind CSS", "Django REST API"] },
    { title: "NIRC Website", role: "Full Stack Developer", url: "nirc.com.np", desc: "Leading software development company website delivering cutting-edge digital solutions.", tech: ["HTML", "CSS", "JavaScript", "Django"] },
    { title: "Akriti Advertising", role: "Full Stack Developer", url: "akritiadvertising.com.np", desc: "Advertising agency in Nepal specializing in outdoor media, branding, large-format printing, and creative marketing solutions.", tech: ["HTML", "Tailwind CSS", "JavaScript", "Django"] },
    { title: "BrandWave", role: "Full Stack Developer", url: "brandwave.com.np", desc: "Modern digital marketing agency focused on creating impactful online experiences.", tech: ["HTML", "Tailwind CSS", "JavaScript", "Django"] },
    { title: "Aarambha Foundation", role: "Full Stack Developer", url: "aarambhafoundation.org.np", desc: "Non-profit organization empowering underprivileged communities through education and skill development.", tech: ["HTML", "Bootstrap", "JavaScript", "Django"] },
    { title: "StartupGhar", role: "Full Stack / Front-End Developer", url: "startupghar.com", desc: "Business and non-profit websites with responsive, SEO-optimized digital experiences.", tech: ["HTML", "CSS", "Django", "Bootstrap"] },
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
    my = wrapText(doc, p.desc, mainL, mainW, my, 4.2, pageH, addPage);
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
