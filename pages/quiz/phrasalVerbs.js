import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import {
  randomArrayShuffle,
  getRandomItems,
  createQueryParams,
} from "../../utils/utils";
import Modal from "../../components/common/Modal";
import PuffLoader from "react-spinners/PuffLoader";
import quizStyles from "../../styles/pages/Quiz.module.css";
import useFetch from "../../hooks/useFetch";
import DescCard from "../../components/common/DescCard";
import SentenceCard from "../../components/common/SentenceCard";
import AnswerButtons from "../../components/common/AnswerButtons";

const PhrasalVerbs = () => {
  const [fetchPhrasalVerb, doFetchPhrasalVerb] = useFetch([]);
  const [fetchParticles, doFetchParticles] = useFetch([]);
  const [phrasalVerb, setPhrasalVerb] = useState({});
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = createQueryParams({ only_particle: 1 });
    doFetchParticles(`phrasal-verbs/?${params}`);
  }, []);

  const getRandomVerb = async () => {
    const params = createQueryParams({ random_count: 1 });
    doFetchPhrasalVerb(`phrasal-verbs/?${params}`);
  };

  const nextQuiz = () => {
    getRandomVerb();
    setClickedAnswers([]);
    setShowModal(false);
  };

  useEffect(() => {
    if (fetchParticles.data.length > 0) {
      getRandomVerb();
    }
  }, [fetchParticles.data]);

  useEffect(() => {
    if (fetchPhrasalVerb.data.length > 0) {
      setPhrasalVerb(fetchPhrasalVerb.data[0]);
    }
  }, [fetchPhrasalVerb.data]);

  useEffect(() => {
    if (Object.keys(phrasalVerb).length > 0) {
      setQuiz();
    }
  }, [phrasalVerb]);

  const setQuiz = () => {
    const randomParticles = getRandomItems({
      src: fetchParticles.data,
      remove: phrasalVerb.particle,
      itemCount: 3,
    });
    const shffledParticles = randomArrayShuffle(
      Array.from(randomParticles.add(phrasalVerb.particle))
    );
    setAnswers([...shffledParticles]);
  };

  const checkAnswer = (clickedAnswer) => {
    if (clickedAnswer === phrasalVerb.particle) {
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
      {fetchPhrasalVerb.loading && <PuffLoader size={20} />}
      {Object.keys(phrasalVerb).length > 0 > 0 && (
        <>
          <DescCard data={phrasalVerb.definitions} title={"Definitions"} />
          <SentenceCard
            data={phrasalVerb.sentences}
            title={"Questions"}
            replaceToBlank={phrasalVerb.particle}
          />
          <AnswerButtons
            answers={answers}
            clickedAnswers={clickedAnswers}
            onClick={checkAnswer}
          />
        </>
      )}
      {showModal && (
        <Modal
          header={`${phrasalVerb.verb}-${phrasalVerb.particle}`}
          main={phrasalVerb.sentences.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
          buttons={[{ onClick: nextQuiz, text: "Next" }]}
          setShow={setShowModal}
        />
      )}
    </div>
  );
};

export default PhrasalVerbs;
