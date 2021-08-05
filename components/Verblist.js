import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import styles from "../styles/pages/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";
import useInputSearch from "../hooks/useInputSearch"


const setUniqueVerbList = (items) => {
  try {
    const uniqueVerbs = new Set();
    for (const item of items) {
      uniqueVerbs.add(item.verb)
    }

    return Array.from(uniqueVerbs).map(item=>{
      return {verb:item}});
  } catch {
    return []
  }
}


const VerbList = ({ originData }) => {
  const verbs = useSelectItem(originData, "verb");
  const [inputSearch, setInputSearchPlaceholder] = useInputSearch();
  const particles = useSelectItem([], "particle");
  const [cardData, setCardData] = useState({});
  const [searchFullText, setSearchFullText] = useState(false);

  useEffect(()=>{
    if (originData && originData.length === 0) {
      updateVerbList();
    }
  },[])

  useEffect(() => {
    if (searchFullText) {
      setInputSearchPlaceholder("Find phrasal verbs in definitions and sentences")
    } else {
      setInputSearchPlaceholder("Search.....")
    }
  }, [searchFullText]);

  useEffect(() => {
    updateParticleList();
  }, [verbs.items, verbs.selectedItem]);

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

  useEffect(() => {
    resetItems()
    updateVerbList();
  }, [inputSearch.value, searchFullText]);

  const updateVerbList = async () => {
      const searchVerbs = await getSearchVerbs()
      verbs.setItems([...searchVerbs]);
  };

  const resetVerbs = () => {
    verbs.setItems([])
    verbs.setSelectedItem("")
  }

  const resetParticles = () => {
    particles.setItems([])
    particles.setSelectedItem("")
  }

  const resetItems = () => {
    resetVerbs()
    resetParticles()
  }

  const updateParticleList = async () => {
    if (verbs.items.length === 0 || verbs.selectedItem === "") {
      resetParticles()
    } else {
      const data = await getParticles();
      particles.setItems([...data]);
    }
  };

  const getParticles = async () => {
    try {
        const res = await fetch(
          `${server}/api/phrasal-verbs/${verbs.selectedItem}`
        );
        const data = await res.json();
        return data.result;
    } catch {
      return [];
    }
  };

  const setPhrasalVerbInfo = () => {
    let definitions = [];
    let sentences = [];

    if (verbs.selectedItem !== "" && particles.selectedItem !== "") {
      const phrasalVerbInfo = particles.items.find(
        (item) => item.particle === particles.selectedItem
      );
      if (phrasalVerbInfo) {
        ({ definitions, sentences } = phrasalVerbInfo);
      }
    }

    setCardData({
      title: verbs.selectedItem,
      subTitle: particles.selectedItem,
      definitions,
      sentences,
    });
  };

 const getSearchVerbs = async () => {
  try {
    const fullSearch = inputSearch.value !== "" && searchFullText ? 1 : 0;
    const params = createQueryParams({
      search_key: inputSearch.value,
      full_search: fullSearch,
    });
    const res = await fetch(`${server}/api/phrasal-verbs/?${params}`);
    const data = await res.json();
    const uniqueVerbs = setUniqueVerbList(data.result)
    return uniqueVerbs
  } catch {
    return []
  }
 }

  return (
    <div className={styles.wrapper}>
      <input
        {...inputSearch}
        className={styles.input}
      />
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={searchFullText}
          onChange={(e) => setSearchFullText(e.target.checked)}
        ></input>
      </div>
      <div className={styles.flex}>
        {<SelectItem {...verbs} />}
        {<SelectItem {...particles} />}
      </div>
      {verbs.selectedItem !=="" && particles.selectedItem !== "" && (
        <ExplanationCard {...cardData} />
      )}
    </div>
  );
};

export default VerbList;
