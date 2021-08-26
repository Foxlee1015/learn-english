import styled from "styled-components";

const Tag = styled.button`
  width: 90px;
  height: 20px;
  margin-bottom: 6px;
  text-align: center;
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
  padding: 0px 7px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.common.dark};
`;

const DescCard = ({ data, title }) => {
  return (
    <>
      <Tag>{title}</Tag>
      {data.length > 0 ? (
        data.map((text) => <Text key={text}>{text}</Text>)
      ) : (
        <Text>No {title} yet...</Text>
      )}
    </>
  );
};

export default DescCard;
