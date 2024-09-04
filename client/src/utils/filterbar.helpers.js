// filterbar.helpers.js
export async function fetchExperienceLevel() {
  try {
    const response = await fetch("http://localhost:3000/experience-level");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.map((experience) => experience.level);
  } catch (error) {
    console.error("Failed to load experience levels:", error);
    return []; // Return an empty array in case of error
  }
}

export async function fetchWorkModel() {
  try {
    const response = await fetch("http://localhost:3000/work-model");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.map((model) => model.model_name);
  } catch (error) {
    console.error("Failed to load experience levels:", error);
    return []; // Return an empty array in case of error
  }
}

export async function applyFilter(dropdownData) {
  let interval;

  switch (dropdownData["dateIndex"]) {
    case 0:
      interval = 7;
      break;
    case 1:
      interval = 30;
      break;
    case 2:
      interval = 90;
      break;
    case 3:
      interval = 365;
      break;
    default:
      interval = 0;
  }

  try {
    const response = await fetch("http://localhost:3000/filter-job-post-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filterByLocation: dropdownData["Location"],
        filterByJobTitle: dropdownData["Job Title"],
        filterByCompany: dropdownData["Company"],
        filterByExperience: dropdownData["Experience"],
        filterByModel: dropdownData["Work Model"],
        filterByDate: interval,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("applyFilter POST request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
