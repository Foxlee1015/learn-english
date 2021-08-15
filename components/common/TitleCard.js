const style = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flexStart",
  },
  title: {
    color: "#000000d9",
    fontWeight: 700,
    fontSize: 20,
  },
};

const TitleCard = ({ title }) => {
  return (
    <div style={style.container}>
      <h3 style={style.title}>{title}</h3>
    </div>
  );
};

export default TitleCard;
