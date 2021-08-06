import CardStyle from "../../styles/components/ExplanationCard.module.css";

const ExplanationCard = ({
  title = "",
  subTitle = "",
  definitions = [],
  sentences = [],
  count = 0,
}) => {
  return (
    <div className={CardStyle.container}>
      <h3 className={CardStyle.head}>{title.toUpperCase()}</h3>
      <h3 className={CardStyle.headSub}>{subTitle}</h3>
      <p>{count}</p>
      {definitions.length > 0 && (
        <>
          <p className={CardStyle.tag}>Definition</p>
          {definitions.map((definition) => (
            <p className={CardStyle.text} key={definition}>
              {definition}
            </p>
          ))}
        </>
      )}
      {sentences.length > 0 && (
        <>
          <p className={CardStyle.tag}>Examples</p>
          {sentences.map((sentence) => (
            <p className={CardStyle.text} key={sentence}>
              {sentence}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default ExplanationCard;
