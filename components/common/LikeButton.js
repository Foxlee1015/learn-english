import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import { postUserLike } from "../../utils/apis";

const LikeButton = ({
  active,
  resources,
  _id,
  successCallback = () => {},
  failCallback = () => {},
}) => {
  const handleClick = () => {
    const resource_id =
      resources === "phrasal-verbs" ? "phrasal_verb_id" : "idiom_id";
    const likeItem = {
      resources,
      like: active ? 0 : 1,
      [resource_id]: _id,
    };

    postUserLike(
      likeItem,
      () => successCallback(),
      (err) => failCallback(err)
    );
  };

  return (
    <button onClick={() => handleClick()}>
      {active ? <LikeTwoTone /> : <LikeOutlined />}
    </button>
  );
};

export default LikeButton;
