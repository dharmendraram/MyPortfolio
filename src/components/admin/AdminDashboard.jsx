import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { usePortfolio } from "../../context/PortfolioContext";
import ThemeToggle from "../ThemeToggle";
import { skillsData } from "../../data/data.jsx";
import { useExperience } from "../../context/ExperienceContext";
import { supabase } from "../../lib/supabase";
import logoWhite from "../../assets/logowhite.png";
import logoDark from "../../assets/logodark.png";
import {
  LuLayoutDashboard,
  LuFolderGit2,
  LuMessageSquare,
  LuLogOut,
  LuArrowLeft,
  LuShieldCheck,
  LuExternalLink,
  LuTrash2,
  LuPencil,
  LuCircleCheck,
  LuMail,
  LuPhone,
  LuCalendar,
  LuPlus,
  LuDatabase,
  LuRefreshCw,
  LuSearch,
  LuCode,
  LuX,
  LuRotateCcw,
  LuUpload,
  LuImage,
} from "react-icons/lu";
import { BsWhatsapp } from "react-icons/bs";

const emptyExperienceForm = {
  id: "",
  company: "",
  title: "",
  period: "",
  logo: "/assets/nirc.png",
  description: "",
  skills: "",
};

const emptyProjectForm = {
  id: "",
  title: "",
  category: "Full Stack Developer",
  company: "Personal",
  image: "",
  technology: "",
  link: "",
  github: "",
  username: "",
  password: "",
  description: "",
};

