import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
  margin-bottom: 20px;
  ${(props) => props.theme.media.tablet` 
  margin-bottom: 15px;
  `}
  ${(props) => props.theme.media.phone`
  margin-bottom: 10px;
  `}
`;

const Text = styled.h3`
  color: ${({ theme }) => theme.colors.common.dark};
  font-weight: 700;
  font-size: 20px;
  ${(props) => props.theme.media.tablet`  
    font-size: 15px;
  `}
  ${(props) => props.theme.media.phone`
    font-size: 13px;
  `}
`;

const TitleCard = ({ title }) => {
  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
};

export default TitleCard;
