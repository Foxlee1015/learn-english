import quizStyle from "../../styles/pages/quiz/QuizHome.module.css";
import { useRouter } from "next/router";

const btnLinks = [
  { url: "/quiz/phrasalVerbs", text: "Phrasal Verbs" },
  { url: "/quiz/idioms", text: "Idioms" },
];

const Quiz = ({}) => {
  const router = useRouter();

  return (
    <div className={quizStyle.container}>
      {btnLinks.map((btnLink) => (
        <button
          type="button"
          onClick={() => router.push(btnLink.url)}
          className={quizStyle.linkBtn}
        >
          {btnLink.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
