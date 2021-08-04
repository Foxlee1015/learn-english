import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import styles from "../styles/pages/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";

const VerbList = ({ data }) => {
  const verbs = useSelectItem(data, "verb");
  const particles = useSelectItem([], "particle");
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchFullText, setSearchFullText] = useState(false);

  useEffect(()=>{
    updateParticleList()
  }, [verbs.items, verbs.selectedItem])

  const updateParticleList = async () => {
    if (verbs.items.length > 0 && verbs.items[0].particle) {
      particles.setItems([...verbs.items])
    } else if (verbs.items.length === 0 ||verbs.selectedItem === "") {
      particles.setItems([])
      particles.setSelectedItem("")
    } else {
      const data = await getParticles();
      particles.setItems([...data])
    }
  }
  
  const getParticles = async () => {
    try {
      const res = await fetch(
        `${server}/api/phrasal-verbs/${verbs.selectedItem}`
      );
      const data = await res.json();
      return data.result
    } catch {
      return []
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

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

  const getPhrasalVerbs = async () => {
    if (searchText !== "") {
      const fullSearch = searchFullText ? 1 : 0;
      try {
        const params = createQueryParams({
          search_key: searchText,
          full_search: fullSearch,
        });
        const res = await fetch(
          `${server}/api/phrasal-verbs/?${params}`
        );
        const data = await res.json();
        verbs.setItems([...data.result]);
      } catch {}
    }
  };

  const filterVerbList = () => {
    verbs.setSelectedItem(""); // auto select after sorting in SelectItem component
    if (searchText !== "")  {
      const filteredVerbs = data.filter((item) =>
        item.verb.includes(searchText.toLowerCase())
      );
      verbs.setItems([...filteredVerbs]);
    } else {
      verbs.setItems([...data])
    }
  };

  useEffect(() => {
    filterVerbList();
  }, [searchText, verbs.setItems]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Type verb"
        type="text"
        onBlur={() => getPhrasalVerbs()}
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
      <button
        type="button"
        onClick={() => getPhrasalVerbs()}>
        Search
      </button>

      <div className={styles.flex}>
        {<SelectItem {...verbs} />}
        {<SelectItem {...particles} />}
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default VerbList;
