import styled from "styled-components";
import { LinkButton } from "../common";
import { Container as NavContainer } from "./Nav";

const Container = styled(NavContainer)``;

const AccountNav = () => {
  return (
    <Container>
      <LinkButton href={"/"} text={"Home"} />
    </Container>
  );
};
export default AccountNav;
