import Link from "next/link";
import footerStyles from "../styles/components/Footer.module.css";

const Footer = () => {
  return (
    <div className={footerStyles.container}>
      <div>
        {`©${new Date().getFullYear()} Copyright : `}
        <Link href={"/home"}>{process.env.APP_URL}</Link>
      </div>
    </div>
  );
};

export default Footer;
