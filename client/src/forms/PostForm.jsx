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
  function disableInput(input) {
    if (!input) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <form id="form-postJob" className="form-ctn">
      <div className="form-job">
        <InputItem
          type="text"
          onChange={handleChange}
          value={post.jobtitle_name}
          name="jobtitle_name"
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
          type="text"
          onChange={handleChange}
          value={post.country_name}
          name="country_name"
          placeholder="Country"
          label="Country:"
          required
          options={countries}
        />
        <InputItem
          type="text"
          onChange={handleChange}
          value={post.state_name}
          name="state_name"
          placeholder="State/Province"
          label="State/Province:"
          required
          options={states}
          disabled={disableInput(post.country_name)}
        />
        <InputItem
          type="text"
          onChange={handleChange}
          value={post.city_name}
          name="city_name"
          placeholder="City"
          label="City:"
          required
          options={cities}
          disabled={disableInput(post.state_name)}
        />
      </div>
      <hr className="separator"></hr>
      <div className="form-company">
        <InputItem
          type="text"
          onChange={handleChange}
          value={post.company_name}
          name="company_name"
          placeholder="Company"
          label="Company:"
          required
          options={companies}
          disabled={disableInput(post.city_name)}
        />
        <InputItem
          type="text"
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
          type="date"
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
          style={{ width: "382px", height: "28px" }}
        />
      </div>
    </form>
  );
}
