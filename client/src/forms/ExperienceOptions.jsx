/* eslint-disable react/prop-types */
import { Option } from "../components/Option";

export function ExperienceOptions({ experience, setExperience }) {
  return (
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
  );
}
