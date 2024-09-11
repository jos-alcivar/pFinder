// useJobTitle.js
import { useState, useEffect } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function useJobTitle() {
  const [jobTitles, setJobTitles] = useState([]);
  useEffect(() => {
    async function loadJobTitles() {
      const response = await fetch(`${apiBaseUrl}/job-titles`);
      const data = await response.json();
      const jobTitleList = data.map((title) => title.jobtitle_name);
      setJobTitles(jobTitleList);
    }
    loadJobTitles();
  }, []);

  return [jobTitles, setJobTitles];
}
