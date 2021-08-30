import styled from "styled-components";
import Link from "next/link";
import { Footer } from "../../components";
import { FlexColumnBox, ContainerPadding } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexColumnBox}
  ${ContainerPadding}
  background: ${({ theme }) => theme.colors.grey[200]};
  width: 100%;
  min-height: 90vh;
`;

const Main = styled.main`
  ${FlexColumnBox}
  ${ContainerPadding}
  background: ${({ theme }) => theme.colors.grey[50]};
  width: 100%;
  flex: 1;
`;

const Children = styled.div`
  margin-bottom: 20px;
`;

const ErrorLayout = ({ children }) => {
  return (
    <>
      <Container>
        <Main>
          <Children>{children}</Children>
          <Link href={"/"}>Home</Link>
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default ErrorLayout;
