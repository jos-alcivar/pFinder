import { useEffect, useState } from "react";
import {
  fetchExperienceLevel,
  fetchWorkModel,
  applyFilter,
} from "../utils/filterbar.helpers";

export function useFilterOptions() {
  const [location, setLocation] = useState([]);
  const [jobtitle, setJobtitle] = useState([]);
  const [company, setCompany] = useState([]);
  const [experience, setExperience] = useState([]);
  const [model, setModel] = useState([]);

  async function loadDefault() {
    const data = await applyFilter({
      Location: "",
      "Job Title": "",
      Company: "",
      Experience: "",
      "Work Model": "",
    });
    const locationData = data.map((location) => location.country_name);
    const locationArray = [...new Set(locationData)];
    setLocation(locationArray.sort());
    //console.log("this is the location array: ", locationArray);

    const jobtitleData = data.map((jobtitle) => jobtitle.jobtitle_name);
    const jobtitleArray = [...new Set(jobtitleData)];
    setJobtitle(jobtitleArray.sort());
    //console.log("this is the jobtitle array: ", jobtitleArray);

    const companyData = data.map((company) => company.company_name);
    const companyArray = [...new Set(companyData)];
    setCompany(companyArray.sort());
    //console.log("this is the company array: ", companyArray);
  }

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
    loadDefault();
  }, []); // Empty dependency array ensures this effect runs only once

  // Set the filter options, including the dynamic experience list
  const [filterOptions, setFilterOptions] = useState(() => [
    { label: "Location", type: "unselected", optionList: [] },
    { label: "Job Title", type: "unselected", optionList: [] },
    { label: "Experience", type: "unselected", optionList: [] }, // Placeholder for experience list
    { label: "Company", type: "unselected", optionList: [] },
    { label: "Work Model", type: "unselected", optionList: [] },
  ]);

  // UseEffect to update the filter options when data is loaded
  useEffect(() => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.label === "Location" && location.length > 0) {
          return { ...option, optionList: location };
        }
        if (option.label === "Job Title" && jobtitle.length > 0) {
          return { ...option, optionList: jobtitle };
        }
        if (option.label === "Company" && company.length > 0) {
          return { ...option, optionList: company };
        }
        if (option.label === "Experience" && experience.length > 0) {
          return { ...option, optionList: experience };
        }
        if (option.label === "Work Model" && model.length > 0) {
          return { ...option, optionList: model };
        }
        return option;
      })
    );
  }, [company, experience, jobtitle, location, model]); // Run this effect whenever the state changes

  return [filterOptions, setFilterOptions];
}
