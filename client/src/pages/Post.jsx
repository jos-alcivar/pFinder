import { useState, useEffect, useCallback } from "react";
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
} from "../utils/form.helpers";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";
import "./Post.css";

function Post() {
  const [cities, setCities] = useCity();
  const [companies, setCompanies] = useCompany();
  const [countries] = useCountry();
  const [experience, setExperience] = useExperience();
  const [jobTitles] = useJobTitle();
  const [provinces, setProvinces] = useStateProvince();
  const [model, setModel] = useWorkModel();
  const [post, setPost] = usePostState();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const calculateProgress = useCallback(() => {
    const hasSelectedExp = experience.some((exp) => exp.type === "selected");
    const countA = post.jobtitle_name.length > 0 && hasSelectedExp ? 1 : 0;

    const countB =
      post.country_name.length > 0 &&
      post.state_name.length > 0 &&
      post.city_name.length > 0
        ? 1
        : 0;

    const countC = post.company_name.length > 0 && post.link.length > 0 ? 1 : 0;

    const hasSelectedModel = model.some((mod) => mod.type === "selected");
    const countD = post.date.length > 0 && hasSelectedModel ? 1 : 0;

    setProgress((countA + countB + countC + countD) * 25);
  }, [experience, model, post]);

  useEffect(() => {
    calculateProgress();
  }, [experience, model, post, calculateProgress]);

  async function handleOptionsChange() {
    const selectedExpList = experience
      .filter((exp) => exp.type === "selected")
      .map((e) => e.label);

    const selectedModelList = model
      .filter((mod) => mod.type === "selected")
      .map((m) => m.label);

    if (selectedExpList.length && selectedModelList.length) {
      const { experience_id } = await fetchAndSetExperience(selectedExpList);
      const { model_id } = await fetchAndSetWorkmodel(selectedModelList);
      return { experience_id, model_id };
    }
  }

  async function handleChange(event) {
    const { name, value } = event.target;
    setPost((prevValue) => ({ ...prevValue, [name]: value }));

    const actionMap = {
      jobtitle_name: () => fetchAndSetJobTitle(value, setPost),
      country_name: () => fetchAndSetCountry(value, setPost, setProvinces),
      state_name: () => fetchAndSetState(value, setPost, setCities),
      city_name: () => fetchAndSetCity(value, setPost, setCompanies),
      company_name: () => fetchAndSetCompany(value, post.city_id, setPost),
    };

    if (actionMap[name]) await actionMap[name]();

    calculateProgress();
  }

  async function handleSubmitButton() {
    const form = document.getElementById("form-postJob");
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const options = await handleOptionsChange();
    if (options) {
      setPost((prevPost) => {
        const updatedPost = { ...prevPost, ...options };
        console.log("Form data updated:", updatedPost);

        fetch("http://localhost:3000/new-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        });

        alert("Form Submitted!");
        navigate(0);
        return updatedPost;
      });
    } else {
      alert("Please fill out all required fields.");
    }
  }

  return (
    <div className="app-ctn">
      <Header title={"Create new post"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="progress-ctn">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
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
      <TabBar posts={"selected"} />
    </div>
  );
}

export default Post;
