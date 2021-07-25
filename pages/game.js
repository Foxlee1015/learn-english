import { useCallback, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { randomProperty, replaceText } from "../utils/utils";

import styles from "../styles/Game.module.css";

import * as Data from "../data";

const verbResources = Data.verbs;

const Game = () => {
  const [verb, setVerb] = useState("");
  const [particle, setParticle] = useState("");
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [sentenses, setSentenses] = useState([]);

  const resetProblem = () => {
    setShowHint(false);
  };

  const genProblem = useCallback(() => {
    resetProblem();

    // dont repeat past problems

    const randomVerb = randomProperty(verbResources);
    const randomParticle = randomProperty(verbResources[randomVerb]);
    const [definition, examples] = verbResources[randomVerb][randomParticle];

    setVerb(randomVerb);
    setParticle(randomParticle);
    setHint(definition);
    setSentenses(examples);
  }, []);

  useEffect(() => {
    genProblem();
  }, [genProblem]);

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
          <p key={sentense}>{replaceText(sentense, particle, "___")}</p>
        ))}
      </div>
      <div>
        <button>Before</button>
        <button>Next(Same verb)</button>
        <button onClick={() => genProblem()}>Next(Different verb)</button>
      </div>
    </div>
  );
};

export default Game;
