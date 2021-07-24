import { useState, useEffect } from "react";
import SelectItem from "./common/SelectItem";
import styles from "../styles/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

import * as Data from "../data";

const VerbList = () => {
  const verbs = useSelectItem(Object.keys(Data.verbs));
  const particles = useSelectItem([...Data.particles]);
  //   const [verbList, setVerbList] = useState([]);
  //   const [particleList, setParticleList] = useState([]);
  const [disableVerbList, setDisableVerbList] = useState([]);
  const [disableParticleList, setDisableParticleList] = useState([]);
  //   const [selectedVerb, setSelectedVerb] = useState("");
  //   const [selectedParticle, setSelectedParticle] = useState("");

  //   useEffect(() => {
  //     setVerbList(Object.keys(Data.verbs));
  //     setParticleList([...Data.particles]);
  //   }, []);

  useEffect(() => {
    if (verbs.selectedItem) {
      const curVerbParticles = Object.keys(Data.verbs[verbs.selectedItem]);
      const disableParticles = particles.items.filter(
        (particle) => !curVerbParticles.includes(particle)
      );
      setDisableParticleList([...disableParticles]);
    }
  }, [verbs.selectedItem]);

  useEffect(() => {
    if (particles.selectedItem) {
      const disableVerbs = verbs.items.filter(
        (verb) => !Data.verbs[verb][particles.selectedItem]
      );
      setDisableVerbList([...disableVerbs]);
    }
  }, [particles.selectedItem]);

  return (
    <>
      <div className={styles.flex}>
        <SelectItem
          {...verbs}
          //   items={verbList}
          //   selectedItem={selectedVerb}
          //   setSelectedItem={setSelectedVerb}
          disableItems={disableVerbList}
        />
        <SelectItem
          {...particles}
          //   items={particleList}
          //   selectedItem={selectedParticle}
          //   setSelectedItem={setSelectedParticle}
          disableItems={disableParticleList}
        />
      </div>
      {/* {selectedVerb &&
        selectedParticle &&
        `${selectedVerb} - ${selectedParticle}`} */}
    </>
  );
};

export default VerbList;
