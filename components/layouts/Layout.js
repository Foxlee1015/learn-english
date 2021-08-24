import styled from "styled-components";
import { Nav } from "../navs";
import { Meta, Footer } from "../../components";
import { FlexColumnBox, ContainerPadding } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexColumnBox}
  ${ContainerPadding}
  background: ${({ theme }) => theme.colors.common.grey};
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  ${FlexColumnBox}
  ${ContainerPadding}
  background: ${({ theme }) => theme.colors.common.greyLight};
  width: 100%;
  flex: 1;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <Container>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
