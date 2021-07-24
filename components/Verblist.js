import { verbs, particles } from "../data";
import { useState, useEffect } from "react";

const VerbList = () => {
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [selectedParticle, setSelectedParticle] = useState(null);

  useEffect(() => {
    if (selectedVerb) {
      const initParticle = randomParticle(verbs[selectedVerb]);
      setSelectedParticle(initParticle);
    }
  }, [selectedVerb]);

  return (
    <div>
      {Object.keys(verbs).map((verb) => (
        <h5
          key={verb}
          onClick={() => {
            setSelectedVerb(verb);
          }}
        >
          {verb}
        </h5>
      ))}
      {particles.map((particle) => (
        <h5
          key={particle}
          onClick={() => {
            setSelectedParticle(particle);
          }}
        >
          {particle}
          {Object.keys(verbs[selectedVerb]).includes(particle) || "-x"}
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
  const keys = Object.keys(obj);
  const res = keys[(keys.length * Math.random()) << 0];
  return res;
};
