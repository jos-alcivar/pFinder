// useFilterOptions.js
import { useState } from "react";

export function useFilterOptions() {
  const labels = [
    "Location",
    "Job Title",
    "Experience",
    "Company",
    "Work Model",
  ];
  const [filterOptions, setFilterOptions] = useState(() =>
    labels.map((label) => ({
      label,
      status: "default",
    }))
  );

  return [filterOptions, setFilterOptions];
}
