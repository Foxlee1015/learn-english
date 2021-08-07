import inputCheckboxStyles from "../../styles/components/InputCheckbox.module.css";
import { Checkbox } from "antd";

const InputCheckbox = ({
  label = "",
  checked = false,
  onChange = () => {},
}) => {
  return (
    <div className={inputCheckboxStyles.container}>
      <Checkbox
        checked={checked}
        value={checked}
        onChange={(e) => onChange(e.target.checked)}
      >
        {label}
      </Checkbox>
    </div>
  );
};

export default InputCheckbox;
