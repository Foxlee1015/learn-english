import styled from "styled-components";
import LikeButton from "../common/LikeButton";
import DescCard from "../common/DescCard";

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[50]};
  width: 200px;
  border-radius: 6px;
  padding: 10px;
  ${({ open }) =>
    open &&
    `
    min-height: 200px;
    grid-row-end: span 3;
  `};
`;

const Title = styled.p``;

const Button = styled.button``;

const DescBox = styled.div`
  margin-top: auto;
  min-height: 130px;
`;

const LikeCardBody = ({
  item,
  title,
  resources,
  showItems,
  setShowItems,
  refresh,
}) => {
  const handleClick = (_id) => {
    if (showItems.includes(_id)) {
      const newItems = showItems.filter((item) => item !== _id);
      setShowItems([...newItems]);
    } else {
      setShowItems([...showItems, _id]);
    }
  };

  return (
    <Container open={showItems.includes(item._id)} key={item._id}>
      <Title>{title}</Title>
      <Actions>
        <LikeButton
          active
          resources={resources}
          _id={item._id}
          successCallback={() => refresh()}
        />
        <Button
          onClick={() => {
            handleClick(item._id, showItems, setShowItems);
          }}
        >
          {showItems.includes(item._id) ? "hide" : "more"}
        </Button>
      </Actions>
      {showItems.includes(item._id) && (
        <DescBox>
          <DescCard data={item.definitions} title={"Definition"} />
          <DescCard data={item.sentences} title={"Examples"} />
        </DescBox>
      )}
    </Container>
  );
};

export default LikeCardBody;
