import Link from "next/link";
import styles from "../../styles/components/LinkCard.module.css";

const LinkCard = ({ title = "", desc = "", href = "" }) => {
  return (
    <div className={styles.container}>
      <h2>
        <Link href={href}>{title}</Link>
      </h2>
      <h2>{desc}</h2>
      <h2>{title}</h2>
    </div>
  );
};

export default LinkCard;
