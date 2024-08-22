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
import {
  fetchAndSetCity,
  fetchAndSetCompany,
  fetchAndSetCountry,
  fetchAndSetJobTitle,
  fetchAndSetState,
  fetchAndSetOptions,
} from "../utils/formHelpers";

function Post() {
  const [cities, setCities] = useCity();
  const [companies, setCompanies] = useCompany();
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
    const options = await handleOptionsChange();
    const options_id = await fetchAndSetOptions(options);

    setPost((prevPost) => {
      const updatedPost = {
        ...prevPost,
        ...options_id,
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
            cities={cities}
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
