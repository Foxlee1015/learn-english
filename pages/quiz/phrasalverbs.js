import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import {
  randomArrayShuffle,
  getRandomItems,
  createQueryParams,
} from "../../utils/utils";
import {
  Modal,
  DescCard,
  SentenceCard,
  AnswerButtons,
} from "../../components/common";
import PuffLoader from "react-spinners/PuffLoader";
import { useFetch } from "../../hooks";
import styled from "styled-components";

const Title = styled.h6``;
const Quiz = styled.div`
  align-self: start;
`;

const PhrasalVerbs = () => {
  const [fetchPhrasalVerb, doFetchPhrasalVerb] = useFetch([]);
  const [fetchParticles, doFetchParticles] = useFetch([]);
  const [phrasalVerb, setPhrasalVerb] = useState({});
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    doFetchParticles(`particles/`);
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
      <Quiz>
        <Title>Pick a preposition or adverb for the blank</Title>
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
      </Quiz>
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
