import { useState, useEffect } from "react";
import SelectItem from "./common/SelectItem";
import styles from "../styles/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

import * as Data from "../data";

const VerbList = () => {
  const verbs = useSelectItem(Object.keys(Data.verbs));
  const particles = useSelectItem([...Data.particles]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (verbs.selectedItem) {
      const curVerbParticles = Object.keys(Data.verbs[verbs.selectedItem]);
      particles.setItems(curVerbParticles);
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
        {verbs.items && verbs.items.length > 0 && <SelectItem {...verbs} />}
        {particles.items && particles.items.length > 0 && (
          <SelectItem {...particles} />
        )}
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
