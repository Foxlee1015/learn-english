import styled from "styled-components";
import Tag from "./Tag";

const Text = styled.p`
  color: ${({ theme }) => theme.colors.common.dark};
`;

const DescCard = ({ data, title }) => {
  return (
    <>
      <Tag text={title} />
      {data && data.length > 0 ? (
        data.map((text) => <Text key={text}>{text}</Text>)
      ) : (
        <Text>No {title} yet...</Text>
      )}
    </>
  );
};

export default DescCard;
