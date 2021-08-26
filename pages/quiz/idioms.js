import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import {
  randomElement,
  randomArrayShuffle,
  getRandomItems,
} from "../../utils/utils";
import { createQueryParams } from "../../utils/utils";
import Modal from "../../components/common/Modal";
import DescCard from "../../components/common/DescCard";

import quizStyles from "../../styles/pages/Quiz.module.css";
import useFetch from "../../hooks/useFetch";
import AnswerButtons from "../../components/common/AnswerButtons";

const Idioms = () => {
  const [fetchRandomIdiom, doFetchRandomIdioms] = useFetch([]);
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
    if (fetchRandomIdiom.data.length !== 0) {
      setQuiz();
    }
  }, [fetchRandomIdiom.data]);

  const getRandomIdioms = async () => {
    const params = createQueryParams({ random_count: 3 });
    doFetchRandomIdioms(`idioms/?${params}`);
  };

  const setQuiz = () => {
    const randomIdiom = randomElement(fetchRandomIdiom.data);
    const { expression, definitions, sentences } = randomIdiom;
    const idiomExpressions = fetchRandomIdiom.data.map(
      (idiom) => idiom.expression
    );
    const randomIdioms = getRandomItems({
      src: idiomExpressions,
      remove: expression,
      itemCount: 2,
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
        <h4>Pick an idiom meaning:</h4>
      </div>
      <DescCard data={definitions} title={"Definition"} />
      <AnswerButtons
        answers={answers}
        clickedAnswers={clickedAnswers}
        onClick={checkAnswer}
      />
      {showModal && (
        <Modal
          header={idiom}
          main={sentenses.map((sentense) => (
            <p key={sentense}>{sentense}</p>
          ))}
          buttons={[{ onClick: nextQuiz, text: "Next" }]}
          setShow={setShowModal}
        />
      )}
    </div>
  );
};

export default Idioms;
