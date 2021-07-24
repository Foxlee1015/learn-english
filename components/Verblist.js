import { verbs, particles } from "../data";
import { useState, useEffect } from "react";

const VerbList = () => {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedParticle, setSelectedParticle] = useState("");

  useEffect(() => {
    if (selectedVerb) {
      const initParticle = randomParticle(verbs[selectedVerb]);
      setSelectedParticle(initParticle);
    }
  }, [selectedVerb]);

  return (
    <div>
      {verbs &&
        Object.keys(verbs).map((verb) => (
          <h5
            key={verb}
            onClick={() => {
              setSelectedVerb(verb);
            }}
          >
            {verb}
          </h5>
        ))}
      {particles &&
        particles.map((particle) => (
          <h5
            key={particle}
            onClick={() => {
              setSelectedParticle(particle);
            }}
          >
            {particle}
            {(verbs &&
              Object.keys(verbs).lenght > 0 &&
              Object.keys(verbs[selectedVerb]).includes(particle)) ||
              "-x"}
          </h5>
        ))}
      {/* {Object.keys(verbs).map((verb) => (
        <VerbItem verb={verb} particles={verbs[verb]} />
      ))} */}
      {selectedVerb}-{selectedParticle}
    </div>
  );
};

export default VerbList;

const randomParticle = function (obj) {
  if (obj && Object.keys(obj).lenght > 0) {
    const keys = Object.keys(obj);
    return keys[(keys.length * Math.random()) << 0];
  }
  return "";
};
