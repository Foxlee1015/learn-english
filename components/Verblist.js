import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import Card from "./common/Card";
import styles from "../styles/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

import * as Data from "../data";

const verbResources = Data.verbs;
const verbList = Object.keys(verbResources);

const VerbList = () => {
  const verbs = useSelectItem(verbList);
  const particles = useSelectItem([]);
  const [cardData, setCardData] = useState({});
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
    const verb = verbs.selectedItem;
    const particle = particles.selectedItem;
    let definition = "";
    let sentenses = [];

    if (verb !== "" && particle !== "") {
      [definition, sentenses] = verbResources[verb][particle];
    }

    setCardData({
      verb,
      particle,
      definition,
      sentenses,
    });
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
    <div className={styles.wrapper}>
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

      <Card {...cardData} />
    </div>
  );
};

export default VerbList;
