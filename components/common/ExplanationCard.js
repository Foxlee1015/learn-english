import CardStyle from "../../styles/components/ExplanationCard.module.css";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { createQueryParams } from "../../utils/utils";
import { postUserLike } from "../../utils/apis";
import { server } from "../../config";
import PuffLoader from "react-spinners/PuffLoader";
import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
const ExplanationCard = ({
  title = "",
  subTitle = "",
  definitions = [],
  sentences = [],
  _id,
  resources,
  resource_id,
}) => {
  const [fetchLikes, doFetchLikes] = useFetch({ count: 0, active: 0 });

  const updateLikes = () => {
    if (_id) {
      const params = createQueryParams({
        [resource_id]: _id,
      });
      doFetchLikes(`${server}/api/${resources}/likes?${params}`);
    }
  };

  const handleClick = () => {
    const likeItem = {
      resources,
      [resource_id]: _id,
      like: fetchLikes.data.active === 1 ? 0 : 1,
    };
    postUserLike(likeItem, updateLikes);
  };

  useEffect(() => {
    updateLikes();
  }, [_id]);

  return (
    <div className={CardStyle.container}>
      <div className={CardStyle.head}>
        <h3 className={CardStyle.title}>
          {title.toUpperCase()}
          {subTitle && ` - ${subTitle.toUpperCase()}`}
        </h3>
        <div className={CardStyle.likeBox}>
          {fetchLikes.loading ? (
            <PuffLoader size={20} />
          ) : (
            <>
              <button onClick={() => handleClick()}>
                {fetchLikes.data.active === 1 ? (
                  <LikeTwoTone />
                ) : (
                  <LikeOutlined />
                )}
              </button>
              <p className={CardStyle.count}>{fetchLikes.data.count}</p>
            </>
          )}
        </div>
      </div>

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
