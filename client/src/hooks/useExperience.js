// useExperience.js
import { useState, useEffect } from "react";

export function useExperience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    async function loadExperience() {
      const response = await fetch("http://localhost:3000/experience");
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
