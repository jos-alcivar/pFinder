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

    const formNewPost = {
      jobtitle_id: 0,
      jobtitle_name: "",
      jobtitle_exist: false,
      experience_id: [],
      country_id: 0,
      country_name: "",
      country_exist: false,
      province_id: 0,
      province_name: "",
      province_exist: false,
      city_id: 0,
      city_name: "",
      city_exist: false,
      company_id: 0,
      company_name: "",
      company_exist: false,
      model_id: [],
      date: "",
      contact: "",
    };

    switch (event.target.name) {
      case "title": {
        const jobtitleSelected = event.target.value;
        try {
          const response = await fetch("http://localhost:3000/job-title-id", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobtitle: jobtitleSelected }),
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Response Data:", data);
            data.found
              ? (formNewPost.jobtitle_id = data.jobtitle_id)
              : (formNewPost.jobtitle_id = data.jobtitle_id + 1);

            formNewPost.jobtitle_name = jobtitleSelected;
            formNewPost.jobtitle_exist = data.found;
          } else {
            console.error("POST request failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        break;
      }
      case "country": {
        const countrySelected = event.target.value;
        try {
          const response = await fetch(
            "http://localhost:3000/states&provinces-by-country",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ value: countrySelected }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const provincesList = data.map((province) => province.state_name);
            setProvinces(provincesList);
            console.log("Response Data:", data);
          } else {
            console.error("POST request failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
        break;
      }
      case "state": {
        break;
      }
      case "city": {
        break;
      }
      case "company": {
        break;
      }
      default:
        console.log(event.target.name);
    }
    console.log(formNewPost);
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
    if (form) {
      alert("Form Submitted!");
      form.submit();
    }
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
