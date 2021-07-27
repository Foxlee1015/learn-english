import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";

import * as Data from "../data";

const idiomResources = Data.idioms;
const idiombList = Object.keys(idiomResources);

const IdiomList = () => {
  const idioms = useSelectItem(idiombList);
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");

  const setIdiomInfo = () => {
    if (idioms.selectedItem !== "") {
      const { definitions, sentenses } = idiomResources[idioms.selectedItem];
      setCardData({
        title: idioms.selectedItem,
        definitions,
        sentenses,
      });
    }
  };

  useEffect(() => {
    setIdiomInfo();
  }, [idioms.selectedItem]);

  const filterVerbList = () => {
    idioms.setSelectedItem(""); // auto select after sorting in SelectItem component
    if (searchText === "") {
      idioms.setItems([...idiombList]);
    } else {
      const filteredIdioms = idiombList.filter((idiom) =>
        idiom.includes(searchText.toLowerCase())
      );
      idioms.setItems([...filteredIdioms]);
    }
  };

  useEffect(() => {
    filterVerbList();
  }, [searchText, idioms.setItems]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Find idioms"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={[styles.strechChildBox]}>
        {<SelectItem {...idioms} />}
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default IdiomList;
