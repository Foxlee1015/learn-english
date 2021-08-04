import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import {
  randomElement,
  randomArrayShuffle,
  getRandomItems,
} from "../../utils/utils";
import { server } from "../../config";
import { createQueryParams } from "../../utils/utils";
import Modal from "../../components/common/Modal";

import quizStyles from "../../styles/pages/Quiz.module.css";

const Idioms = () => {
  const [idiomData, setIdiomData] = useState([]);
  const [idiom, setIdiom] = useState({});
  const [definitions, setDefinitions] = useState([]);
  const [sentenses, setSentenses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRandomIdioms();
  }, []);

  const nextQuiz = () => {
    setClickedAnswers([]);
    setShowModal(false);
    getRandomIdioms();
  };

  useEffect(() => {
    if (idiomData.length !== 0) {
      setQuiz();
    }
  }, [idiomData]);

  const getRandomIdioms = async () => {
    try {
      const params = createQueryParams({ random_verb_count: 3 });
      const res = await fetch(`${server}/api/idioms/?${params}`);
      const data = await res.json();
      setIdiomData([...data.result]);
    } catch {
      setIdiomData([]);
    }
  };

  const setQuiz = () => {
    const randomIdiom = randomElement(idiomData);
    const { expression, definitions, sentences } = randomIdiom;
    const idiomExpressions = idiomData.map((idiom) => idiom.expression);
    const randomIdioms = getRandomItems({
      src: idiomExpressions,
      remove: expression,
      itemCount: 3,
    });

    const shffledIdioms = randomArrayShuffle(
      Array.from(randomIdioms.add(expression))
    );

    setIdiom(expression);
    setDefinitions(definitions);
    setSentenses(sentences);
    setAnswers([...shffledIdioms]);
  };

  const checkAnswer = (clickedAnswer) => {
    if (clickedAnswer === idiom) {
      setShowModal(true);
    } else {
      setClickedAnswers([...clickedAnswers, clickedAnswer]);
    }
  };

  return (
    <div>
      <Meta title="Idioms quiz" />
      <Header title="Idioms quiz" />
      <div className={quizStyles.header}>
        <h4>Question</h4>
      </div>
      <div>
        {definitions.map((definition) => (
          <p key={definition}>{definition}</p>
        ))}
      </div>
      <div className={quizStyles.btnContainer}>
        {answers.map((answer) => (
          <button
            className={quizStyles.btn}
            disabled={clickedAnswers.includes(answer)}
            key={answer}
            onClick={(e) => checkAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      {showModal && (
        <Modal
          header={idiom}
          main={sentenses.map((sentense) => (
            <p key={sentense}>{sentense}</p>
          ))}
          buttons={[{ onClick: nextQuiz, text: "Next" }]}
        />
      )}
    </div>
  );
};

export default Idioms;
