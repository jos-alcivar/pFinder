import "./App.css";

import { Button } from "./components/Button";
import { CardPost } from "./components/CardPost";
import { CardTopScore } from "./components/CardTopScore/CardTopScore";
import DropdownWithCheckboxes from "./components/DropdownMenu/DropdownMenu";
import { InputItem } from "./components/InputItem";

import { Option } from "./components/Option";
import { OptionCircle } from "./components/OptionCircle";

function App() {
  return (
    <>
      <div className="card">
        <Button label="Apply" />
        <Button label="Cancel" type="secondary" />
        <Option label="Anything" />
        <OptionCircle label="all" />
        <InputItem label="Job Title" />
        <CardPost
          heading="Heading"
          label="Label"
          location="City, State, Country"
          model="Work Model"
          experience="Experience"
        />
        <CardTopScore />
        <DropdownWithCheckboxes />
      </div>
    </>
  );
}

export default App;
