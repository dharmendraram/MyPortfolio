import jsPDF from "jspdf";

const W = 210; // A4 width mm
const ML = 14; // margin left
const MR = 196; // margin right
const COL = 72; // sidebar right edge

// ── helpers ──────────────────────────────────────────────────────────────────
const sectionTitle = (doc, label, x1, x2, y) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(0);
  doc.text(label.toUpperCase(), x1, y);
  doc.setDrawColor(180);
  doc.setLineWidth(0.3);
  doc.line(x1, y + 1, x2, y + 1);
  return y + 6;
};

const wrapText = (doc, text, x, maxW, y, lineH, pageH, addPage) => {
  const lines = doc.splitTextToSize(text, maxW);
  for (const line of lines) {
    if (y > pageH - 16) { addPage(); y = 16; }
    doc.text(line, x, y);
    y += lineH;
  }
  return y;
};

const tagRow = (doc, items, x, y, maxX, lineH, pageH, addPage) => {
  const line = items.join("  ·  ");
  const lines = doc.splitTextToSize(line, maxX - x);
  for (const l of lines) {
    if (y > pageH - 16) { addPage(); y = 16; }
    doc.text(l, x, y);
    y += lineH;
  }
  return y;
};

// ── main ─────────────────────────────────────────────────────────────────────
export const downloadCV = () => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageH = 297;
  let page = 1;

  const addPage = () => {
    doc.addPage();
    page++;
    doc.setDrawColor(200);
    doc.setLineWidth(0.2);
    doc.line(COL, 0, COL, pageH);
  };

  // ── HEADER ───────────────────────────────────────────────────────────────
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Dharmendra Kumar Ram", ML, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text("Full-Stack Developer", ML, 21);

  doc.setFontSize(8);
  doc.setTextColor(100);
  const summary = doc.splitTextToSize(
    "Passionate Full-Stack Developer from Nepal with 2+ years of professional experience building scalable government systems, healthcare platforms, recruitment portals, and enterprise web applications.",
    W - ML - 10
  );
  let sy = 27;
  for (const l of summary) { doc.text(l, ML, sy); sy += 4; }

  doc.setDrawColor(180);
  doc.setLineWidth(0.3);
  doc.line(ML, 38, MR, 38);

  // ── CONTACT BAR ─────────────────────────────────────────────────────────
doc.setFontSize(7.5);
doc.setTextColor(80);
doc.setFont("helvetica", "normal");

const contacts = [
  "Location: Kathmandu, Nepal",
  "Website: dharmendraram.com.np",
  "GitHub: github.com/dharmendraram",
  "Education: BCA | Tribhuvan University",
];

const cGap = (W - ML * 2) / contacts.length;

contacts.forEach((c, i) => {
  doc.text(c, ML + i * cGap, 43.5);
});

