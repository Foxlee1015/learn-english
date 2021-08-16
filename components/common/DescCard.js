const style = {
  tag: {
    width: 80,
    textAlign: "center",
    color: "#c41d7f",
    background: "#fff0f6",
    borderColor: "#ffadd2",
    marginBottom: 10,
    boxSizing: "border-box",
    padding: "0px 7px",
    fontSize: 12,
    border: "1px solid #d9d9d9",
    borderRadius: 2,
  },
  text: {
    color: "#000000d9",
    fontWeight: 500,
    fontSize: 12,
    paddingLeft: 10,
  },
};

const DescCard = ({ data, title }) => {
  return (
    <>
      <p style={style.tag}>{title}</p>
      {data.length > 0 ? (
        data.map((text) => (
          <p style={style.text} key={text}>
            {text}
          </p>
        ))
      ) : (
        <p style={style.text}>No {title} yet...</p>
      )}
    </>
  );
};

export default DescCard;
