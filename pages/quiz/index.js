import quizHomeStyle from "../../styles/pages/quiz/QuizHome.module.css";
import { useRouter } from "next/router";

const btnLinks = [
  { url: "/quiz/phrasalVerbs", text: "Phrasal Verbs" },
  { url: "/quiz/idioms", text: "Idioms" },
];

const Quiz = ({}) => {
  const router = useRouter();

  return (
    <div className={quizHomeStyle.container}>
      {btnLinks.map((btnLink) => (
        <button
          key={btnLink.url}
          type="button"
          onClick={() => router.push(btnLink.url)}
          className={quizHomeStyle.linkBtn}
        >
          {btnLink.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