const AdminDashboard = ({ onBackToPortfolio }) => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    resetToDefaults,
  } = usePortfolio();

  const {
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    resetToDefaults: resetExperiences,
  } = useExperience();

  const [activeTab, setActiveTab] = useState("overview"); // overview, projects, experiences, inquiries
  const [inquiries, setInquiries] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(true);

  // Inquiries filter & search
  const [searchInquiry, setSearchInquiry] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState("all"); // 'all', 'unread', 'read'

  // Projects filter & search
  const [searchProject, setSearchProject] = useState("");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("all");

  // Experiences filter & search
  const [searchExperience, setSearchExperience] = useState("");

  // Project Modal state (Add / Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState("add"); // 'add' or 'edit'
  const [projectFormData, setProjectFormData] = useState(emptyProjectForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadMethod, setImageUploadMethod] = useState("upload"); // 'upload' or 'url'

  // Experience Modal state (Add / Edit)
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [experienceModalMode, setExperienceModalMode] = useState("add"); // 'add' or 'edit'
  const [experienceFormData, setExperienceFormData] = useState(emptyExperienceForm);
  const [deleteConfirmExpId, setDeleteConfirmExpId] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUploadMethod, setLogoUploadMethod] = useState("preset"); // 'preset', 'upload', 'url'

  // Summary counts
  const totalProjects = projects.length;
  const totalSkills = skillsData.reduce(
    (sum, category) => sum + (category.skills ? category.skills.length : 0),
    0
  );
  const totalExperiences = experiences.length;

  // Load inquiries from Supabase or localStorage fallback (NO DUMMY DATA)
  const fetchInquiries = useCallback(async () => {
    setIsSyncing(true);
    let supabaseSuccess = false;

    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setInquiries(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            subject: item.subject,
            message: item.message,
            date: item.created_at || new Date().toISOString(),
            read: item.read ?? false,
            source: "supabase",
          }))
        );
        setSupabaseConnected(true);
        supabaseSuccess = true;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, checking local storage:", err);
    }

    if (!supabaseSuccess) {
      setSupabaseConnected(false);
      try {
        const stored = localStorage.getItem("portfolio_inquiries");
        if (stored) {
          setInquiries(JSON.parse(stored));
        } else {
          setInquiries([]);
        }
      } catch (e) {
        console.error("Error reading local inquiries:", e);
        setInquiries([]);
      }
    }

    setIsSyncing(false);
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Handle Inquiries Delete
  const handleDeleteInquiry = async (id) => {
    try {
      await supabase.from("inquiries").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase delete failed, removing locally:", e);
    }

    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem("portfolio_inquiries", JSON.stringify(updated));
  };

  // Handle Inquiries Read Toggle
  const handleToggleRead = async (id) => {
    const current = inquiries.find((inq) => inq.id === id);
    const newReadStatus = current ? !current.read : true;

    try {
      await supabase
        .from("inquiries")
        .update({ read: newReadStatus })
        .eq("id", id);
    } catch (e) {
      console.warn("Supabase update failed, updating locally:", e);
    }

    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, read: newReadStatus } : inq
    );
    setInquiries(updated);
    localStorage.setItem("portfolio_inquiries", JSON.stringify(updated));
  };

  // Project Modal Actions
  const handleOpenAddProject = () => {
    setProjectModalMode("add");
    setProjectFormData(emptyProjectForm);
    setImageUploadMethod("upload");
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (project) => {
    setProjectModalMode("edit");
    setProjectFormData({
      id: project.id || project.title,
      title: project.title || "",
      category: project.category || "Full Stack Developer",
      company: project.company || "Personal",
      image: project.image || "",
      technology: Array.isArray(project.technology)
        ? project.technology.join(", ")
        : project.technology || "",
      link: project.link || "",
      github: project.github || "",
      username: project.username || "",
      password: project.password || "",
      description: project.description || "",
    });
    setImageUploadMethod(project.image?.startsWith("http") ? "url" : "upload");
    setIsProjectModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10MB.");
      return;
    }

    setIsUploadingImage(true);
    let uploadedUrl = null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `project-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("portfolio-images").getPublicUrl(fileName);
        if (publicUrl) {
          uploadedUrl = publicUrl;
        }
      }
    } catch (err) {
      console.warn("Supabase storage upload skipped/failed:", err);
    }

    if (!uploadedUrl) {
      // Fallback: Read as base64 Data URL so upload works immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
        setIsUploadingImage(false);
      };
      reader.onerror = () => {
        alert("Failed to read image file.");
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } else {
      setProjectFormData((prev) => ({
        ...prev,
        image: uploadedUrl,
      }));
      setIsUploadingImage(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) {
      alert("Project title is required.");
      return;
    }

    const techArray = projectFormData.technology
      ? projectFormData.technology.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    if (projectModalMode === "add") {
      await addProject({
        ...projectFormData,
        technology: techArray,
      });
      setStatusMessage({ type: "success", text: "Project added successfully!" });
    } else {
      await updateProject(projectFormData.id, {
        ...projectFormData,
        technology: techArray,
      });
      setStatusMessage({ type: "success", text: "Project updated successfully!" });
    }

    setIsProjectModalOpen(false);
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setDeleteConfirmId(null);
    setStatusMessage({ type: "success", text: "Project deleted successfully." });
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
  };

  const handleResetProjects = () => {
    if (
      window.confirm(
        "Are you sure you want to restore the original 11 portfolio projects from data.jsx?"
      )
    ) {
      resetToDefaults();
      setStatusMessage({
        type: "success",
        text: "Portfolio items restored to default.",
      });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleResetExperiences = () => {
    if (
      window.confirm(
        "Are you sure you want to restore the default experiences from data.jsx?"
      )
    ) {
      resetExperiences();
      setStatusMessage({
        type: "success",
        text: "Experiences restored to default.",
      });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleOpenAddExperience = () => {
    setExperienceModalMode("add");
    setExperienceFormData({
      id: "",
      company: "",
      title: "",
      period: "",
      logo: "/assets/nirc.png",
      description: "",
      skills: "",
    });
    setLogoUploadMethod("preset");
    setIsExperienceModalOpen(true);
  };

  const handleOpenEditExperience = (exp) => {
    setExperienceModalMode("edit");
    setExperienceFormData({
      id: exp.id,
      company: exp.company,
      title: exp.title,
      period: exp.period,
      logo: exp.logo,
      description: exp.description || "",
      skills: Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills || "",
    });
    if (exp.logo === "/assets/nirc.png" || exp.logo === "/assets/tu.png") {
      setLogoUploadMethod("preset");
    } else if (exp.logo && exp.logo.startsWith("http")) {
      setLogoUploadMethod("url");
    } else {
      setLogoUploadMethod("upload");
    }
    setIsExperienceModalOpen(true);
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!experienceFormData.company.trim() || !experienceFormData.title.trim()) {
      alert("Company and Title are required.");
      return;
    }

    const skillsArray = experienceFormData.skills
      ? experienceFormData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    if (experienceModalMode === "add") {
      await addExperience({
        ...experienceFormData,
        skills: skillsArray,
      });
      setStatusMessage({
        type: "success",
        text: `Experience "${experienceFormData.title}" added successfully!`,
      });
    } else {
      await updateExperience(experienceFormData.id, {
        ...experienceFormData,
        skills: skillsArray,
      });
      setStatusMessage({
        type: "success",
        text: `Experience "${experienceFormData.title}" updated successfully!`,
      });
    }

    setIsExperienceModalOpen(false);
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
  };

  const handleDeleteExperience = async (id) => {
    await deleteExperience(id);
    setDeleteConfirmExpId(null);
    setStatusMessage({
      type: "success",
      text: "Experience removed successfully.",
    });
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
  };

  const handleLogoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Logo image size should be less than 10MB.");
      return;
    }

    setIsUploadingLogo(true);
    let uploadedUrl = null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `logo-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("portfolio-images").getPublicUrl(fileName);
        if (publicUrl) {
          uploadedUrl = publicUrl;
        }
      }
    } catch (err) {
      console.warn("Supabase storage upload skipped/failed:", err);
    }

    if (!uploadedUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setExperienceFormData((prev) => ({
          ...prev,
          logo: reader.result,
        }));
        setIsUploadingLogo(false);
      };
      reader.onerror = () => {
        alert("Failed to read logo image file.");
        setIsUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    } else {
      setExperienceFormData((prev) => ({
        ...prev,
        logo: uploadedUrl,
      }));
      setIsUploadingLogo(false);
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchInquiry.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchInquiry.toLowerCase()) ||
      (inq.subject || "").toLowerCase().includes(searchInquiry.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchInquiry.toLowerCase());

    if (!matchesSearch) return false;
    if (inquiryFilter === "unread") return !inq.read;
    if (inquiryFilter === "read") return inq.read;
    return true;
  });

  // Filtered projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchProject.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchProject.toLowerCase()) ||
      (project.category || "").toLowerCase().includes(searchProject.toLowerCase());

    if (!matchesSearch) return false;
    if (projectCategoryFilter === "all") return true;
    return (
      project.category
        ?.toLowerCase()
        .includes(projectCategoryFilter.toLowerCase()) ||
      project.company
        ?.toLowerCase()
        .includes(projectCategoryFilter.toLowerCase())
    );
  });

  // Filtered experiences
  const filteredExperiences = experiences.filter((exp) => {
    const query = searchExperience.toLowerCase().trim();
    if (!query) return true;
    const matchesCompany = (exp.company || "").toLowerCase().includes(query);
    const matchesTitle = (exp.title || "").toLowerCase().includes(query);
    const matchesPeriod = (exp.period || "").toLowerCase().includes(query);
    const matchesDesc = (exp.description || "").toLowerCase().includes(query);
    const matchesSkills = (
      Array.isArray(exp.skills) ? exp.skills.join(" ") : exp.skills || ""
    )
      .toLowerCase()
      .includes(query);
    return (
      matchesCompany ||
      matchesTitle ||
      matchesPeriod ||
      matchesDesc ||
      matchesSkills
    );
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#141414] text-neutral-100" : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      {/* Top Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDark
            ? "bg-[#1c1c1c]/90 border-white/10"
            : "bg-white/90 border-gray-200 shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={isDark ? logoWhite : logoDark}
              alt="Dharmendra Ram Logo"
              className="h-9 w-auto"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-base font-bold tracking-tight">
                Dharmendra Ram &bull; Admin Console
              </span>
              <span
                className={`text-xs font-medium flex items-center gap-1.5 ${
                  supabaseConnected ? "text-teal-400" : "text-amber-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    supabaseConnected
                      ? "bg-teal-400 animate-pulse"
                      : "bg-amber-400"
                  }`}
                />
                <span>
                  {supabaseConnected
                    ? "Supabase Live (yeeflbcxicnxsoywtgzo)"
                    : "Local Storage Mode"}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToPortfolio}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-200"
                  : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700"
              }`}
              title="Return to Public Portfolio Site"
            >
              <LuArrowLeft className="text-sm" />
              <span className="hidden sm:inline">View</span> Public Site
            </button>

            <ThemeToggle />

            <button
              onClick={logout}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
              title="Sign Out of Dashboard"
            >
              <LuLogOut className="text-sm" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Status Toast Notification */}
        {statusMessage.text && (
          <div
            role="status"
            className="mb-6 p-4 rounded-2xl border flex items-center gap-3 bg-emerald-500/15 border-emerald-500/30 text-emerald-400 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg"
          >
            <LuCircleCheck className="text-xl shrink-0" />
            <span className="text-sm font-semibold">{statusMessage.text}</span>
          </div>
        )}

        {/* Welcome Hero Banner */}
        <div
          className={`relative rounded-3xl p-6 sm:p-8 mb-8 border overflow-hidden shadow-xl ${
            isDark
              ? "bg-gradient-to-r from-teal-950/40 via-[#1e1e1e] to-[#181818] border-teal-500/20 shadow-black/40"
              : "bg-gradient-to-r from-teal-50 via-white to-white border-teal-200 shadow-gray-200/60"
          }`}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-400/30 bg-teal-400/10 text-teal-400">
                  <LuShieldCheck className="text-sm" />
                  <span>Authorized Administrator</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">
                  <LuDatabase className="text-xs" />
                  <span>Supabase Connected</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {getGreeting()},{" "}
                <span className="text-teal-400">
                  {user?.name || "Dharmendra"}
                </span>
                !
              </h1>

              <p
                className={`text-sm mt-1.5 max-w-xl leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-gray-600"
                }`}
              >
                Manage your portfolio projects dynamically, view and reply to client inquiries in real time, and monitor database operations.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleOpenAddProject}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all cursor-pointer shadow-md hover:shadow-teal-500/25"
              >
                <LuPlus className="text-base" />
                <span>Add New Project</span>
              </button>

              <button
                type="button"
                onClick={fetchInquiries}
                disabled={isSyncing}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-200"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                }`}
                title="Sync Inquiries with Database"
              >
                <LuRefreshCw
                  className={`text-sm ${isSyncing ? "animate-spin text-teal-400" : ""}`}
                />
                <span>{isSyncing ? "Syncing..." : "Sync Inquiries"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b mb-8 gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "overview", label: "Dashboard Overview", icon: <LuLayoutDashboard /> },
            {
              id: "projects",
              label: `Projects (${totalProjects})`,
              icon: <LuFolderGit2 />,
            },
            {
              id: "experiences",
              label: `Experiences (${experiences.length})`,
              icon: <LuCalendar />,
            },
            {
              id: "inquiries",
              label: `Inquiries (${inquiries.length})`,
              icon: <LuMessageSquare />,
              badge: inquiries.filter((i) => !i.read).length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? isDark
                    ? "border-teal-400 text-teal-300 bg-white/5"
                    : "border-teal-500 text-teal-700 bg-teal-50/60"
                  : isDark
                  ? "border-transparent text-neutral-400 hover:text-white"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500 text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div
                onClick={() => setActiveTab("projects")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] ${
                  isDark
                    ? "bg-white/[0.03] border-white/10 hover:border-teal-400/40"
                    : "bg-white border-gray-200 hover:border-teal-400 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    Dynamic Projects
                  </span>
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                    <LuFolderGit2 className="text-lg" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">
                  {totalProjects}
                </div>
                <p
                  className={`text-xs mt-1.5 flex items-center justify-between ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  <span>Featured in film reel</span>
                  <span className="text-teal-400 font-bold">Manage &rarr;</span>
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-white/[0.03] border-white/10"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    Tech Skills
                  </span>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                    <LuCode className="text-lg" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                  {totalSkills}+
                </div>
                <p
                  className={`text-xs mt-1.5 ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  Frontend, Backend & Tools
                </p>
              </div>

              <div
                onClick={() => setActiveTab("experiences")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] ${
                  isDark
                    ? "bg-white/[0.03] border-white/10 hover:border-purple-400/40"
                    : "bg-white border-gray-200 hover:border-purple-400 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    Work Experience
                  </span>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                    <LuCalendar className="text-lg" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">
                  {totalExperiences}
                </div>
                <p
                  className={`text-xs mt-1.5 flex items-center justify-between ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  <span>Roles at NIRC & Education</span>
                  <span className="text-purple-400 font-bold">Manage &rarr;</span>
                </p>
              </div>

              <div
                onClick={() => setActiveTab("inquiries")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.01] ${
                  isDark
                    ? "bg-white/[0.03] border-white/10 hover:border-emerald-400/40"
                    : "bg-white border-gray-200 hover:border-emerald-400 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    Client Inquiries
                  </span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <LuMessageSquare className="text-lg" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  {inquiries.length}
                </div>
                <p
                  className={`text-xs mt-1.5 flex items-center justify-between ${
                    isDark ? "text-neutral-500" : "text-gray-400"
                  }`}
                >
                  <span>{inquiries.filter((i) => !i.read).length} unread</span>
                  <span className="text-emerald-400 font-bold">View &rarr;</span>
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Projects Row */}
            <div className="grid lg:grid-cols-3 gap-6 items-start">
              {/* Projects Quick Preview */}
              <div
                className={`lg:col-span-2 rounded-2xl p-6 border ${
                  isDark
                    ? "bg-white/[0.02] border-white/10"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <LuFolderGit2 className="text-teal-400" />
                    <span>Portfolio Projects ({totalProjects})</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenAddProject}
                      className="text-xs font-bold text-teal-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <LuPlus /> Add Project
                    </button>
                    <span className="text-neutral-500">&bull;</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("projects")}
                      className="text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer"
                    >
                      Manage All &rarr;
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-white/5">
                  {projects.slice(0, 5).map((project, pIdx) => (
                    <div
                      key={project.id || pIdx}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm truncate">
                            {project.title}
                          </h4>
                          <p
                            className={`text-xs truncate ${
                              isDark ? "text-neutral-400" : "text-gray-500"
                            }`}
                          >
                            <span className="text-teal-400 font-medium">
                              {project.category}
                            </span>{" "}
                            &bull; {project.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProject(project)}
                          className="p-1.5 rounded-lg text-teal-400 hover:bg-teal-500/10 cursor-pointer"
                          title="Edit Project"
                        >
                          <LuPencil className="text-sm" />
                        </button>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-teal-400 hover:bg-white/5"
                            title="Visit Live Website"
                          >
                            <LuExternalLink className="text-sm" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database & Inquiries Summary */}
              <div
                className={`rounded-2xl p-6 border ${
                  isDark
                    ? "bg-white/[0.02] border-white/10"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                  <LuDatabase className="text-emerald-400" />
                  <span>Database & Inquiries</span>
                </h3>

                <div className="space-y-3 text-xs mb-5">
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className="text-neutral-400 block text-[10px] uppercase">
                      Supabase Project Ref
                    </span>
                    <span className="font-mono text-teal-400 font-bold text-sm">
                      yeeflbcxicnxsoywtgzo
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border ${
                      isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className="text-neutral-400 block text-[10px] uppercase">
                      Real Inquiries Received
                    </span>
                    <span className="font-bold text-emerald-400 text-sm block mt-0.5">
                      {inquiries.length} Messages
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("inquiries")}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all cursor-pointer"
                  >
                    View Inquiries &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("experiences")}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isDark
                        ? "border-white/10 hover:bg-white/5 text-neutral-300"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    Manage Experiences &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PROJECTS (ADD, EDIT, DELETE) */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Manage Portfolio Items</h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-neutral-400" : "text-gray-500"
                  }`}
                >
                  Add, edit, or delete projects dynamically. Updates appear live on your public site.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetProjects}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isDark
                      ? "border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white"
                      : "border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                  title="Restore original 11 data.jsx projects"
                >
                  <LuRotateCcw className="text-sm" />
                  <span>Restore Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddProject}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all cursor-pointer shadow-md"
                >
                  <LuPlus className="text-base" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Project Search & Category Filter Bar */}
            <div
              className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
                isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="relative flex-1">
                <LuSearch
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm ${
                    isDark ? "text-neutral-400" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or technology..."
                  value={searchProject}
                  onChange={(e) => setSearchProject(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-all ${
                    isDark
                      ? "bg-white/5 text-white placeholder-neutral-500 border border-white/10 focus:border-teal-400"
                      : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-teal-500"
                  }`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "all", label: "All" },
                  { id: "full stack", label: "Full Stack" },
                  { id: "front-end", label: "Front-End" },
                  { id: "lead", label: "Lead Dev" },
                  { id: "company", label: "Company" },
                  { id: "personal", label: "Personal" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setProjectCategoryFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      projectCategoryFilter === f.id
                        ? "bg-teal-500 text-white"
                        : isDark
                        ? "bg-white/5 text-neutral-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div
                className={`text-center py-16 rounded-2xl border ${
                  isDark ? "border-white/10" : "border-gray-200"
                }`}
              >
                <LuFolderGit2 className="mx-auto text-4xl text-neutral-500 mb-2" />
                <h3 className="text-base font-bold">No projects found</h3>
                <p className="text-xs text-neutral-400 mt-1 mb-4">
                  No projects match your filter or search query.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAddProject}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-white cursor-pointer"
                >
                  Create New Project
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg ${
                      isDark
                        ? "bg-white/[0.03] border-white/10"
                        : "bg-white border-gray-200 shadow-sm"
                    }`}
                  >
                    {/* Thumbnail & Badges */}
                    <div className="h-44 overflow-hidden bg-neutral-900 relative group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white uppercase backdrop-blur-md">
                          {project.company || "Personal"}
                        </span>
                      </div>

                      {/* Top Right Quick Controls */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProject(project)}
                          className="p-1.5 rounded-lg bg-black/70 hover:bg-teal-500 text-white backdrop-blur-md transition-all cursor-pointer"
                          title="Edit this project"
                        >
                          <LuPencil className="text-xs" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(project.id || project.title)}
                          className="p-1.5 rounded-lg bg-black/70 hover:bg-red-500 text-white backdrop-blur-md transition-all cursor-pointer"
                          title="Delete this project"
                        >
                          <LuTrash2 className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-sm line-clamp-1 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-teal-400 font-semibold mb-2">
                          {project.category}
                        </p>
                        <p
                          className={`text-xs line-clamp-2 mb-4 leading-relaxed ${
                            isDark ? "text-neutral-400" : "text-gray-500"
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>

                      <div>
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {(Array.isArray(project.technology)
                            ? project.technology
                            : []
                          ).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                                isDark
                                  ? "bg-white/5 text-neutral-300 border border-white/5"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons Row */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:underline"
                              >
                                <span>Live Demo</span>
                                <LuExternalLink className="text-[10px]" />
                              </a>
                            ) : (
                              <span className="text-xs text-neutral-500">
                                No live demo
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProject(project)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(project.id || project.title)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: EXPERIENCES & EDUCATION */}
        {activeTab === "experiences" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Manage Work & Education Experiences</h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-neutral-400" : "text-gray-500"
                  }`}
                >
                  Add, edit, or delete experience timeline roles. Updates appear live on your public site.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetExperiences}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isDark
                      ? "border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white"
                      : "border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                  title="Restore default experiences"
                >
                  <LuRotateCcw className="text-sm" />
                  <span>Restore Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddExperience}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white transition-all cursor-pointer shadow-md"
                >
                  <LuPlus className="text-base" />
                  <span>Add Experience</span>
                </button>
              </div>
            </div>

            {/* Experience Search Bar */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="relative flex-1">
                <LuSearch
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm ${
                    isDark ? "text-neutral-400" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search experiences by company, title, skills, or description..."
                  value={searchExperience}
                  onChange={(e) => setSearchExperience(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-all ${
                    isDark
                      ? "bg-white/5 text-white placeholder-neutral-500 border border-white/10 focus:border-purple-400"
                      : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500"
                  }`}
                />
              </div>
            </div>

            {/* Experience Cards */}
            {filteredExperiences.length === 0 ? (
              <div
                className={`text-center py-16 rounded-2xl border ${
                  isDark ? "border-white/10" : "border-gray-200"
                }`}
              >
                <LuCalendar className="mx-auto text-4xl text-neutral-500 mb-2" />
                <h3 className="text-base font-bold">No experiences found</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Try clearing your search or click "Add Experience" to add a new role.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all hover:shadow-lg ${
                      isDark
                        ? "bg-white/[0.02] border-white/10 hover:border-purple-400/40"
                        : "bg-white border-gray-200 hover:border-purple-400 shadow-sm"
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-neutral-700/50 flex items-center justify-center p-1.5 border border-white/10 shrink-0 overflow-hidden">
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "/assets/nirc.png";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm line-clamp-1">{exp.title}</h3>
                            <p className="text-xs text-purple-400 font-semibold">{exp.company}</p>
                          </div>
                        </div>
                      </div>

                      <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-3">
                        {exp.period}
                      </div>

                      <p
                        className={`text-xs line-clamp-3 mb-4 leading-relaxed ${
                          isDark ? "text-neutral-400" : "text-gray-600"
                        }`}
                      >
                        {exp.description}
                      </p>

                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                                isDark
                                  ? "bg-white/5 text-neutral-300 border border-white/10"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div
                      className={`p-3 border-t flex items-center justify-end gap-2 ${
                        isDark ? "border-white/10 bg-white/[0.01]" : "border-gray-100 bg-gray-50/50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenEditExperience(exp)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all ${
                          isDark
                            ? "border-white/10 hover:bg-white/10 text-neutral-300"
                            : "border-gray-200 hover:bg-white text-gray-700"
                        }`}
                      >
                        <LuPencil className="text-xs text-purple-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmExpId(exp.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <LuTrash2 className="text-xs" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INQUIRIES & CLIENT MESSAGES (NO DUMMY DATA) */}
        {activeTab === "inquiries" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Client Inquiries & Messages</h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-neutral-400" : "text-gray-500"
                  }`}
                >
                  Real messages sent by visitors through your contact form
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchInquiries}
                  disabled={isSyncing}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <LuRefreshCw className={isSyncing ? "animate-spin text-teal-400" : ""} />
                  <span>Sync Supabase</span>
                </button>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div
              className={`p-3 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
                isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="relative flex-1">
                <LuSearch
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm ${
                    isDark ? "text-neutral-400" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search inquiries by name, email, subject, or message..."
                  value={searchInquiry}
                  onChange={(e) => setSearchInquiry(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-all ${
                    isDark
                      ? "bg-white/5 text-white placeholder-neutral-500 border border-white/10 focus:border-teal-400"
                      : "bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-teal-500"
                  }`}
                />
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                {["all", "unread", "read"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setInquiryFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      inquiryFilter === f
                        ? "bg-teal-500 text-white"
                        : isDark
                        ? "bg-white/5 text-neutral-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length === 0 ? (
              <div
                className={`text-center py-16 rounded-2xl border ${
                  isDark ? "border-white/10" : "border-gray-200"
                }`}
              >
                <LuMessageSquare className="mx-auto text-4xl text-neutral-500 mb-2" />
                <h3 className="text-base font-bold">No inquiries received yet</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                  When potential clients or collaborators submit a message through your portfolio contact form, they will appear right here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                      isDark
                        ? inq.read
                          ? "bg-white/[0.02] border-white/10"
                          : "bg-teal-950/25 border-teal-500/30"
                        : inq.read
                        ? "bg-white border-gray-200"
                        : "bg-teal-50/60 border-teal-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-500/15 text-teal-400 font-bold flex items-center justify-center shrink-0">
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold">{inq.name}</h3>
                            {!inq.read && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-500 text-white">
                                UNREAD
                              </span>
                            )}
                            {inq.source === "supabase" && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 font-mono">
                                SUPABASE
                              </span>
                            )}
                          </div>

                          <div
                            className={`flex flex-wrap items-center gap-3 text-xs mt-1 ${
                              isDark ? "text-neutral-400" : "text-gray-500"
                            }`}
                          >
                            <a
                              href={`mailto:${inq.email}`}
                              className="flex items-center gap-1 hover:text-teal-400"
                            >
                              <LuMail /> {inq.email}
                            </a>
                            {inq.phone && (
                              <a
                                href={`tel:${inq.phone}`}
                                className="flex items-center gap-1 hover:text-teal-400"
                              >
                                <LuPhone /> {inq.phone}
                              </a>
                            )}
                            <span className="flex items-center gap-1">
                              <LuCalendar /> {new Date(inq.date).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-start">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${inq.name}, thank you for contacting me regarding: ${inq.subject}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                            title="Reply on WhatsApp"
                          >
                            <BsWhatsapp className="text-base" />
                          </a>
                        )}

                        <a
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(
                            inq.subject || "Project Inquiry"
                          )}`}
                          className="p-2 rounded-xl text-teal-400 hover:bg-teal-500/10 transition-colors"
                          title="Reply via Email"
                        >
                          <LuMail className="text-base" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleToggleRead(inq.id)}
                          className={`p-2 rounded-xl transition-colors cursor-pointer ${
                            inq.read
                              ? "text-neutral-400 hover:text-teal-400 hover:bg-white/5"
                              : "text-teal-400 hover:bg-teal-500/10"
                          }`}
                          title={inq.read ? "Mark as unread" : "Mark as read"}
                        >
                          <LuCircleCheck className="text-base" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <LuTrash2 className="text-base" />
                        </button>
                      </div>
                    </div>

                    <div
                      className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                        isDark ? "text-teal-400" : "text-teal-700"
                      }`}
                    >
                      Subject: {inq.subject || "Portfolio Contact Inquiry"}
                    </div>

                    <p
                      className={`text-sm leading-relaxed p-3.5 rounded-xl ${
                        isDark
                          ? "bg-white/5 text-neutral-200"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ADD / EDIT PROJECT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
          <div
            className={`w-full max-w-2xl my-8 rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              isDark
                ? "bg-[#202020] border-white/15 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <LuFolderGit2 className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {projectModalMode === "add"
                      ? "Add New Portfolio Project"
                      : "Edit Portfolio Project"}
                  </h3>
                  <p
                    className={`text-xs ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    Updates are instantly applied to your portfolio carousel
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all"
              >
                <LuX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.title}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Hospital Management System"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Category / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.category}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        category: e.target.value,
                      })
                    }
                    placeholder="e.g. Full Stack Developer"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Type / Company
                  </label>
                  <select
                    value={projectFormData.company}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        company: e.target.value,
                      })
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-[#252525] border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  >
                    <option value="Personal">Personal Project</option>
                    <option value="Company">Company / Client Project</option>
                  </select>
                </div>
              </div>

              {/* Image Upload & Preview Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider">
                    Project Image
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setImageUploadMethod("upload")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        imageUploadMethod === "upload"
                          ? "bg-teal-500 text-white"
                          : isDark
                          ? "bg-white/5 text-neutral-400 hover:text-white"
                          : "bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <LuUpload className="text-xs" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMethod("url")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        imageUploadMethod === "url"
                          ? "bg-teal-500 text-white"
                          : isDark
                          ? "bg-white/5 text-neutral-400 hover:text-white"
                          : "bg-gray-100 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <LuImage className="text-xs" />
                      <span>Image URL</span>
                    </button>
                  </div>
                </div>

                {imageUploadMethod === "upload" ? (
                  <div>
                    {projectFormData.image ? (
                      <div
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-4 ${
                          isDark
                            ? "bg-white/[0.02] border-white/10"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={projectFormData.image}
                            alt="Project Preview"
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 bg-neutral-900"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold block truncate">
                              Image selected
                            </span>
                            <span className="text-[10px] text-teal-400 block font-mono">
                              {projectFormData.image.startsWith("data:")
                                ? "Uploaded Image (Local/Data)"
                                : "Supabase/Cloud Hosted"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <label className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white cursor-pointer transition-all inline-flex items-center gap-1">
                            <LuUpload className="text-xs" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageFileChange}
                              disabled={isUploadingImage}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setProjectFormData((prev) => ({
                                ...prev,
                                image: "",
                              }))
                            }
                            className="p-1.5 rounded-xl text-red-400 hover:bg-red-500/10 cursor-pointer"
                            title="Remove image"
                          >
                            <LuTrash2 className="text-sm" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group ${
                          isDark
                            ? "border-white/15 hover:border-teal-400/50 bg-white/[0.01] hover:bg-white/[0.03]"
                            : "border-gray-300 hover:border-teal-500 bg-gray-50 hover:bg-teal-50/20"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                          disabled={isUploadingImage}
                        />
                        {isUploadingImage ? (
                          <div className="flex flex-col items-center gap-2 text-teal-400">
                            <div className="w-6 h-6 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
                            <span className="text-xs font-semibold">
                              Uploading image to Supabase...
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-center">
                            <div className="p-3 rounded-full bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                              <LuUpload className="text-xl" />
                            </div>
                            <div>
                              <span className="text-xs font-bold block group-hover:text-teal-400 transition-colors">
                                Click to browse or drag & drop image
                              </span>
                              <span
                                className={`text-[10px] block mt-0.5 ${
                                  isDark ? "text-neutral-500" : "text-gray-400"
                                }`}
                              >
                                PNG, JPG, JPEG, WEBP or SVG up to 10MB
                              </span>
                            </div>
                          </div>
                        )}
                      </label>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={projectFormData.image}
                      onChange={(e) =>
                        setProjectFormData({
                          ...projectFormData,
                          image: e.target.value,
                        })
                      }
                      placeholder="Paste Image URL (e.g. https://images.unsplash.com/...)"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                      }`}
                    />
                    {projectFormData.image && (
                      <div className="mt-2 flex items-center gap-2">
                        <img
                          src={projectFormData.image}
                          alt="Preview"
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-900 border border-white/10"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <span className="text-[11px] text-neutral-400 truncate">
                          Preview loaded
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={projectFormData.technology}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      technology: e.target.value,
                    })
                  }
                  placeholder="e.g. React.js, Tailwind CSS, Python, Django"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                  }`}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={projectFormData.link}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        link: e.target.value,
                      })
                    }
                    placeholder="https://example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={projectFormData.github}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        github: e.target.value,
                      })
                    }
                    placeholder="https://github.com/..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Demo Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={projectFormData.username}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        username: e.target.value,
                      })
                    }
                    placeholder="e.g. demo_user"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Demo Password (Optional)
                  </label>
                  <input
                    type="text"
                    value={projectFormData.password}
                    onChange={(e) =>
                      setProjectFormData({
                        ...projectFormData,
                        password: e.target.value,
                      })
                    }
                    placeholder="e.g. demo123"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={projectFormData.description}
                  onChange={(e) =>
                    setProjectFormData({
                      ...projectFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe key features, challenges solved, and impact..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all leading-relaxed ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-teal-400"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-teal-500"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isDark
                      ? "border-white/10 hover:bg-white/5 text-neutral-300"
                      : "border-gray-200 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all cursor-pointer shadow-md"
                >
                  {projectModalMode === "add" ? "Save Project" : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE PROJECT MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl ${
              isDark
                ? "bg-[#252525] border-white/15 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <h3 className="text-lg font-bold text-red-400 mb-2">
              Confirm Delete Project
            </h3>
            <p
              className={`text-xs leading-relaxed mb-6 ${
                isDark ? "text-neutral-300" : "text-gray-600"
              }`}
            >
              Are you sure you want to permanently delete this project? It will be removed from your live portfolio carousel immediately.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  isDark
                    ? "border-white/10 hover:bg-white/5 text-neutral-300"
                    : "border-gray-200 hover:bg-gray-100 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-600 text-white cursor-pointer shadow-md"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT EXPERIENCE MODAL */}
      {isExperienceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
          <div
            className={`w-full max-w-2xl my-8 rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              isDark
                ? "bg-[#202020] border-white/15 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <LuCalendar className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {experienceModalMode === "add"
                      ? "Add New Experience / Education"
                      : "Edit Experience Role"}
                  </h3>
                  <p
                    className={`text-xs ${
                      isDark ? "text-neutral-400" : "text-gray-500"
                    }`}
                  >
                    Updates are immediately synced to your live portfolio timeline
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExperienceModalOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all"
              >
                <LuX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Company / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={experienceFormData.company}
                    onChange={(e) =>
                      setExperienceFormData({
                        ...experienceFormData,
                        company: e.target.value,
                      })
                    }
                    placeholder="e.g. National Incubation & Research Center"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Job Title / Degree *
                  </label>
                  <input
                    type="text"
                    required
                    value={experienceFormData.title}
                    onChange={(e) =>
                      setExperienceFormData({
                        ...experienceFormData,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Full-Stack Developer"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Time Period *
                </label>
                <input
                  type="text"
                  required
                  value={experienceFormData.period}
                  onChange={(e) =>
                    setExperienceFormData({
                      ...experienceFormData,
                      period: e.target.value,
                    })
                  }
                  placeholder="e.g. Jul 2025 - Present or 2020 - 2025"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                  }`}
                />
              </div>

              {/* Logo Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider">
                    Company / Institution Logo
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[
                      { id: "preset", label: "Presets" },
                      { id: "upload", label: "Upload File" },
                      { id: "url", label: "Logo URL" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setLogoUploadMethod(m.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          logoUploadMethod === m.id
                            ? "bg-purple-500 text-white shadow-sm"
                            : isDark
                            ? "bg-white/5 text-neutral-400 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {logoUploadMethod === "preset" ? (
                  <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5">
                    <button
                      type="button"
                      onClick={() =>
                        setExperienceFormData({
                          ...experienceFormData,
                          logo: "/assets/nirc.png",
                        })
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer transition-all ${
                        experienceFormData.logo === "/assets/nirc.png"
                          ? "border-purple-400 bg-purple-500/20 text-purple-300"
                          : isDark
                          ? "border-white/10 hover:border-white/30 text-neutral-300"
                          : "border-gray-200 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <img
                        src="/assets/nirc.png"
                        alt="NIRC"
                        className="w-5 h-5 object-contain"
                      />
                      <span>NIRC Logo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setExperienceFormData({
                          ...experienceFormData,
                          logo: "/assets/tu.png",
                        })
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 cursor-pointer transition-all ${
                        experienceFormData.logo === "/assets/tu.png"
                          ? "border-purple-400 bg-purple-500/20 text-purple-300"
                          : isDark
                          ? "border-white/10 hover:border-white/30 text-neutral-300"
                          : "border-gray-200 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <img
                        src="/assets/tu.png"
                        alt="TU"
                        className="w-5 h-5 object-contain"
                      />
                      <span>Tribhuvan University Logo</span>
                    </button>
                  </div>
                ) : logoUploadMethod === "upload" ? (
                  <div>
                    {experienceFormData.logo ? (
                      <div
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-4 ${
                          isDark
                            ? "bg-white/[0.02] border-white/10"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={experienceFormData.logo}
                            alt="Logo preview"
                            className="w-12 h-12 rounded-xl object-contain bg-neutral-800 p-1 border border-white/10 shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/assets/nirc.png";
                            }}
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-purple-400 block truncate">
                              Logo selected
                            </span>
                            <span className="text-[10px] text-neutral-400 block truncate">
                              {experienceFormData.logo.startsWith("data:")
                                ? "Base64 encoded file"
                                : experienceFormData.logo}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <label className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500 hover:bg-purple-400 text-white cursor-pointer transition-all shadow-sm">
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoFileChange}
                              disabled={isUploadingLogo}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label
                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group ${
                          isDark
                            ? "border-white/15 hover:border-purple-400/50 bg-white/[0.01] hover:bg-white/[0.03]"
                            : "border-gray-300 hover:border-purple-500 bg-gray-50 hover:bg-purple-50/20"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoFileChange}
                          disabled={isUploadingLogo}
                        />
                        {isUploadingLogo ? (
                          <div className="flex flex-col items-center gap-2 text-purple-400">
                            <div className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                            <span className="text-xs font-semibold">
                              Uploading logo...
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-center">
                            <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                              <LuUpload className="text-xl" />
                            </div>
                            <div>
                              <span className="text-xs font-bold block group-hover:text-purple-400 transition-colors">
                                Click to browse or drag & drop logo
                              </span>
                              <span
                                className={`text-[10px] block mt-0.5 ${
                                  isDark ? "text-neutral-500" : "text-gray-400"
                                }`}
                              >
                                PNG, JPG, JPEG, WEBP or SVG up to 10MB
                              </span>
                            </div>
                          </div>
                        )}
                      </label>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={experienceFormData.logo}
                      onChange={(e) =>
                        setExperienceFormData({
                          ...experienceFormData,
                          logo: e.target.value,
                        })
                      }
                      placeholder="Paste Logo URL (e.g. /assets/nirc.png or https://...)"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                      }`}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Key Skills & Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={experienceFormData.skills}
                  onChange={(e) =>
                    setExperienceFormData({
                      ...experienceFormData,
                      skills: e.target.value,
                    })
                  }
                  placeholder="e.g. HTML, CSS, JavaScript, React JS, Django, Java Grails"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Role Description & Highlights
                </label>
                <textarea
                  rows={3}
                  value={experienceFormData.description}
                  onChange={(e) =>
                    setExperienceFormData({
                      ...experienceFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your responsibilities, team collaboration, system architecture, or academic learning..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all leading-relaxed ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-purple-400"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsExperienceModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isDark
                      ? "border-white/10 hover:bg-white/5 text-neutral-300"
                      : "border-gray-200 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white transition-all cursor-pointer shadow-md"
                >
                  {experienceModalMode === "add"
                    ? "Save Experience"
                    : "Update Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE EXPERIENCE MODAL */}
      {deleteConfirmExpId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl ${
              isDark
                ? "bg-[#252525] border-white/15 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <h3 className="text-lg font-bold text-red-400 mb-2">
              Confirm Delete Experience
            </h3>
            <p
              className={`text-xs leading-relaxed mb-6 ${
                isDark ? "text-neutral-300" : "text-gray-600"
              }`}
            >
              Are you sure you want to permanently delete this experience entry? It will be removed from your live timeline immediately.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmExpId(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  isDark
                    ? "border-white/10 hover:bg-white/5 text-neutral-300"
                    : "border-gray-200 hover:bg-gray-100 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteExperience(deleteConfirmExpId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-600 text-white cursor-pointer shadow-md"
              >
                Yes, Delete Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
