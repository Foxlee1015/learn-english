import Link from "next/link";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
`;

const Text = styled.h6`
  color: ${({ theme }) => theme.colors.common.dark};
  margin-bottom: 10px;
`;
const TitleCard = ({ title, link }) => {
  return (
    <Container>
      <Text>
        <Link href={link}>{title}</Link></Text>
    </Container>
  );
};

export default TitleCard;
