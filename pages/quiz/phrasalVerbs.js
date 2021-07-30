import { useCallback, useEffect, useState } from "react";
import Meta from "../../components/Meta";
import {
  randomProperty,
  replaceText,
  randomElement,
  randomArrayShuffle,
} from "../../utils/utils";

import styles from "../../styles/pages/Game.module.css";

import { server } from "../../config";
import { createQueryParams } from "../../utils/utils";

import * as Data from "../../data";

const particleResources = Data.particles;

const PhrasalVerbs = () => {
  const [verb, setVerb] = useState({});
  const [particle, setParticle] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [sentenses, setSentenses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextQuiz = () => {
    setClickedAnswers([]);
    setShowAnswer(false);
    setShowHint(false);
    getRandomVerb();
  };

  useEffect(() => {
    getRandomVerb();
  }, []);

  const getRandomVerb = async () => {
    const params = createQueryParams({ random_verb_count: 1 });
    const res = await fetch(`${server}/api/phrasal-verbs/?${params}`);
    const data = await res.json();
    setVerb({ ...data.result[0] });
  };

  useEffect(() => {
    if (Object.keys(verb).length !== 0) {
      const randomParticle = randomProperty(verb.particles);
      const { definitions, sentences } = verb.particles[randomParticle];
      const randomParticles = getRandomItems({
        src: particleResources,
        remove: randomParticle,
        itemCount: 3,
      });

      const shffledParticles = randomArrayShuffle(
        Array.from(randomParticles.add(randomParticle))
      );

      setParticle(randomParticle);
      setDefinitions(definitions);
      setSentenses(sentences);
      setAnswers([...shffledParticles]);
    }
  }, [verb]);

  const getRandomItems = ({ src, remove, itemCount }) => {
    const result = new Set();
    const removeIndex = src.indexOf(remove);
    if (removeIndex > -1) {
      src.splice(removeIndex, 1);
    }

    while (result.size < itemCount) {
      result.add(randomElement(src));
    }
    return result;
  };

  const checkAnswer = (clickedAnswer) => {
    if (clickedAnswer === particle) {
      setShowAnswer(true);
      setShowHint(true);
    } else {
      setClickedAnswers([...clickedAnswers, clickedAnswer]);
    }
  };

  return (
    <div>
      <Meta title="Phrasal Verb quiz" />
      <h5>Phrasal Verb quiz</h5>
      <div className={styles.header}>
        <h6></h6>
        <div className={styles.tagBox}>
          <button className={styles.tag} onClick={() => setShowHint(true)}>
            Hint
          </button>
          {showHint &&
            definitions.map((definition) => (
              <p key={definition}>{definition}</p>
            ))}
        </div>
      </div>
      <div>
        {sentenses.map((sentense) => (
          <p key={sentense}>
            {showAnswer ? sentense : replaceText(sentense, particle, "___")}
          </p>
        ))}
      </div>
      {showAnswer && (
        <div className={`${styles.btnContainer} ${styles.nextBtns}`}>
          <button className={styles.btn}>Before</button>
          <button className={styles.btn}>Next(Same verb)</button>
          <button className={styles.btn} onClick={() => nextQuiz()}>
            Next(Different verb)
          </button>
        </div>
      )}
      {!showAnswer && (
        <div className={styles.btnContainer}>
          {answers.map((answer) => (
            <button
              className={styles.btn}
              disabled={clickedAnswers.includes(answer)}
              key={answer}
              onClick={(e) => checkAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhrasalVerbs;
