import quizStyles from "../../styles/pages/Quiz.module.css";

const AnswerButtons = ({
  answers = [],
  clickedAnswers,
  onClick = () => {},
}) => {
  return (
    <div className={quizStyles.btnContainer}>
      {answers.length > 0 &&
        answers.map((answer) => (
          <button
            className={quizStyles.btn}
            disabled={clickedAnswers.includes(answer)}
            key={answer}
            onClick={() => onClick(answer)}
          >
            {answer}
          </button>
        ))}
    </div>
  );
};

export default AnswerButtons;
