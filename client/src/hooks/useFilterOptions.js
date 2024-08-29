import { useEffect, useState } from "react";
import { useExperienceOptions } from "./useExperience";
import { useWorkModelOptions } from "./useWorkModel";

export function useFilterOptions() {
  const [filterOptions, setFilterOptions] = useState([]);
  const [experience] = useExperienceOptions();
  const [model] = useWorkModelOptions();
  useEffect(() => {
    // Predefined option lists for other categories
    const locationList = ["Op1", "Op2", "Op3"];
    const jobtitleList = ["Op4", "Op5", "Op6"];
    const companyList = ["Op10", "Op12", "Op13"];
    console.log(experience, model);
    // Set the filter options, including the dynamic experience list
    setFilterOptions([
      { label: "Location", type: "unselected", optionList: locationList },
      { label: "Job Title", type: "unselected", optionList: jobtitleList },
      { label: "Experience", type: "unselected", optionList: experience }, // Placeholder for experience list
      { label: "Company", type: "unselected", optionList: companyList },
      { label: "Work Model", type: "unselected", optionList: model },
    ]);
  }, [experience, model]);

  return [filterOptions, setFilterOptions];
}
