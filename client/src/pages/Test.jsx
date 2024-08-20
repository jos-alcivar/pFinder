import "./style.css";
import { TabItem } from "../components/TabItem";
import { useExperience } from "../hooks/useExperience";
import { useWorkModel } from "../hooks/useWorkModel";
import { usePostState } from "../hooks/usePostState";
import { PostForm } from "../forms/PostForm";
import { useEffect } from "react";

function Post() {
  const [experience, setExperience] = useExperience();
  const [model, setModel] = useWorkModel();
  const [post, setPost] = usePostState();

  useEffect(() => {
    console.log("Updated post data:", post);
  }, [post]);

  function handleOptionsChange() {
    const selectedExp = experience.filter((exp) => exp.type === "selected");
    const selectedExpList = selectedExp.map((e) => e.label);
    const selectedModel = model.filter((mod) => mod.type === "selected");
    const selectedModelList = selectedModel.map((m) => m.label);
    setPost((prevPost) => ({
      ...prevPost,
      experience: selectedExpList,
      model: selectedModelList,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setPost((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmitButton() {
    handleOptionsChange();
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
          <PostForm
            post={post}
            handleChange={handleChange}
            handleSubmitButton={handleSubmitButton}
            experience={experience}
            setExperience={setExperience}
            model={model}
            setModel={setModel}
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
