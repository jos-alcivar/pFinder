import "./style.css";
import { TabItem } from "../components/TabItem";
import { PostForm } from "../forms/PostForm";
import { useCity } from "../hooks/useCity";
import { useCompany } from "../hooks/useCompany";
import { useCountry } from "../hooks/useCountry";
import { useExperience } from "../hooks/useExperience";
import { useJobTitle } from "../hooks/useJobTitle";
import { usePostState } from "../hooks/usePostState";
import { useWorkModel } from "../hooks/useWorkModel";
import { useStateProvince } from "../hooks/useStateProvince";

function Post() {
  const [citites] = useCity();
  const [companies] = useCompany();
  const [countries] = useCountry();
  const [experience, setExperience] = useExperience();
  const [jobTitles] = useJobTitle();
  const [provinces, setProvinces] = useStateProvince();
  const [model, setModel] = useWorkModel();
  const [post, setPost] = usePostState();

  function handleOptionsChange() {
    const selectedExp = experience.filter((exp) => exp.type === "selected");
    const selectedExpList = selectedExp.map((e) => e.label);
    const selectedModel = model.filter((mod) => mod.type === "selected");
    const selectedModelList = selectedModel.map((m) => m.label);
    return {
      experience: selectedExpList,
      model: selectedModelList,
    };
  }

  async function handleChange(event) {
    const { name, value } = event.target;
    setPost((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    switch (name) {
      case "jobtitle_name": {
        const jobtitleSelected = value;
        let temp_id = 0;
        // --- GET JOB TITLE ID ---
        try {
          const response = await fetch("http://localhost:3000/job-title-id", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobtitle: jobtitleSelected }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Job Title Response Data:", data);
            temp_id = data.found ? data.jobtitle_id : data.jobtitle_id + 1;
            console.log(temp_id, data.found);

            setPost((prevValue) => ({
              ...prevValue,
              jobtitle_id: temp_id,
              jobtitle_exist: data.found,
            }));
            console.log(post);
          } else {
            console.error(
              "Job Title POST request failed:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
        break;
      }
      case "country_name": {
        const countrySelected = value;
        let temp_id = 0;
        // --- GET COUNTRY ID ---
        try {
          const response = await fetch("http://localhost:3000/country-id", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: countrySelected }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Country Response Data:", data);
            temp_id = data.found ? data.country_id : data.country_id + 1;

            setPost((prev) => ({
              ...prev,
              country_id: temp_id,
              country_exist: data.found,
            }));
            // --- GET STATES/PROVINCES BY COUNTRY ---
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
              console.log("States Response Data:", statesList);
            } else {
              console.error(
                "States POST request failed:",
                statesResponse.statusText
              );
            }
          } else {
            console.error("Country POST request failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        break;
      }
      case "state_name": {
        break;
      }
      case "city_name": {
        break;
      }
      case "company_name": {
        break;
      }
      default:
        console.log(name);
    }
  }

  function handleSubmitButton() {
    const options = handleOptionsChange();
    setPost((prevPost) => {
      const updatedPost = {
        ...prevPost,
        ...options,
      };
      console.log("Form data:", updatedPost);
      console.log("Button was clicked, form submitted");
      return updatedPost;
    });

    const form = document.getElementById("form-postJob");
    // if (form) {
    //   alert("Form Submitted!");
    //   form.submit();
    // }
  }

  return (
    <div className="app-ctn">
      <div className="header-ctn">
        <label className="header-text">New Post</label>
      </div>
      <div className="body-ctn">
        <div className="content-ctn">
          <PostForm
            post={post}
            handleChange={handleChange}
            handleSubmitButton={handleSubmitButton}
            experience={experience}
            setExperience={setExperience}
            model={model}
            setModel={setModel}
            jobTitles={jobTitles}
            countries={countries}
            states={provinces}
            cities={citites}
            companies={companies}
          />
        </div>
      </div>

      <div className="tabBar-ctn">
        <div className="buttons-row">
          <TabItem label="posts"></TabItem>
          <TabItem label="reports"></TabItem>
          <TabItem label="jobs"></TabItem>
          <TabItem label="account"></TabItem>
        </div>
      </div>
    </div>
  );
}

export default Post;
