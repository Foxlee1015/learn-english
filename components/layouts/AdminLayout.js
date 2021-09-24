import styled from "styled-components";
import { AdminNav } from "../navs";
import { Footer } from "../../components";
import { FlexColumnBox, ContainerPadding } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexColumnBox}
  ${ContainerPadding}
  background: ${({ theme }) => theme.colors.grey[200]};
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  ${FlexColumnBox}
  ${ContainerPadding}
  background: ${({ theme }) => theme.colors.grey[50]};
  width: 100%;
  flex: 1;
`;

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNav />
      <Container>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
};

export default AdminLayout;
