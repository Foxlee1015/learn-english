import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import {
  replaceText,
  randomArrayShuffle,
  getRandomItems,
  createQueryParams,
} from "../../utils/utils";
import Modal from "../../components/common/Modal";
import PuffLoader from "react-spinners/PuffLoader";
import quizStyles from "../../styles/pages/Quiz.module.css";
import useFetch from "../../hooks/useFetch";

import * as Data from "../../data";

const particleResources = Data.particles;

const PhrasalVerbs = () => {
  const [fetchPhrasalVerb, doFetchPhrasalVerb] = useFetch([]);
  const [verbData, setVerbData] = useState({});
  const [particle, setParticle] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [sentenses, setSentenses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRandomVerb();
  }, []);

  useEffect(() => {
    if (Object.keys(verbData).length !== 0) {
      setQuiz();
    } else {
      getRandomVerb();
    }
  }, [verbData]);

  const nextQuiz = () => {
    setClickedAnswers([]);
    setShowModal(false);
    getRandomVerb();
  };

  useEffect(() => {
    if (fetchPhrasalVerb.data.length > 0) {
      setVerbData({ ...fetchPhrasalVerb.data[0] });
    } else {
      setVerbData({});
    }
  }, [fetchPhrasalVerb.data]);

  const getRandomVerb = async () => {
    const params = createQueryParams({ random_verb_count: 1 });
    doFetchPhrasalVerb(`phrasal-verbs/?${params}`);
  };

  const setQuiz = () => {
    const randomParticles = getRandomItems({
      src: particleResources,
      remove: verbData.particle,
      itemCount: 3,
    });

    const shffledParticles = randomArrayShuffle(
      Array.from(randomParticles.add(verbData.particle))
    );

    setParticle(verbData.particle);
    setDefinitions([...verbData.definitions]);
    setSentenses([...verbData.sentences]);
    setAnswers([...shffledParticles]);
  };

  const checkAnswer = (clickedAnswer) => {
    if (clickedAnswer === particle) {
      setShowModal(true);
    } else {
      setClickedAnswers([...clickedAnswers, clickedAnswer]);
    }
  };

  return (
    <div>
      <Meta title="Phrasal Verb quiz" />
      <Header title="Phrasal Verb quiz" />
      <div className={quizStyles.header}>
        <h4>Pick a preposition or adverb for the blank</h4>
      </div>
      {fetchPhrasalVerb.loading ? (
        <PuffLoader size={20} />
      ) : (
        <>
          <div className={quizStyles.tagBox}>
            {definitions.map((definition) => (
              <p key={definition}>{definition}</p>
            ))}
          </div>
          <div>
            {sentenses.map((sentense) => (
              <p key={sentense}>{replaceText(sentense, particle, "___")}</p>
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
        </>
      )}
      {showModal && (
        <Modal
          header={`${verbData.verb}-${particle}`}
          main={sentenses.map((sentense) => (
            <p key={sentense}>{sentense}</p>
          ))}
          buttons={[{ onClick: nextQuiz, text: "Next" }]}
        />
      )}
    </div>
  );
};

export default PhrasalVerbs;
