import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  ${FlexCenterBox}
  flex-wrap: wrap;
`;

const Button = styled.button`
  height: 32px;
  padding: 0px 15px;
  margin: 8px;
  color: ${({ theme }) => theme.colors.common.balck};
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-shadow: 0 2px #00000004;
  white-space: nowrap;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  :hover {
    color: ${({ theme }) => theme.colors.common.white};
    background: ${({ theme }) => theme.colors.primary[500]};
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
  :disabled {
    cursor: not-allowed;
    color: #ff7875;
    background: ${({ theme }) => theme.colors.common.white};
    border-color: #ff7875;
    text-decoration: line-through;
  }
`;

const AnswerButtons = ({
  answers = [],
  clickedAnswers,
  onClick = () => {},
}) => {
  return (
    <Container>
      {answers.length > 0 &&
        answers.map((answer) => (
          <Button
            disabled={clickedAnswers.includes(answer)}
            key={answer}
            onClick={() => onClick(answer)}
          >
            {answer}
          </Button>
        ))}
    </Container>
  );
};

export default AnswerButtons;
