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

  const updateParticleList = (selectedVerb) => {
    const selectedVerbParticles = [];
    if (selectedVerb) {
      for (const key in selectedVerb.particles) {
        selectedVerbParticles.push({
          ...selectedVerb.particles[key],
          particle: key,
        });
      }
    }
    particles.setItems([...selectedVerbParticles]);
  };

  useEffect(() => {
    const selectedVerb = verbs.items.find(
      (item) => item.verb === verbs.selectedItem
    );
    updateParticleList(selectedVerb);
  }, [verbs.selectedItem]);

  const setPhrasalVerbInfo = () => {
    const selectedVerb = verbs.selectedItem;
    const selectedVParticle = particles.selectedItem;
    let definitions = [];
    let sentences = [];

    if (selectedVerb !== "" && selectedVParticle !== "") {
      const phrasalVerbInfo = particles.items.find(
        (item) => item.particle === selectedVParticle
      );
      if (phrasalVerbInfo) {
        ({ definitions, sentences } = phrasalVerbInfo);
      }
    }

    setCardData({
      title: selectedVerb,
      subTitle: selectedVParticle,
      definitions,
      sentences,
    });
  };

  useEffect(() => {
    getPhrasalVerbList();
  }, []);

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

  const getPhrasalVerbList = async () => {
    try {
      const params = createQueryParams({
        only_verb: 1,
      });
      const res = await fetch(
        `${server}/api/phrasal-verbs/?${params}`
      );
      const data = await res.json();
      verbs.setItems([...data.result]);
    } catch {}
  };

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
    if (searchText === "") {
      verbs.setItems([...data]);
    } else {
      const filteredVerbs = data.filter((item) =>
        item.verb.includes(searchText.toLowerCase())
      );
      verbs.setItems([...filteredVerbs]);
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

      <div className={styles.flex}>
        {<SelectItem {...verbs} />}
        {<SelectItem {...particles} />}
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default VerbList;
