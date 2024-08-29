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
