import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AdminContentListContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default AdminContentListContainer;
