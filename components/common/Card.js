import styles from "../../styles/Card.module.css";

const Card = ({ verb, particle, definition, sentenses = [] }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.head}>{verb}</h3>
      <h3 className={styles.head}>{particle}</h3>
      <h3>Definition : {definition}</h3>
      <p>Examples</p>
      {sentenses.length > 0 &&
        sentenses.map((sentense) => <p key={sentense}>{sentense}</p>)}
    </div>
  );
};

export default Card;
