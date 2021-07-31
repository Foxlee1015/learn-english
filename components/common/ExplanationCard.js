import CardStyle from "../../styles/components/ExplanationCard.module.css";

const ExplanationCard = ({
  title = "",
  subTitle = "",
  definitions = [],
  sentences = [],
}) => {
  return (
    <div className={CardStyle.container}>
      <h3 className={CardStyle.head}>{title.toUpperCase()}</h3>
      <h3 className={CardStyle.headSub}>{subTitle}</h3>
      <p className={CardStyle.tag}>Definition</p>

      {definitions && definitions.length > 0 &&
        definitions.map((definition) => <p className={CardStyle.text} key={definition}>{definition}</p>)}
      <p className={CardStyle.tag}>Examples</p>
      {sentences && sentences.length > 0 &&
        sentences.map((sentence) => <p className={CardStyle.text} key={sentence}>{sentence}</p>)}
    </div>
  );
};

export default ExplanationCard;
