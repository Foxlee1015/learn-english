import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";

const IdiomList = ({ data }) => {
  const idioms = useSelectItem(data, "expression");
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchFullText, setSearchFullText] = useState(false);

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

  const getIdioms = async () => {
    if (searchText !== "") {
      const fullSearch = searchFullText ? 1 : 0;
      try {
        const params = createQueryParams({
          search_key: searchText,
          full_search: fullSearch,
        });
        const res = await fetch(`${server}/api/idioms/?${params}`);
        const data = await res.json();
        idioms.setItems([...data.result]);
        idioms.setSelectedItem(data.result[0]["expression"]);
      } catch {}
    }
  };

  useEffect(() => {
    filterVerbList();
  }, [searchText]);

  const setIdiomInfo = () => {
    let expression = "";
    let definitions = [];
    let sentences = [];

    const selectedIdiom = idioms.items.find(
      (item) => item["expression"] === idioms.selectedItem
    );
    if (selectedIdiom) {
      ({ expression, definitions, sentences } = selectedIdiom);
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
        onBlur={() => getIdioms()}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={searchFullText}
          onClick={() => setSearchFullText(!searchFullText)}
        ></input>
      </div>
      <div className={[styles.strechChildBox]}>
        <SelectItem {...idioms} />
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default IdiomList;
