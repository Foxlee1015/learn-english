import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import InputCheckbox from "./common/InputCheckbox";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";
import useInputSearch from "../hooks/useInputSearch";

const IdiomList = ({ data }) => {
  const idioms = useSelectItem(data, "expression");
  const [inputSearch, setInputSearchPlaceholder] = useInputSearch();
  const [cardData, setCardData] = useState({});
  const [searchFullText, setSearchFullText] = useState(false);
  const [searchExactText, setSearchExactText] = useState(false);

  useEffect(() => {
    if (data && data.length === 0) {
      updateIdiomList();
    }
  }, []);

  useEffect(() => {
    setIdiomInfo();
  }, [idioms.selectedItem, inputSearch.value]);

  useEffect(() => {
    resetItems();
    updateIdiomList();
  }, [inputSearch.value, , searchFullText, searchExactText]);

  useEffect(() => {
    updatePlaceholder();
  }, [searchFullText, searchExactText]);

  const updatePlaceholder = () => {
    if (searchFullText && searchExactText) {
      setInputSearchPlaceholder(
        "Search an exact idiom in definitions and sentences....."
      );
    } else if (searchFullText) {
      setInputSearchPlaceholder(
        "Search idioms in definitions and sentences....."
      );
    } else if (searchExactText) {
      setInputSearchPlaceholder("Search an exact idiom.....");
    } else {
      setInputSearchPlaceholder("Search.....");
    }
  };

  const resetItems = () => {
    idioms.setItems([]);
    idioms.setSelectedItem("");
  };

  const updateIdiomList = async () => {
    const searchIdioms = await getSearchIdioms();
    idioms.setItems([...searchIdioms]);
  };

  const getSearchIdioms = async () => {
    const fullSearch = inputSearch.value !== "" && searchFullText ? 1 : 0;
    const ExactSearch = inputSearch.value !== "" && searchExactText ? 1 : 0;

    try {
      const params = createQueryParams({
        search_key: inputSearch.value,
        full_search: fullSearch,
        exact: ExactSearch,
      });
      const res = await fetch(`${server}/api/idioms/?${params}`);
      const data = await res.json();
      return data.result;
    } catch {
      return [];
    }
  };

  const setIdiomInfo = async () => {
    let expression = "";
    let definitions = [];
    let sentences = [];
    let count = 0;
    let _id;

    const selectedIdiom = idioms.items.find(
      (item) => item["expression"] === idioms.selectedItem
    );
    if (selectedIdiom) {
      ({ expression, definitions, sentences, _id } = selectedIdiom);
      count = await getIdiomLikes(_id);
    }
    setCardData({
      title: expression,
      definitions,
      sentences,
      count,
    });
  };

  const getIdiomLikes = async (_id) => {
    try {
      const params = createQueryParams({
        idiom_id: _id,
      });
      const res = await fetch(`${server}/api/idioms/likes?${params}`);
      const data = await res.json();
      return data.result;
    } catch {
      return 0;
    }
  };

  return (
    <div className={styles.wrapper}>
      <input {...inputSearch} className={styles.input} />
      <div>
        <InputCheckbox
          label="Search in definitions/sentences"
          checked={searchFullText}
          onChange={setSearchFullText}
        />
        <InputCheckbox
          label="Search exact Idiom if you get too many results"
          checked={searchExactText}
          onChange={setSearchExactText}
        />
      </div>
      <div className={[styles.strechChildBox]}>
        <SelectItem {...idioms} />
      </div>
      {idioms.selectedItem !== "" && <ExplanationCard {...cardData} />}
    </div>
  );
};

export default IdiomList;
