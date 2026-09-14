/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { experiences as defaultExperiences } from "../data/data";
import { supabase } from "../lib/supabase";

const ExperienceContext = createContext(null);

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState(() => {
    try {
      const stored = localStorage.getItem("experiences_dynamic");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading local experiences:", e);
    }
    return defaultExperiences;
  });

  const [isLoading] = useState(false);

  // Sync with Supabase experiences table
  useEffect(() => {
    let isMounted = true;
    const loadFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error && data && data.length > 0 && isMounted) {
          const mapped = data.map((item) => {
            const defaultItem = defaultExperiences.find(
              (d) => String(d.id) === String(item.id)
            );
            return {
              id: item.id,
              company: item.company || "Company",
              logo: item.logo || defaultItem?.logo || "/assets/nirc.png",
              title: item.title || "Developer",
              period: item.period || "",
              description: item.description || "",
              skills: Array.isArray(item.skills)
                ? item.skills
                : typeof item.skills === "string"
                ? item.skills.split(",").map((s) => s.trim()).filter(Boolean)
                : [],
            };
          });

          setExperiences(mapped);
          localStorage.setItem("experiences_dynamic", JSON.stringify(mapped));
        }
      } catch (err) {
        console.warn("Supabase experiences check skipped:", err);
      }
    };

    loadFromSupabase();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveExperiences = (updatedList) => {
    setExperiences(updatedList);
    try {
      localStorage.setItem("experiences_dynamic", JSON.stringify(updatedList));
    } catch (e) {
      console.error("Error saving experiences to localStorage:", e);
    }
  };

  const addExperience = async (expData) => {
    const newExperience = {
      id: "exp-" + Date.now(),
      company: expData.company || "Company",
      logo: expData.logo || "/assets/nirc.png",
      title: expData.title || "Developer",
      period: expData.period || "Present",
      description: expData.description || "",
      skills: Array.isArray(expData.skills)
        ? expData.skills
        : typeof expData.skills === "string"
        ? expData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    const updated = [newExperience, ...experiences];
    saveExperiences(updated);

    try {
      const { error } = await supabase.from("experiences").insert([
        {
          id: newExperience.id,
          company: newExperience.company,
          logo: newExperience.logo,
          title: newExperience.title,
          period: newExperience.period,
          description: newExperience.description,
          skills: newExperience.skills,
          order_index: 0,
        },
      ]);
      if (error) {
        console.warn("Could not insert experience into Supabase:", error.message);
      }
    } catch (err) {
      console.warn("Supabase insert error (using local storage):", err);
    }

    return newExperience;
  };

  const updateExperience = async (id, expData) => {
    const updated = experiences.map((item) => {
      if (String(item.id) === String(id)) {
        return {
          ...item,
          ...expData,
          skills: Array.isArray(expData.skills)
            ? expData.skills
            : typeof expData.skills === "string"
            ? expData.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : item.skills,
        };
      }
      return item;
    });

    saveExperiences(updated);

    try {
      const target = updated.find((i) => String(i.id) === String(id));
      if (target) {
        const { error } = await supabase
          .from("experiences")
          .update({
            company: target.company,
            logo: target.logo,
            title: target.title,
            period: target.period,
            description: target.description,
            skills: target.skills,
          })
          .eq("id", id);

        if (error) {
          console.warn("Supabase experience update failed:", error.message);
        }
      }
    } catch (err) {
      console.warn("Supabase update error (using local storage):", err);
    }
  };

  const deleteExperience = async (id) => {
    const updated = experiences.filter((item) => String(item.id) !== String(id));
    saveExperiences(updated);

    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);
      if (error) {
        console.warn("Supabase experience delete failed:", error.message);
      }
    } catch (err) {
      console.warn("Supabase delete error (using local storage):", err);
    }
  };

  const resetToDefaults = async () => {
    saveExperiences(defaultExperiences);
  };

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        isLoading,
        addExperience,
        updateExperience,
        deleteExperience,
        resetToDefaults,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
};
