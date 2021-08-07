import CardStyle from "../../styles/components/ExplanationCard.module.css";
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import {createQueryParams} from "../../utils/utils"
import { server } from "../../config";

const ExplanationCard = ({
  title = "",
  subTitle = "",
  definitions = [],
  sentences = [],
  _id,
  resources,
  resource_id
}) => {
  const [fetchLikes, doFetchLikes] = useFetch(0);
  
  useEffect(()=>{
    if (_id) {
      const params = createQueryParams({
        [resource_id] : _id,
      });
      doFetchLikes(`${server}/api/${resources}/likes?${params}`)
    }
  },[_id])

  return (
    <div className={CardStyle.container}>
      <h3 className={CardStyle.head}>{title.toUpperCase()}</h3>
      <h3 className={CardStyle.headSub}>{subTitle}</h3>
      <p>{fetchLikes.loading? fetchLikes.loading : fetchLikes.data}</p>
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
