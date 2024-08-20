import { useEffect, useState } from "react";
import "./style.css";
import { TabItem } from "../components/TabItem";
import { InputItem } from "../components/InputItem";
import { Button } from "../components/Button";
import { Option } from "../components/Option";

function Post() {
  useEffect(() => {
    loadExperience();
    loadWorkModel();
  }, []);

  // --- LOAD EXPERIENCE VALUES FROM DB ---
  const [experience, setExperience] = useState([]);
  const loadExperience = async () => {
    const response = await fetch("http://localhost:3000/experience");
    const data = await response.json();
    const experienceList = data.map((experience) => experience.level);
    setExperience(
      experienceList.map((level) => ({
        label: level,
        status: "default",
      }))
    );
  };

  // --- LOAD WORK MODEL VALUES FROM DB ---
  const [model, setModel] = useState([]);
  const loadWorkModel = async () => {
    const response = await fetch("http://localhost:3000/work-model");
    const data = await response.json();
    const workModelList = data.map((model) => model.model_name);
    setModel(
      workModelList.map((model) => ({
        label: model,
        status: "default",
      }))
    );
  };

  // Set values from text inputs
  const [post, setPost] = useState({
    title: "",
    experience: [],
    country: "",
    state: "",
    city: "",
    company: "",
    link: "",
    model: [],
    date: "",
  });

  // Handle Changes
  function handleChange(event) {
    // Input values
    const { name, value } = event.target;
    setPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    // Option values
    const experienceOptions = experience.filter(
      (experience) => experience.type === "selected"
    );
    const experienceList = experienceOptions.map((i) => i.label);
    const modelOptions = model.filter((model) => model.type === "selected");
    const modelList = modelOptions.map((i) => i.label);
    setPost((prevPost) => ({
      ...prevPost,
      experience: experienceList,
      model: modelList,
    }));
  }

  function handleSubmitButton() {
    //const form = document.getElementById("form-postJob");
    //   if (form) {
    //     form.submit();
    //   }
    console.log("Form data:", post);
    console.log("Button was clicked, form submitted");
  }

  return (
    <div className="app-ctn">
      <div className="header-ctn">
        <label className="header-text">New Post</label>
      </div>
      <div className="body-ctn">
        <div className="content-ctn">
          <div>
            <form id="form-postJob" className="form-ctn">
              <div className="form-job">
                <InputItem
                  onChange={handleChange}
                  value={post.title}
                  name="title"
                  placeholder="Add job title"
                  label="Job Title:"
                  required
                />
                <div className="experience-row">
                  <div className="option-row">
                    {experience.map((option, index) => (
                      <Option
                        key={index}
                        label={option.label}
                        status={option.status}
                        onTypeChange={(newType) => {
                          setExperience((prevOptions) =>
                            prevOptions.map((opt, idx) =>
                              idx === index ? { ...opt, type: newType } : opt
                            )
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <hr className="separator"></hr>
              <div className="form-location">
                <InputItem
                  onChange={handleChange}
                  value={post.country}
                  name="country"
                  placeholder="Country"
                  label="Country:"
                  required
                />
                <InputItem
                  onChange={handleChange}
                  value={post.state}
                  name="state"
                  placeholder="State/Province"
                  label="State/Province:"
                  required
                />
                <InputItem
                  onChange={handleChange}
                  value={post.city}
                  name="city"
                  placeholder="City"
                  label="City:"
                  required
                />
              </div>
              <hr className="separator"></hr>
              <div className="form-company">
                <InputItem
                  onChange={handleChange}
                  value={post.company}
                  name="company"
                  placeholder="Company"
                  label="Company:"
                  required
                />
                <InputItem
                  onChange={handleChange}
                  value={post.link}
                  name="link"
                  placeholder="Link to website, source or email contact"
                  label="Link:"
                />
              </div>
              <hr className="separator"></hr>
              <div className="form-info">
                <div className="model-row">
                  <label className="model-label">Work Model</label>
                  <div className="option-row">
                    {model.map((option, index) => (
                      <Option
                        key={index}
                        label={option.label}
                        status={option.status}
                        onTypeChange={(newType) => {
                          setModel((prevOptions) =>
                            prevOptions.map((opt, idx) =>
                              idx === index ? { ...opt, type: newType } : opt
                            )
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
                <InputItem
                  onChange={handleChange}
                  value={post.date}
                  name="date"
                  placeholder="Date this post was published"
                  label="Date:"
                  required
                />
              </div>
              <hr className="separator"></hr>
              <div className="form-submit">
                <Button
                  id="submit-button"
                  label="Post"
                  type="primary"
                  onClick={handleSubmitButton}
                />
              </div>
            </form>
          </div>
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
