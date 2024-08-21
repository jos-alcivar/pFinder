// useJobTitle.js
import { useState, useEffect } from "react";

export function useJobTitle() {
  const [jobTitles, setJobTitles] = useState([]);

  useEffect(() => {
    async function loadJobTitles() {
      const response = await fetch("http://localhost:3000/job-titles");
      const data = await response.json();
      const jobTitleList = data.map((title) => title.jobtitle_name);
      setJobTitles(jobTitleList);
    }
    loadJobTitles();
  }, []);

  return [jobTitles, setJobTitles];
}
