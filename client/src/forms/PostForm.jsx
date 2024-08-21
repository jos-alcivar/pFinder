/* eslint-disable react/prop-types */
import { InputItem } from "../components/InputItem";
import { Button } from "../components/Button";
import { ExperienceOptions } from "./ExperienceOptions";
import { WorkModelOptions } from "./WorkModelOptions";

export function PostForm({
  post,
  handleChange,
  handleSubmitButton,
  experience,
  setExperience,
  model,
  setModel,
  jobTitles,
  countries,
  companies,
  states,
  cities,
}) {
  return (
    <form id="form-postJob" className="form-ctn">
      <div className="form-job">
        <InputItem
          onChange={handleChange}
          value={post.title}
          name="title"
          placeholder="Add job title"
          label="Job Title:"
          options={jobTitles}
          required
        />
        <div className="experience-row">
          <ExperienceOptions
            experience={experience}
            setExperience={setExperience}
          />
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
          options={countries}
        />
        <InputItem
          onChange={handleChange}
          value={post.state}
          name="state"
          placeholder="State/Province"
          label="State/Province:"
          required
          options={states}
        />
        <InputItem
          onChange={handleChange}
          value={post.city}
          name="city"
          placeholder="City"
          label="City:"
          required
          options={cities}
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
          options={companies}
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
          <WorkModelOptions model={model} setModel={setModel} />
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
  );
}
