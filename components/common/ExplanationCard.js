import styled from "styled-components";
import { useFetch, useNotification } from "../../hooks";
import { useEffect } from "react";
import { createQueryParams } from "../../utils/utils";
import PuffLoader from "react-spinners/PuffLoader";
import { LikeButton, Notification, DescCard, TitleCard } from "../common";
import { FlexCenterBox } from "../../styles/common-styles";

const setTitle = (title) => {
  return title ? title.toUpperCase() : ""
};

const Container = styled.div`
  color: #000000d9;
  position: relative;
  border-radius: 2px;
  margin: 10px;
`;
const InfoBox = styled.div`
  ${FlexCenterBox}
  justify-content: left;
  margin-bottom: 8px;
`;
const Text = styled.span`
  padding: 0;
  margin: 0;
`;

const ExplanationCard = ({
  phrasal_verb,
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
      {phrasal_verb && (
        <TitleCard title={setTitle(phrasal_verb)} link={`phrasalverbs/${phrasal_verb.replace(" ", "-")}`} />
      )}
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
