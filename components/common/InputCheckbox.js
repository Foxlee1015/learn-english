import inputCheckboxStyles from "../../styles/components/InputCheckbox.module.css";

const InputCheckbox = ({
  label = "",
  checked = false,
  onChange = () => {},
}) => {
  return (
    <div className={inputCheckboxStyles.container}>
      <input
        className={inputCheckboxStyles.input}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      ></input>
      <label
        onClick={() => onChange(!checked)}
        className={inputCheckboxStyles.label}
      >
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;
