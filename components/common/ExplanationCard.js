import styles from "../../styles/components/ExplanationCard.module.css";

const ExplanationCard = ({
  title = "",
  subTitle = "",
  definitions = [],
  sentences = [],
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.head}>{title}</h3>
      <h3 className={styles.head}>{subTitle}</h3>
      <p>Definition</p>

      {definitions && definitions.length > 0 &&
        definitions.map((definition) => <p key={definition}>{definition}</p>)}
      <p>Examples</p>
      {sentences && sentences.length > 0 &&
        sentences.map((sentence) => <p key={sentence}>{sentence}</p>)}
    </div>
  );
};

export default ExplanationCard;
