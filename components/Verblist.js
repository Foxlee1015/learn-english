import { useState, useEffect } from "react";
import SelectItem from "./common/SelectItem";
import styles from "../styles/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

import * as Data from "../data";

const VerbList = () => {
  const verbs = useSelectItem(Object.keys(Data.verbs));
  const particles = useSelectItem([...Data.particles]);
  const [disableParticleList, setDisableParticleList] = useState([]);
  const [displayData, setDisplayData] = useState([]);

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
    if (verbs.selectedItem && particles.selectedItem) {
      const curVerb = verbs.selectedItem;
      const curParticle = particles.selectedItem;
      setDisplayData(Data.verbs[curVerb][curParticle]);
    }
  }, [verbs.selectedItem, particles.selectedItem]);

  return (
    <>
      <div className={styles.flex}>
        <SelectItem {...verbs} />
        <SelectItem {...particles} disableItems={disableParticleList} />
      </div>
      {displayData && displayData.length > 0 && (
        <>
          <div>{displayData[0]}</div>
          {displayData[1].map((sentense) => (
            <p key={sentense}>{sentense}</p>
          ))}
        </>
      )}
    </>
  );
};

export default VerbList;
