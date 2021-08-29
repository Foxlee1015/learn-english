import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const AdminContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AdminContainer;
