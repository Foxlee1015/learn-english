import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";

import { postUserLike } from "../../utils/apis";

const LikeButton = ({active, resources, resource_id, _id, callback=()=>{}}) => {
  const handleClick = () => {
      const likeItem = {
        resources,
        like: active? 0 : 1,
        [resource_id]: _id,
      };
      postUserLike(likeItem, () => {
        callback()
        });
  };
  
  return (
    <button onClick={() => handleClick()}>
        {active ? (
            <LikeTwoTone />
        ) : (
            <LikeOutlined />
        )}
        </button>
  );
};

export default LikeButton;
