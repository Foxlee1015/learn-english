const style = {
  margin: "0px 10px",
  color: "#ff7875",
  fontSize: 10,
  wordWrap: "break-word",
  alignSelf: "flex-start",
};

const ErrorMessage = ({ errors }) => {
  return (
    <>
      {errors.map((err) => (
        <p style={style} key={err}>
          {err}
        </p>
      ))}
    </>
  );
};

export default ErrorMessage;
