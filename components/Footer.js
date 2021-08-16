import Link from "next/link";
import footerStyles from "../styles/components/Footer.module.css";
import MailtoButton from "./common/MailtoButton";

const Footer = () => {
  return (
    <div className={footerStyles.container}>
      <MailtoButton
        label="Write me an Email If you have any questions"
        mailto="mailto:daehanlee.dev@gmail.com"
      />
      <div>
        {`©${new Date().getFullYear()} Copyright : `}
        <Link href={"/home"}>{process.env.APP_URL}</Link>
      </div>
    </div>
  );
};

export default Footer;
