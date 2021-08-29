import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import { postUserLike } from "../../utils/apis";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Button = styled.button`
  ${FlexCenterBox}
  margin-right: 8px;
`;

const style = {
  marginBottom: 0,
};

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
    <Button onClick={() => handleClick()}>
      {active ? <LikeTwoTone style={style} /> : <LikeOutlined style={style} />}
    </Button>
  );
};

export default LikeButton;
