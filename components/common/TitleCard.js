import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
`;

const Text = styled.h6`
  color: ${({ theme }) => theme.colors.common.dark};
`;

const TitleCard = ({ title }) => {
  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
};

export default TitleCard;
