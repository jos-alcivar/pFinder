import { useNavigate } from "react-router-dom";
import { PostForm } from "../forms/PostForm";
import { useCity } from "../hooks/useCity";
import { useCompany } from "../hooks/useCompany";
import { useCountry } from "../hooks/useCountry";
import { useExperience } from "../hooks/useExperience";
import { useJobTitle } from "../hooks/useJobTitle";
import { usePostState } from "../hooks/usePostState";
import { useWorkModel } from "../hooks/useWorkModel";
import { useStateProvince } from "../hooks/useStateProvince";
import {
  fetchAndSetCity,
  fetchAndSetCompany,
  fetchAndSetCountry,
  fetchAndSetJobTitle,
  fetchAndSetState,
  fetchAndSetExperience,
  fetchAndSetWorkmodel,
} from "../utils/formHelpers";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";

function Post() {
  const [cities, setCities] = useCity();
  const [companies, setCompanies] = useCompany();
  const [countries] = useCountry();
  const [experience, setExperience] = useExperience();
  const [jobTitles] = useJobTitle();
  const [provinces, setProvinces] = useStateProvince();
  const [model, setModel] = useWorkModel();
  const [post, setPost] = usePostState();
  const navigate = useNavigate();

  async function handleOptionsChange() {
    const selectedExp = experience.filter((exp) => exp.type === "selected");
    const selectedExpList = selectedExp.map((e) => e.label);
    const selectedModel = model.filter((mod) => mod.type === "selected");
    const selectedModelList = selectedModel.map((m) => m.label);
    if (selectedExpList.length !== 0 && selectedModelList.length !== 0) {
      const { experience_id } = await fetchAndSetExperience(selectedExpList);
      const { model_id } = await fetchAndSetWorkmodel(selectedModelList);
      return {
        experience_id,
        model_id,
      };
    }
  }

  async function handleChange(event) {
    const { name, value } = event.target;
    setPost((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    switch (name) {
      case "jobtitle_name": {
        await fetchAndSetJobTitle(value, setPost);
        break;
      }
      case "country_name": {
        await fetchAndSetCountry(value, setPost, setProvinces);
        break;
      }
      case "state_name": {
        await fetchAndSetState(value, setPost, setCities);
        break;
      }
      case "city_name": {
        await fetchAndSetCity(value, setPost, setCompanies);
        break;
      }
      case "company_name": {
        await fetchAndSetCompany(value, setPost);
        break;
      }
    }
  }

  async function handleSubmitButton() {
    const form = document.getElementById("form-postJob");
    if (form) {
      if (!form.checkValidity()) {
        form.reportValidity(); // This will trigger the "Please fill out this field" alerts
      } else {
        const options = await handleOptionsChange();
        if (options) {
          setPost((prevPost) => {
            const updatedPost = {
              ...prevPost,
              ...options,
            };
            console.log("Form data updated:", updatedPost);

            fetch("http://localhost:3000/new-post", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedPost),
            });
            alert("Form Submitted!");

            return updatedPost;
          });
          // Proceed with form submission or further processing
        } else {
          alert("Please fill out all required fields.");
        }
      }
    }
  }

  return (
    <div className="app-ctn">
      <Header />
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
            cities={cities}
            companies={companies}
          />
        </div>
      </div>

      <TabBar />
    </div>
  );
}

export default Post;
