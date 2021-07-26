import { useCallback, useEffect, useState } from "react";
import Meta from "../components/Meta";
import {
  randomProperty,
  replaceText,
  randomElement,
  randomArrayShuffle,
} from "../utils/utils";

import styles from "../styles/Game.module.css";

import * as Data from "../data";

const verbResources = Data.verbs;
const particleResources = Data.particles;

const Game = () => {
  const [verb, setVerb] = useState("");
  const [particle, setParticle] = useState("");
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [sentenses, setSentenses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const resetProblem = () => {
    setClickedAnswers([]);
    setShowAnswer(false);
    setShowHint(false);
  };

  const genProblem = () => {
    resetProblem();

    // dont repeat past problems
    const randomVerb = randomProperty(verbResources);
    const randomParticle = randomProperty(verbResources[randomVerb]);
    const [definition, examples] = verbResources[randomVerb][randomParticle];
    const randomParticles = getRandomItems({
      src: particleResources,
      remove: randomParticle,
      itemCount: 3,
    }); // return Set

    const shffledParticles = randomArrayShuffle(
      Array.from(randomParticles.add(randomParticle))
    ); // create array from set

    setVerb(randomVerb);
    setParticle(randomParticle);
    setHint(definition);
    setSentenses(examples);
    setAnswers([...shffledParticles]);
  };

  useEffect(() => {
    genProblem();
  }, []);

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
      <Meta title="Phrasal Verb game" />
      <h5>Phrasal Verb game</h5>
      <div className={styles.header}>
        <h6>{verb}</h6>
        <div className={styles.tagBox}>
          <button className={styles.tag} onClick={() => setShowHint(true)}>
            Hint
          </button>
          {showHint ? <p>{hint}</p> : ""}
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
          <button className={styles.btn} onClick={() => genProblem()}>
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

export default Game;
