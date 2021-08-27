import styled from "styled-components";

const Text = styled.button`
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

const Tag = ({ text }) => {
  return <Text>{text}</Text>;
};

export default Tag;
