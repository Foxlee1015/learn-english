import { verbs, particles } from "../data";
import { useState, useEffect } from "react";

const VerbList = () => {
  const [verbList, setVerbList] = useState([]);
  const [phrasalVerbs, setPhrasalVerbs] = useState([]);
  const [particleList, setParticleList] = useState([]);
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedParticle, setSelectedParticle] = useState("");

  useEffect(() => {
    setVerbList(Object.keys(verbs));
    setPhrasalVerbs({ ...verbs });
    setParticleList([...particles]);
  }, []);

  return (
    <div>
      {verbList.length > 0 &&
        verbList.map((verb) => (
          <h5
            key={verb}
            onClick={() => {
              setSelectedVerb(verb);
            }}
          >
            {verb}
          </h5>
        ))}
      {particleList.length > 0 &&
        particleList.map((particle) => {
          if (
            phrasalVerbs &&
            phrasalVerbs[selectedVerb] &&
            !phrasalVerbs[selectedVerb][particle]
          ) {
            return <h5>{particle}</h5>;
          } else {
            return (
              <h5
                key={particle}
                onClick={() => {
                  setSelectedParticle(particle);
                }}
              >
                {particle}
              </h5>
            );
          }
        })}
      {selectedVerb &&
        selectedParticle &&
        `${selectedVerb} - ${selectedParticle}`}
    </div>
  );
};

export default VerbList;
