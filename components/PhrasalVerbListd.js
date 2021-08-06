import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import InputCheckbox from "./common/InputCheckbox";
import styles from "../styles/pages/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";
import useInputSearch from "../hooks/useInputSearch";

const setUniqueVerbList = (items) => {
  try {
    const uniqueVerbs = new Set();
    for (const item of items) {
      uniqueVerbs.add(item.verb.toLowerCase());
    }

    return Array.from(uniqueVerbs).map((item) => {
      return { verb: item };
    });
  } catch {
    return [];
  }
};

const PhrasalVerb = ({ data }) => {
  const verbs = useSelectItem(data, "verb");
  const [inputSearch, setInputSearchPlaceholder] = useInputSearch();
  const particles = useSelectItem([], "particle");
  const [cardData, setCardData] = useState({});
  const [searchFullText, setSearchFullText] = useState(false);
  const [searchExactText, setSearchExactText] = useState(false);

  useEffect(() => {
    if (data && data.length === 0) {
      updateVerbList();
    }
  }, []);

  useEffect(() => {
    updatePlaceholder();
  }, [searchFullText, searchExactText]);

  useEffect(() => {
    updateParticleList();
  }, [verbs.items, verbs.selectedItem]);

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

  useEffect(() => {
    resetItems();
    updateVerbList();
  }, [inputSearch.value, searchFullText, searchExactText]);

  const updatePlaceholder = () => {
    if (searchFullText && searchExactText) {
      setInputSearchPlaceholder(
        "Search an exact verb in definitions and sentences....."
      );
    } else if (searchFullText) {
      setInputSearchPlaceholder(
        "Search verbs in definitions and sentences....."
      );
    } else if (searchExactText) {
      setInputSearchPlaceholder("Search an exact verb.....");
    } else {
      setInputSearchPlaceholder("Search.....");
    }
  };

  const updateVerbList = async () => {
    const searchVerbs = await getSearchVerbs();
    verbs.setItems([...searchVerbs]);
  };

  const resetVerbs = () => {
    verbs.setItems([]);
    verbs.setSelectedItem("");
  };

  const resetParticles = () => {
    particles.setItems([]);
    particles.setSelectedItem("");
  };

  const resetItems = () => {
    resetVerbs();
    resetParticles();
  };

  const updateParticleList = async () => {
    if (verbs.items.length === 0 || verbs.selectedItem === "") {
      resetParticles();
    } else {
      const data = await getParticles();
      particles.setItems([...data]);
    }
  };

  const getParticles = async () => {
    try {
      const res = await fetch(
        `${server}/api/phrasal-verbs/${verbs.selectedItem.toLowerCase()}`
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
      const ExactSearch = inputSearch.value !== "" && searchExactText ? 1 : 0;
      const params = createQueryParams({
        search_key: inputSearch.value.toLowerCase(),
        full_search: fullSearch,
        exact: ExactSearch,
      });
      const res = await fetch(`${server}/api/phrasal-verbs/?${params}`);
      const data = await res.json();
      const uniqueVerbs = setUniqueVerbList(data.result);
      return uniqueVerbs;
    } catch {
      return [];
    }
  };

  return (
    <div className={styles.wrapper}>
      <input {...inputSearch} className={styles.input} />
      <div>
        <InputCheckbox
          label="Search in verb or definitions/sentences"
          checked={searchFullText}
          onChange={setSearchFullText}
        />
        <InputCheckbox
          label="Search containing or exact word"
          checked={searchExactText}
          onChange={setSearchExactText}
        />
      </div>
      <div className={styles.flex}>
        {<SelectItem {...verbs} />}
        {<SelectItem {...particles} />}
      </div>
      {verbs.selectedItem !== "" && 
      particles.selectedItem !== "" && (
        <ExplanationCard {...cardData} />
      )}
    </div>
  );
};

export default PhrasalVerb;
