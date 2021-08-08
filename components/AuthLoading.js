import PacmanLoader from "react-spinners/PacmanLoader";

const styles = {
  conatiner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
  },
};

const AuthLoading = () => {
  return (
    <div style={styles.conatiner}>
      <h2>Authenticating...</h2>
      <div>
        <PacmanLoader color="#0070f3" />
      </div>
    </div>
  );
};

export default AuthLoading;
