/* eslint-disable react/prop-types */
import { Option } from "../components/Option";

export function WorkModelOptions({ model, setModel }) {
  return (
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
  );
}
