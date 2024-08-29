import { useEffect, useState } from "react";
import {
  fetchExperienceLevel,
  fetchWorkModel,
} from "../utils/filterbar.helpers";

export function useFilterOptions() {
  const [experience, setExperience] = useState([]);
  const [model, setModel] = useState([]);

  // Function to load experience data
  async function loadExperience() {
    const experienceList = await fetchExperienceLevel();
    setExperience(experienceList);
  }

  // Function to load model data
  async function loadWorkModel() {
    const workmodelList = await fetchWorkModel();
    setModel(workmodelList);
  }

  // UseEffect to load data on component mount
  useEffect(() => {
    loadExperience();
    loadWorkModel();
  }, []); // Empty dependency array ensures this effect runs only once

  // Predefined option lists for other categories
  const locationList = ["Op1", "Op2", "Op3"];
  const jobtitleList = ["Op4", "Op5", "Op6"];
  const companyList = ["Op10", "Op12", "Op13"];

  // Set the filter options, including the dynamic experience list
  const [filterOptions, setFilterOptions] = useState(() => [
    { label: "Location", type: "unselected", optionList: locationList },
    { label: "Job Title", type: "unselected", optionList: jobtitleList },
    { label: "Experience", type: "unselected", optionList: [] }, // Placeholder for experience list
    { label: "Company", type: "unselected", optionList: companyList },
    { label: "Work Model", type: "unselected", optionList: [] },
  ]);

  // UseEffect to update the filter options when data is loaded
  useEffect(() => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.label === "Experience" && experience.length > 0) {
          return { ...option, optionList: experience };
        }
        if (option.label === "Work Model" && model.length > 0) {
          return { ...option, optionList: model };
        }
        return option;
      })
    );
  }, [experience, model]); // Run this effect whenever the state changes

  return [filterOptions, setFilterOptions];
}
