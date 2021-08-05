import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";

const IdiomList = ({ originData }) => {
  const idioms = useSelectItem(originData, "expression");
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchFullText, setSearchFullText] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  
  useEffect(()=>{
    if (originData && originData.length === 0) {
      updateIdiomList();
    }
  },[])

  useEffect(() => {
    setIdiomInfo();
  }, [idioms.selectedItem, searchText]);
  
  useEffect(() => {
    resetItems()
    updateIdiomList();
  }, [searchText, searchFullText]);
  
  useEffect(() => {
    if (searchFullText) {
      setPlaceholder("Find idioms in definitions and sentences")
    } else {
      setPlaceholder("Search.....")
    }
  }, [searchFullText]);

  const resetItems = () => {
    idioms.setItems([])
    idioms.setSelectedItem("")
  }

  const updateIdiomList = async () => {
    const searchIdioms = await getSearchIdioms()
    idioms.setItems([...searchIdioms]);   
};

  const getSearchIdioms = async () => {
    const fullSearch = searchText !== "" && searchFullText ? 1 : 0;
    try {
      const params = createQueryParams({
        search_key: searchText,
        full_search: fullSearch,
      });
      const res = await fetch(`${server}/api/idioms/?${params}`);
      const data = await res.json();
      return data.result
      } catch {
      return []
    }
  };

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

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder={placeholder}
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={searchFullText}
          onChange={(e) => setSearchFullText(e.target.checked)}
        ></input>
      </div>
      <div className={[styles.strechChildBox]}>
        <SelectItem {...idioms} />
      </div>
      {idioms.selectedItem !=="" && (
        <ExplanationCard {...cardData} />
      )}
    </div>
  );
};

export default IdiomList;