doc.setDrawColor(200);
doc.setLineWidth(0.2);
doc.line(ML, 46, MR, 46);

  // ── SIDEBAR DIVIDER ──────────────────────────────────────────────────────
  doc.setDrawColor(200);
  doc.setLineWidth(0.2);
  doc.line(COL, 47, COL, pageH);

  // ── SIDEBAR CONTENT ─────────────────────────────────────────────────────
  let sy2 = 55;
  doc.setTextColor(0);

  // Stats
  sy2 = sectionTitle(doc, "At a Glance", ML, COL - 4, sy2);
  const stats = [["2+", "Years Exp."], ["10+", "Projects"], ["6+", "Tech Stack"], ["100%", "Dedication"]];
  const boxW = (COL - ML * 2 - 3) / 2;
  stats.forEach(([num, lbl], i) => {
    const bx = ML + (i % 2) * (boxW + 3);
    const by = sy2 + Math.floor(i / 2) * 14;
    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.rect(bx, by - 4, boxW, 12, "S");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(num, bx + boxW / 2, by + 2, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(80);
    doc.text(lbl, bx + boxW / 2, by + 6, { align: "center" });
    doc.setTextColor(0);
  });
  sy2 += 32;

  // Skills sections
  const skillSections = [
    { title: "Frontend", items: ["HTML", "CSS", "SASS", "JavaScript", "TypeScript", "React JS", "Next JS", "Tailwind CSS", "Bootstrap"] },
    { title: "Backend", items: ["Django", "Java Grails", "MySQL", "MongoDB", "PostgreSQL"] },
    { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C"] },
    { title: "Tools", items: ["Git", "GitHub", "GitLab", "VS Code", "IntelliJ", "WebStorm", "Postman", "Figma", "Canva", "Vercel", "Netlify"] },
  ];

  for (const sec of skillSections) {
    sy2 = sectionTitle(doc, sec.title, ML, COL - 4, sy2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    sy2 = tagRow(doc, sec.items, ML, sy2, COL - 4, 6, pageH, addPage);
    sy2 += 2;
  }

  // Education
  sy2 = sectionTitle(doc, "Education", ML, COL - 4, sy2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("BCA — Computer Application", ML, sy2);
  sy2 += 4.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(60);
  const eduLines = doc.splitTextToSize("Swoyambhu International College, Lagankhel, Lalitpur — Tribhuvan University", COL - ML - 4);
  for (const l of eduLines) { doc.text(l, ML, sy2); sy2 += 4; }
  doc.setTextColor(0);
  doc.text("2020 – 2025", ML, sy2);

  // ── MAIN CONTENT ────────────────────────────────────────────────────────
  let my = 55;
  const mainL = COL + 8;
  const mainW = MR - mainL;

  // Profile
  my = sectionTitle(doc, "Profile", mainL, MR, my);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(50);
  my = wrapText(
    doc,
    "Full-Stack Developer with professional experience designing, developing, and deploying scalable web applications. Currently at National Incubation & Research Center (NIRC), specializing in React.js, TypeScript, Python Django, Java Grails, MySQL, and PostgreSQL. Delivered 10+ projects including HMS, GWP, Rakmina, and several enterprise platforms. Passionate about clean, maintainable code and solving complex technical challenges.",
    mainL, mainW, my, 4.5, pageH, addPage
  );
  my += 4;
  doc.setTextColor(0);

  // Experience
  my = sectionTitle(doc, "Work Experience", mainL, MR, my);

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "National Incubation & Research Center (NIRC)",
      period: "Jul 2024 – Present",
      desc: "Developed dynamic and scalable web applications handling both frontend and backend. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize performance in an agile environment.",
      skills: ["HTML", "CSS", "JavaScript", "React JS", "TypeScript", "Tailwind CSS", "MySQL", "Django", "Java Grails"],
    },
    {
      title: "Front-End Developer",
      company: "National Incubation & Research Center (NIRC)",
      period: "Oct 2023 – Jul 2024",
      desc: "Designed and implemented responsive, user-friendly interfaces. Collaborated with designers and backend developers to deliver seamless user experiences optimized for performance and cross-browser compatibility.",
      skills: ["HTML", "CSS", "JavaScript", "React JS", "Next JS", "TypeScript", "Tailwind CSS", "Bootstrap", "Git/GitHub"],
    },
  ];

  for (const exp of experiences) {
    if (my > pageH - 30) { addPage(); my = 16; }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(exp.title, mainL, my);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(60);
    doc.text(exp.company, mainL, my + 4);

    doc.setFontSize(7);
    doc.setTextColor(100);
    doc.text(exp.period, MR, my + 1, { align: "right" });

    my += 9;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(50);
    my = wrapText(doc, exp.desc, mainL, mainW, my, 4.2, pageH, addPage);
    my += 2;

    doc.setFontSize(7);
    doc.setTextColor(0);
    my = tagRow(doc, exp.skills, mainL, my, MR, 5.5, pageH, addPage);
    my += 4;

    doc.setDrawColor(200);
    doc.setLineWidth(0.2);
    doc.line(mainL, my, MR, my);
    my += 5;
  }

  // Projects
  my = sectionTitle(doc, "Key Projects", mainL, MR, my);

  const projects = [
    { title: "Hospital Management System (HMS)", role: "Core Designer & Lead Developer", url: "hms.nirc.com.np", desc: "Comprehensive platform for hospital operations — patient registration, records management, and administrative workflows.", tech: ["HTML", "CSS", "JavaScript", "Django"] },
    { title: "Government With People (GWP)", role: "Core Front-End Developer", url: "gwp.nirc.com.np", desc: "Municipal digital platform providing citizens access to services, information, and community updates. Enhances government-citizen transparency.", tech: ["HTML", "CSS", "JavaScript", "Java Grails"] },
    { title: "Rakmina Recruitment & Migration Platform", role: "Lead Front-End Developer", url: "rakmina.lt", desc: "Professional portal connecting Nepali talent with global opportunities, covering job search to visa processing end-to-end.", tech: ["Next.js", "Tailwind CSS", "Django REST API"] },
    { title: "Provincial Research & Training Institute", role: "Front-End Developer", url: "training.nirc.com.np", desc: "Government platform delivering training programs, research resources, and institutional content for officials and trainees.", tech: ["React.js", "Tailwind CSS", "Django REST API"] },
    { title: "NIRC Website", role: "Full Stack Developer", url: "nirc.com.np", desc: "Leading software development company website delivering cutting-edge digital solutions.", tech: ["HTML", "CSS", "JavaScript", "Django"] },
    { title: "Akriti Advertising", role: "Full Stack Developer", url: "akritiadvertising.com.np", desc: "A leading advertising agency in Nepal specializing in outdoor media, branding, large-format printing, and creative marketing solutions.", tech: ["HTML", "Tailwind CSS", "JavaScript", "Django"] },
    { title: "BrandWave", role: "Full Stack Developer", url: "brandwave.com.np", desc: "A modern digital marketing agency focused on creating impactful online experiences.", tech: ["HTML", "Tailwind CSS", "JavaScript", "Django"] },
    { title: "Aarambha Foundation", role: "Full Stack Developer", url: "aarambhafoundation.org.np", desc: "Non-profit organization dedicated to empowering underprivileged communities through education and skill development.", tech: ["HTML", "Bootstrap", "JavaScript", "Django"] },
    { title: "StartupGhar", role: "Full Stack / Front-End Developer", url: "startupghar.com", desc: "Business and non-profit websites with responsive, SEO-optimized digital experiences.", tech: ["HTML", "CSS", "Django", "Bootstrap"] },
  ];

  for (const p of projects) {
    if (my > pageH - 28) { addPage(); my = 16; }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(0);
    doc.text(p.title, mainL, my);
    my += 4.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(60);
    doc.text(`${p.role}${p.url ? "  ·  " + p.url : ""}`, mainL, my);
    my += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(50);
    my = wrapText(doc, p.desc, mainL, mainW, my, 4, pageH, addPage);
    my += 1.5;

    doc.setFontSize(7);
    doc.setTextColor(0);
    my = tagRow(doc, p.tech, mainL, my, MR, 5.5, pageH, addPage);
    my += 3;

    doc.setDrawColor(220);
    doc.setLineWidth(0.15);
    doc.line(mainL, my, MR, my);
    my += 4;
  }

  doc.save("Dharmendra_Kumar_Ram_CV.pdf");
};
