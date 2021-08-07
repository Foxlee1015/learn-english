import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import InputCheckbox from "./common/InputCheckbox";
import useSelectItem from "../hooks/useSelectItem";
import styles from "../styles/pages/Idiom.module.css";
import { createQueryParams, renameObjectKey } from "../utils/utils";
import { server } from "../config";
import useInputSearch from "../hooks/useInputSearch";
import useFetch from "../hooks/useFetch";

const IdiomList = ({ idiomList }) => {
  const idioms = useSelectItem(idiomList, "expression");
  const [inputSearch, setInputSearchPlaceholder] = useInputSearch();
  const [fetchIdioms, doFetchIidoms] = useFetch([]);
  const [cardData, setCardData] = useState({});
  const [searchFullText, setSearchFullText] = useState(false);
  const [searchExactText, setSearchExactText] = useState(false);

  useEffect(() => {
    if (idiomList && idiomList.length === 0) {
      getIdioms();
    }
  }, []);

  useEffect(() => {
    setIdiomInfo();
  }, [idioms.selectedItem, inputSearch.value]);

  useEffect(() => {
    resetItems();
    getIdioms();
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

  useEffect(()=>{
    idioms.setItems([...fetchIdioms.data])
  }, [fetchIdioms.data])

  const getIdioms = async () => {
    const fullSearch = inputSearch.value !== "" && searchFullText ? 1 : 0;
    const ExactSearch = inputSearch.value !== "" && searchExactText ? 1 : 0;
    const params = createQueryParams({
      search_key: inputSearch.value,
      full_search: fullSearch,
      exact: ExactSearch,
    });
    doFetchIidoms(`${server}/api/idioms/?${params}`)
  };

  const setIdiomInfo = async () => {
    const selectedIdiom = idioms.items.find(
      (item) => item["expression"] === idioms.selectedItem
    );
    if (selectedIdiom) {
      // renameObjectKey({src:selectedIdiom, oldKey:"expression", newKey:"title"})
      setCardData({...selectedIdiom, title:selectedIdiom.expression})
    } else {
      setCardData({});
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
        {fetchIdioms.loading ? (
          <div className={styles.loading}>
            {fetchIdioms.loading}
          </div>
        ) : (
          <SelectItem {...idioms} />
        )}
      </div>
      {idioms.selectedItem !== "" && (
        <ExplanationCard 
          {...cardData} 
          resources="idioms"
          resource_id="idiom_id" 
        />)}
    </div>
  );
};

export default IdiomList;
