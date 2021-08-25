import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { createQueryParams } from "../../utils/utils";
import PuffLoader from "react-spinners/PuffLoader";
import LikeButton from "./LikeButton";
import Notification from "./Notification";
import useNotification from "../../hooks/useNotification";
import DescCard from "./DescCard";
import TitleCard from "./TitleCard";
import { FlexCenterBox } from "../../styles/common-styles";

const setTitle = ({ title, subTitle, upperCase = true }) => {
  const mainText = upperCase ? title.toUpperCase() : title;

  if (subTitle !== "") {
    const subText = upperCase ? subTitle.toUpperCase() : subTitle;
    return `${mainText}-${subText}`;
  }
  return mainText;
};

const Container = styled.div`
  color: #000000d9;
  font-size: 14px;
  position: relative;
  border-radius: 2px;
  padding: 10px;
  margin: 10px;
`;
const InfoBox = styled.div`
  ${FlexCenterBox}
  justify-content: left;
  margin-bottom: 20px;
`;
const Text = styled.span`
  margin: 0px 6px;
  padding: 0;
`;

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
  const updateLikes = () => {
    if (_id) {
      const params = createQueryParams({
        [resource_id]: _id,
      });
      doFetchLikes(`${resources}/likes?${params}`);
    }
  };

  useEffect(() => {
    updateLikes();
  }, [_id]);

  const showErrNotification = (msg) => {
    notification.setText(msg);
    notification.setOpen(true);
  };

  const showLikeResultNotification = () => {
    let notiText;
    if (fetchLikes.data.active === 1) {
      notiText = "Removed in likes";
    } else {
      notiText = "Saved in likes";
    }
    notiText = `${notiText} - ${setTitle({
      title,
      subTitle,
      upperCase: false,
    })}`;
    notification.setText(notiText);
    notification.setOpen(true);
  };

  return (
    <Container>
      <Notification {...notification} />
      <TitleCard title={setTitle({ title, subTitle })} />
      <InfoBox>
        {fetchLikes.loading ? (
          <PuffLoader size={20} />
        ) : (
          <>
            <LikeButton
              active={fetchLikes.data.active === 1}
              resources={resources}
              _id={_id}
              successCallback={() => {
                showLikeResultNotification();
                updateLikes();
              }}
              failCallback={showErrNotification}
            />
            <Text>{fetchLikes.data.count}</Text>
          </>
        )}
      </InfoBox>
      <DescCard data={definitions} title={"Definition"} />
      <DescCard data={sentences} title={"Examples"} />
    </Container>
  );
};

export default ExplanationCard;
