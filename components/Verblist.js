import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import styles from "../styles/pages/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";

const VerbList = ({ data }) => {
  const verbs = useSelectItem(data, "verb");
  const particles = useSelectItem([], "particle");
  const [cardData, setCardData] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const selectedVerb = verbs.items.find(
      (item) => item.verb === verbs.selectedItem
    );

    if (selectedVerb) {
      const selectedVerbParticles = [];
      for (const key in selectedVerb.particles) {
        selectedVerbParticles.push({
          ...selectedVerb.particles[key],
          particle: key,
        });
      }
      particles.setItems([...selectedVerbParticles]);
    }
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
      ({ definitions, sentences } = phrasalVerbInfo);
    }

    setCardData({
      title: selectedVerb,
      subTitle: selectedVParticle,
      definitions,
      sentences,
    });
  };

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

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
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={styles.flex}>
        {<SelectItem {...verbs} />}
        {<SelectItem {...particles} />}
      </div>

      <ExplanationCard {...cardData} />
    </div>
  );
};

export default VerbList;
