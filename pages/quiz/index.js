import Link from "next/link";
import quizStyle from "../../styles/pages/quiz/QuizHome.module.css";

const Quiz = ({}) => {
  return (
    <div className={quizStyle.container}>
      <div className={quizStyle.linkBtn}>
        <Link href="/quiz/phrasalVerbs">Phrasal Verbs</Link>
      </div>
      <div className={quizStyle.linkBtn}>
        <Link href="/quiz/idioms">Idioms</Link>
      </div>
    </div>
  );
};

export default Quiz;
