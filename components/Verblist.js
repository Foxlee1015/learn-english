import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import styles from "../styles/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

import * as Data from "../data";

const verbResources = Data.verbs;
const verbList = Object.keys(verbResources);

const VerbList = () => {
  const verbs = useSelectItem(verbList);
  const particles = useSelectItem([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const resetParticles = () => {
    particles.setSelectedItem(""); // auto select after sorting in SelectItem component
    particles.setItems([]); // reset particles when a selected verb is changed
  };

  const updateParticles = useCallback(() => {
    resetParticles();
    if (verbs.selectedItem !== "") {
      const curVerbParticles = Object.keys(verbResources[verbs.selectedItem]);
      particles.setItems(curVerbParticles);
    }
  }, [verbs.selectedItem]);

  useEffect(() => {
    updateParticles();
  }, [updateParticles]);

  const setPhrasalVerbInfo = () => {
    if (verbs.selectedItem !== "" && particles.selectedItem !== "") {
      const curVerb = verbs.selectedItem;
      const curParticle = particles.selectedItem;
      setDisplayData(verbResources[curVerb][curParticle]);
    }
  };

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

  const filterVerbList = () => {
    verbs.setSelectedItem(""); // auto select after sorting in SelectItem component
    if (searchText === "") {
      verbs.setItems([...verbList]);
    } else {
      const filteredVerbs = verbList.filter((verb) =>
        verb.includes(searchText.toLowerCase())
      );
      verbs.setItems([...filteredVerbs]);
    }
  };

  useEffect(() => {
    filterVerbList();
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
