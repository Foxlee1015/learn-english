import PacmanLoader from "react-spinners/PacmanLoader";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

const AuthLoading = () => {
  return (
    <Container>
      <h2>Authenticating...</h2>
      <PacmanLoader color="#0070f3" />
    </Container>
  );
};

export default AuthLoading;
