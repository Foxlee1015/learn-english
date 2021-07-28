import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";

const IdiomList = ({ data }) => {
  const idioms = useSelectItem(data);
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const filterVerbList = () => {
    if (searchText === "") {
      idioms.setItems([...data.result]);
    } else {
      const filteredIdioms = data.result.filter((idiom) =>
        idiom.expression.includes(searchText.toLowerCase())
      );
      idioms.setItems([...filteredIdioms]);
    }
  };

  useEffect(() => {
    filterVerbList();
  }, [searchText]);

  const setIdiomInfo = () => {
    setCardData(data.result.find((item) => item._id === selectedId));
  };

  useEffect(() => {
    setIdiomInfo();
  }, [selectedId, searchText]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Find idioms"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={[styles.strechChildBox]}>
        <SelectItem
          {...idioms}
          selectedItem={selectedId}
          setSelectedItem={setSelectedId}
        />
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default IdiomList;
