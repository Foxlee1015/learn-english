import styled from "styled-components";
import { LinkButton } from "../common";

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
`;

const Title = styled.h4``;

const LikeCardHead = ({ title = "", href = "" }) => {
  return (
    <Header>
      <Title>{title}</Title>
      <LinkButton text={`Check out all the ${title}`} href={href} />
    </Header>
  );
};
export default LikeCardHead;
