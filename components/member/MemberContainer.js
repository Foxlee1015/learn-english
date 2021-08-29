import styled from "styled-components";

const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h4``;

const MemberContainer = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default MemberContainer;
