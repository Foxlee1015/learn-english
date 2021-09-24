import styled from "styled-components";

const Text = styled.span`
  color: #ff7875;
  word-wrap: break-word,
  align-self: flex-start,
`;

const ErrorMessage = ({ errors }) => {
  return (
    <>
      {errors.map((err) => (
        <Text key={err}>{err}</Text>
      ))}
    </>
  );
};

export default ErrorMessage;
