import styled from "styled-components";
import Link from "next/link";
import MailtoButton from "./common/MailtoButton";

const Container = styled.div`
  height: 80px;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.05);
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <Container>
      <MailtoButton
        label="Write me an Email If you have any questions"
        mailto="mailto:daehanlee.dev@gmail.com"
      />
      <div>
        {`©${new Date().getFullYear()} Copyright : `}
        <Link href={"/home"}>{process.env.APP_URL}</Link>
      </div>
    </Container>
  );
};

export default Footer;
