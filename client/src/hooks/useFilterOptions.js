import { useEffect, useState } from "react";

export function useFilterOptions() {
  const [experience, setExperience] = useState([]);

  // Function to load experience data
  async function loadExperience() {
    try {
      const response = await fetch("http://localhost:3000/experience-level");
      const data = await response.json();
      const experienceList = data.map((experience) => experience.level);
      setExperience(experienceList);
    } catch (error) {
      console.error("Failed to load experience levels:", error);
    }
  }

  // UseEffect to load experience data on component mount
  useEffect(() => {
    loadExperience();
  }, []); // Empty dependency array ensures this effect runs only once

  // Predefined option lists for other categories
  const locationList = ["Op1", "Op2", "Op3"];
  const jobtitleList = ["Op4", "Op5", "Op6"];
  const companyList = ["Op10", "Op12", "Op13"];
  const modelList = ["Op11", "Op22", "Op23"];

  // Set the filter options, including the dynamic experience list
  const [filterOptions, setFilterOptions] = useState(() => [
    { label: "Location", type: "unselected", optionList: locationList },
    { label: "Job Title", type: "unselected", optionList: jobtitleList },
    { label: "Experience", type: "unselected", optionList: [] }, // Placeholder for experience list
    { label: "Company", type: "unselected", optionList: companyList },
    { label: "Work Model", type: "unselected", optionList: modelList },
  ]);

  // UseEffect to update the filter options when experience data is loaded
  useEffect(() => {
    if (experience.length > 0) {
      setFilterOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.label === "Experience"
            ? { ...option, optionList: experience }
            : option
        )
      );
    }
  }, [experience]); // Run this effect whenever the experience state changes

  return [filterOptions, setFilterOptions];
}
