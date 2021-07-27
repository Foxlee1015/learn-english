import styles from "../../styles/components/ExplanationCard.module.css";

const ExplanationCard = ({
  title = "",
  subTitle = "",
  definitions = [],
  sentenses = [],
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.head}>{title}</h3>
      <h3 className={styles.head}>{subTitle}</h3>
      <p>Definition</p>

      {definitions.length > 0 &&
        definitions.map((definition) => <p key={definition}>{definition}</p>)}
      <p>Examples</p>
      {sentenses.length > 0 &&
        sentenses.map((sentense) => <p key={sentense}>{sentense}</p>)}
    </div>
  );
};

export default ExplanationCard;
