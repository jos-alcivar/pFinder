// Fetch the Job Title ID and update the post state
export async function fetchAndSetJobTitle(jobtitleSelected, setPost) {
  try {
    const response = await fetch("http://localhost:3000/job-title-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobtitle: jobtitleSelected }),
    });
    if (response.ok) {
      const data = await response.json();
      const temp_id = data.found ? data.jobtitle_id : data.jobtitle_id + 1;

      setPost((prevValue) => ({
        ...prevValue,
        jobtitle_id: temp_id,
        jobtitle_exist: data.found,
      }));
    } else {
      console.error("Job Title ID POST request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch the Country ID and update the post state, then fetch and set provinces
export async function fetchAndSetCountry(
  countrySelected,
  setPost,
  setProvinces
) {
  try {
    const response = await fetch("http://localhost:3000/country-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: countrySelected }),
    });
    if (response.ok) {
      const data = await response.json();
      const temp_id = data.found ? data.country_id : data.country_id + 1;

      setPost((prevValue) => ({
        ...prevValue,
        country_id: temp_id,
        country_exist: data.found,
      }));

      // Fetch states based on the updated country_id
      const statesResponse = await fetch(
        "http://localhost:3000/states&provinces-by-country",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country_id: temp_id }),
        }
      );
      if (statesResponse.ok) {
        const statesData = await statesResponse.json();
        const statesList = statesData.map((state) => state.state_name);
        setProvinces(statesList);
      } else {
        console.error(
          "States List POST request failed:",
          statesResponse.statusText
        );
      }
    } else {
      console.error("Country ID POST request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch the State ID and update the post state, then fetch and set cities
export async function fetchAndSetState(stateSelected, setPost, setCities) {
  try {
    const response = await fetch("http://localhost:3000/state-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: stateSelected }),
    });
    if (response.ok) {
      const data = await response.json();
      const temp_id = data.found ? data.state_id : data.state_id + 1;

      setPost((prevValue) => ({
        ...prevValue,
        state_id: temp_id,
        state_exist: data.found,
      }));

      // Fetch states based on the updated country_id
      const citiesResponse = await fetch(
        "http://localhost:3000/cities-by-states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state_id: temp_id }),
        }
      );
      if (citiesResponse.ok) {
        const citiesData = await citiesResponse.json();
        const citiesList = citiesData.map((city) => city.city_name);
        setCities(citiesList);
      } else {
        console.error(
          "Cities list POST request failed:",
          citiesResponse.statusText
        );
      }
    } else {
      console.error("State ID POST request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch the City ID and update the post state, then fetch and set companies
export async function fetchAndSetCity(citySelected, setPost, setCompanies) {
  try {
    const response = await fetch("http://localhost:3000/city-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: citySelected }),
    });
    if (response.ok) {
      const data = await response.json();
      const temp_id = data.found ? data.city_id : data.city_id + 1;

      setPost((prevValue) => ({
        ...prevValue,
        city_id: temp_id,
        city_exist: data.found,
      }));

      // Fetch states based on the updated country_id
      const companiesResponse = await fetch(
        "http://localhost:3000/companies-by-city",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city_id: temp_id }),
        }
      );
      if (companiesResponse.ok) {
        const companiesData = await companiesResponse.json();
        const companiesList = companiesData.map(
          (company) => company.company_name
        );
        setCompanies(companiesList);
      } else {
        console.error(
          "Companies list POST request failed:",
          companiesResponse.statusText
        );
      }
    } else {
      console.error("City ID POST request failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fetch the Company ID and update the post state
export async function fetchAndSetCompany(companySelected, setPost) {
  try {
    const response = await fetch("http://localhost:3000/company-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: companySelected }),
    });
    if (response.ok) {
      const data = await response.json();
      const temp_id = data.found ? data.company_id : data.company_id + 1;

      setPost((prevValue) => ({
        ...prevValue,
        company_id: temp_id,
        company_exist: data.found,
      }));
    } else {
      console.error("Company ID POST request failed:", response.statusText);
      setPost((prevValue) => ({
        ...prevValue,
        company_id: 1,
      }));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//  Fetch the Experience and Work Model
export async function fetchAndSetOptions(options) {
  let selectedExp;
  let selectedMod;
  try {
    const experienceResponse = await fetch(
      "http://localhost:3000/experience-selected-ids",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: options.experience }),
      }
    );
    if (experienceResponse.ok) {
      selectedExp = await experienceResponse.json();
      console.log("Experience ID", selectedExp);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const modelResponse = await fetch(
      "http://localhost:3000/workmodel-selected-ids",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: options.model }),
      }
    );
    if (modelResponse.ok) {
      selectedMod = await modelResponse.json();
      console.log("Model ID", selectedMod);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return {
    experience_id: selectedExp,
    model_id: selectedMod,
  };
}
