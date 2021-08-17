import Link from "next/link";
import linkCardstyles from "../../styles/components/LinkCard.module.css";
import { useSelector } from "react-redux";

const LinkCard = ({
  title = "",
  desc = "",
  href = "",
  actionText = "LEARN MORE",
  Component = null,
  authRequired = false,
}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {authRequired && !auth.loggedIn ? (
        <></>
      ) : (
        <div className={linkCardstyles.container}>
          <h2 className={linkCardstyles.title}>
            <Link href={href}>{title}</Link>
          </h2>
          <p className={linkCardstyles.text}>{desc}</p>
          {Component && <Component />}

          <button className={linkCardstyles.linkBtn}>
            <Link className={linkCardstyles.link} href={href}>
              {actionText}
            </Link>
          </button>
        </div>
      )}
    </>
  );
};

export default LinkCard;
