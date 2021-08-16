const style = {
  label: {
    margin: "0px 10px",
    fontSize: 12,
    alignSelf: "flex-start",
  },
  input: {
    boxSizing: "border-box",
    margin: "5px 0px",
    position: "relative",
    display: "inline-block",
    width: "100%",
    height: 40,
    marginBottom: 10,
    minWidth: 0,
    padding: "4px 11px",
    color: "#000000d9",
    fontSize: 14,
    backgroundColor: "#fff",
    backgroundImage: "none",
    border: "1px solid #d9d9d9",
    borderRadius: 2,
    transition: "all 0.3s",
  },
};

const Input = ({
  label = "",
  inputAttrs,
  onBlur = () => {},
  onKeyDown = () => {},
}) => {
  return (
    <>
      <span style={style.label}>{label}</span>
      <input
        {...inputAttrs}
        style={style.input}
        onBlur={() => onBlur()}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </>
  );
};

export default Input;
