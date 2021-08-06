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

const VerbList = ({ originData }) => {
  const verbs = useSelectItem(originData, "verb");
  const [inputSearch, setInputSearchPlaceholder] = useInputSearch();
  const particles = useSelectItem([], "particle");
  const [cardData, setCardData] = useState({});
  const [searchFullText, setSearchFullText] = useState(false);
  const [searchExactText, setSearchExactText] = useState(false);

  useEffect(() => {
    if (originData && originData.length === 0) {
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
    console.log(verbs.selectedItem, particles.selectedItem);
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

  const setPhrasalVerbInfo = async () => {
    let definitions = [];
    let sentences = [];
    let count = 0;
    let _id;

    if (verbs.selectedItem !== "" && particles.selectedItem !== "") {
      const phrasalVerbInfo = particles.items.find(
        (item) => item.particle === particles.selectedItem
      );
      if (phrasalVerbInfo) {
        ({ definitions, sentences, _id } = phrasalVerbInfo);
        count = await getPhrasalVerbLikes(_id);
      }
    }

    setCardData({
      title: verbs.selectedItem,
      subTitle: particles.selectedItem,
      definitions,
      sentences,
      count,
    });
  };

  const getPhrasalVerbLikes = async (_id) => {
    try {
      const params = createQueryParams({
        phrasal_verb_id: _id,
      });
      const res = await fetch(`${server}/api/phrasal-verbs/likes?${params}`);
      const data = await res.json();
      return data.result;
    } catch {
      return 0;
    }
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
      {verbs.selectedItem !== "" && particles.selectedItem !== "" && (
        <ExplanationCard {...cardData} />
      )}
    </div>
  );
};

export default VerbList;
