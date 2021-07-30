import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";

const IdiomList = ({ data }) => {
  const idioms = useSelectItem(data, "expression");
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");

  const filterVerbList = () => {
    if (searchText === "") {
      idioms.setItems([...data]);
    } else {
      const filteredIdioms = data.filter((idiom) =>
        idiom.expression.includes(searchText.toLowerCase())
      );
      idioms.setItems([...filteredIdioms]);
    }
  };

  useEffect(() => {
    filterVerbList();
  }, [searchText]);

  const setIdiomInfo = () => {
    let expression = "";
    let definitions = [];
    let sentences = [];

    const selectedIdiom = data.find(
      (item) => item["expression"] === idioms.selectedItem
    );
    if (selectedIdiom) {
      ({ title: expression, definitions, sentences } = selectedIdiom);
    }
    setCardData({
      title: expression,
      definitions,
      sentences,
    });
  };

  useEffect(() => {
    setIdiomInfo();
  }, [idioms.selectedItem, searchText]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Find idioms"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={[styles.strechChildBox]}>
        <SelectItem {...idioms} />
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default IdiomList;
