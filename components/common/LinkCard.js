import Link from "next/link";
import linkCardstyles from "../../styles/components/LinkCard.module.css";

const LinkCard = ({ title = "", desc = "", href = "", disabled = false }) => {
  return (
    <>
      {disabled ? (
        <div
          className={`${linkCardstyles.container} ${linkCardstyles.disabledContainer} `}
        >
          <h2 className={linkCardstyles.title}>{title}</h2>
          <p className={linkCardstyles.text}>{desc}</p>

          <button disabled className={linkCardstyles.linkBtn}>
            Coming soon...
          </button>
        </div>
      ) : (
        <div className={linkCardstyles.container}>
          <h2 className={linkCardstyles.title}>
            <Link href={href}>{title}</Link>
          </h2>
          <p className={linkCardstyles.text}>{desc}</p>

          <button className={linkCardstyles.linkBtn}>
            <Link className={linkCardstyles.link} href={href}>
              LEARN MORE
            </Link>
          </button>
        </div>
      )}
    </>
  );
};

export default LinkCard;
