import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import styles from "../styles/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

import * as Data from "../data";

const verbResources = Data.verbs;
const particleResources = Data.particles;
const verbList = Object.keys(verbResources);

const VerbList = () => {
  const verbs = useSelectItem(verbList);
  const particles = useSelectItem([...particleResources]);
  const [displayData, setDisplayData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (verbs.selectedItem) {
      const curVerbParticles = Object.keys(verbResources[verbs.selectedItem]);
      particles.setItems(curVerbParticles);
    }
  }, [verbs.selectedItem, particles.setItems]);

  useEffect(() => {
    if (verbs.selectedItem && particles.selectedItem) {
      const curVerb = verbs.selectedItem;
      const curParticle = particles.selectedItem;
      setDisplayData(verbResources[curVerb][curParticle]);
    }
  }, [verbs.selectedItem, particles.selectedItem]);

  useEffect(() => {
    const filteredVerbs = verbList.filter((verb) => verb.includes(searchText));
    verbs.setItems(filteredVerbs);
  }, [searchText, verbs.setItems]);

  return (
    <>
      <input
        className={styles.input}
        placeholder="Type verb"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={styles.flex}>
        {<SelectItem {...verbs} />}
        {<SelectItem {...particles} />}
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
