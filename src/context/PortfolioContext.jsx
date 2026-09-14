/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolioItems as defaultPortfolioItems } from "../data/data";
import { supabase } from "../lib/supabase";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem("portfolio_items_dynamic");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading local portfolio items:", e);
    }
    return defaultPortfolioItems;
  });

  const [isLoading] = useState(false);

  // Sync with Supabase portfolio_items table if it exists
  useEffect(() => {
    let isMounted = true;
    const loadFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("portfolio_items")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error && data && data.length > 0 && isMounted) {
          const mapped = data.map((item) => {
            const defaultItem = defaultPortfolioItems.find((d) => d.id === item.id);
            return {
              id: item.id,
              title: item.title,
              category: item.category,
              company: item.company || "Personal",
              username: item.username || "",
              password: item.password || "",
              image: item.image || defaultItem?.image || "",
              technology: Array.isArray(item.technology)
                ? item.technology
                : typeof item.technology === "string"
                ? item.technology.split(",").map((t) => t.trim())
                : [],
              github: item.github || "",
              link: item.link || "",
              description: item.description || "",
            };
          });

          setProjects(mapped);
          localStorage.setItem("portfolio_items_dynamic", JSON.stringify(mapped));
        }
      } catch (err) {
        console.warn("Supabase portfolio_items check skipped:", err);
      }
    };

    loadFromSupabase();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveProjects = (updatedList) => {
    setProjects(updatedList);
    try {
      localStorage.setItem(
        "portfolio_items_dynamic",
        JSON.stringify(updatedList)
      );
    } catch (e) {
      console.error("Error saving projects to localStorage:", e);
    }
  };

  const addProject = async (projectData) => {
    const newProject = {
      id: "proj-" + Date.now(),
      title: projectData.title || "Untitled Project",
      category: projectData.category || "Full Stack Developer",
      company: projectData.company || "Personal",
      username: projectData.username || "",
      password: projectData.password || "",
      image: projectData.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      technology: Array.isArray(projectData.technology)
        ? projectData.technology
        : typeof projectData.technology === "string"
        ? projectData.technology.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      github: projectData.github || "",
      link: projectData.link || "",
      description: projectData.description || "",
    };

    const updated = [newProject, ...projects];
    saveProjects(updated);

    // Attempt insert into Supabase
    try {
      await supabase.from("portfolio_items").insert([
        {
          id: newProject.id,
          title: newProject.title,
          category: newProject.category,
          company: newProject.company,
          username: newProject.username,
          password: newProject.password,
          image: newProject.image,
          technology: newProject.technology,
          github: newProject.github,
          link: newProject.link,
          description: newProject.description,
        },
      ]);
    } catch (e) {
      console.warn("Supabase portfolio_items insert skipped:", e);
    }

    return newProject;
  };

  const updateProject = async (id, updatedFields) => {
    const updated = projects.map((p) => {
      if (p.id === id || p.title === id) {
        return {
          ...p,
          ...updatedFields,
          technology: Array.isArray(updatedFields.technology)
            ? updatedFields.technology
            : typeof updatedFields.technology === "string"
            ? updatedFields.technology.split(",").map((t) => t.trim()).filter(Boolean)
            : p.technology,
        };
      }
      return p;
    });

    saveProjects(updated);

    // Attempt update in Supabase
    try {
      await supabase
        .from("portfolio_items")
        .update({
          title: updatedFields.title,
          category: updatedFields.category,
          company: updatedFields.company,
          username: updatedFields.username,
          password: updatedFields.password,
          image: updatedFields.image,
          technology: updatedFields.technology,
          github: updatedFields.github,
          link: updatedFields.link,
          description: updatedFields.description,
        })
        .eq("id", id);
    } catch (e) {
      console.warn("Supabase portfolio_items update skipped:", e);
    }
  };

  const deleteProject = async (id) => {
    const updated = projects.filter((p) => p.id !== id && p.title !== id);
    saveProjects(updated);

    // Attempt delete in Supabase
    try {
      await supabase.from("portfolio_items").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase portfolio_items delete skipped:", e);
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem("portfolio_items_dynamic");
    setProjects(defaultPortfolioItems);
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        isLoading,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
