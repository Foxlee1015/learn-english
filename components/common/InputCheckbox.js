const InputCheckbox = ({
  label = "",
  checked = false,
  onChange = () => {},
}) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      ></input>
      <label onClick={() => onChange(!checked)}>{label}</label>
    </div>
  );
};

export default InputCheckbox;
