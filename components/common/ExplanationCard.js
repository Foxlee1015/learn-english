import CardStyle from "../../styles/components/ExplanationCard.module.css";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { createQueryParams } from "../../utils/utils";
import { postUserLike } from "../../utils/apis";
import { server } from "../../config";
import PuffLoader from "react-spinners/PuffLoader";
import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import useNotification from "../../hooks/useNotification";

const setTitle = ({title, subTitle, upperCase=true}) => {
  const mainText = upperCase ? title.toUpperCase() : title;

  if (subTitle !=="") {
    const subText = upperCase ? subTitle.toUpperCase(): subTitle;
    return `${mainText} - ${subText}`
  }
  return mainText
}


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
  const notification = useNotification();
  const auth = useSelector((state) => state.auth);

  const updateLikes = () => {
    if (_id) {
      const params = createQueryParams({
        [resource_id]: _id,
      });
      doFetchLikes(`${server}/api/${resources}/likes?${params}`);
    }
  };

  const handleClick = () => {
    if (auth.loggedIn) {
      let like;
      let notiText;
      if (fetchLikes.data.active === 1) {
        like = 0;
        notiText = "Removed in likes";
      } else {
        like = 1;
        notiText = "Saved in likes";
      }
      const likeItem = {
        resources,
        like,
        [resource_id]: _id,
      };
      postUserLike(likeItem, () => {
        updateLikes();
        notification.setText(`${notiText} - ${setTitle({title,subTitle, upperCase:false})}`);
      });
    } else {
      notification.setText("Please log in first");
    }
    notification.setOpen(true);
  };

  useEffect(() => {
    updateLikes();
  }, [_id]);

  return (
    <div className={CardStyle.container}>
      <Notification {...notification} />
      <div className={CardStyle.head}>
        <h3 className={CardStyle.title}>
          {setTitle({title, subTitle})}
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
