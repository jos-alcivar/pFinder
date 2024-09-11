// useExperience.js
import { useState, useEffect } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
//--- Function to create form options ----
export function useExperience() {
  const [experience, setExperience] = useState([]);
  useEffect(() => {
    async function loadExperience() {
      const response = await fetch(`${apiBaseUrl}/experience-level`);
      const data = await response.json();
      const experienceList = data.map((experience) => experience.level);
      setExperience(
        experienceList.map((level) => ({
          label: level,
          status: "default",
        }))
      );
    }
    loadExperience();
  }, []);

  return [experience, setExperience];
}
