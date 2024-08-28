// useFilterOptions.js
import { useState } from "react";

export function useFilterOptions() {
  const locationList = ["Op1", "Op2", "Op3"];
  const jobtitleList = ["Op4", "Op5", "Op6"];
  const experienceList = ["Op7", "Op8", "Op9"];
  const companyList = ["Op10", "Op12", "Op13"];
  const modelList = ["Op11", "Op22", "Op23"];

  const [filterOptions, setFilterOptions] = useState(() => [
    { label: "Location", type: "unselected", optionList: locationList },
    { label: "Job Title", type: "unselected", optionList: jobtitleList },
    { label: "Experience", type: "unselected", optionList: experienceList },
    { label: "Company", type: "unselected", optionList: companyList },
    { label: "Work Model", type: "unselected", optionList: modelList },
  ]);

  return [filterOptions, setFilterOptions];
}
