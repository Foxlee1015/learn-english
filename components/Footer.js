import styled from "styled-components";
import Link from "next/link";
import MailtoButton from "./common/MailtoButton";
import { FlexCenterBox } from "../styles/common-styles";

const Container = styled.div`
  ${FlexCenterBox}
  flex-direction: column;
  height: 80px;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.05);
  color: #000;
`;

const Footer = () => {
  return (
    <Container>
      <MailtoButton
        label="Write me an Email If you have any questions"
        mailto={`mailto:${process.env.EMAIL_ADDRESS}`}
      />
      <div>
        {`©${new Date().getFullYear()} Copyright : `}
        <Link href={"/home"}>{process.env.APP_URL}</Link>
      </div>
    </Container>
  );
};

export default Footer;
