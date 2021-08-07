import { useState, useEffect, useCallback } from "react";
import SelectItem from "./common/SelectItem";
import ExplanationCard from "./common/ExplanationCard";
import InputCheckbox from "./common/InputCheckbox";
import styles from "../styles/pages/Verb.module.css";
import useSelectItem from "../hooks/useSelectItem";
import { createQueryParams } from "../utils/utils";
import { server } from "../config";
import useInputSearch from "../hooks/useInputSearch";
import useFetch from "../hooks/useFetch";

import BarLoader from "react-spinners/BarLoader";

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
  const [fetchVerbs, doFetchVerbs] = useFetch([]);
  const [fetchParticles, doFetchParticles] = useFetch([]);
  const [cardData, setCardData] = useState({});
  const [searchFullText, setSearchFullText] = useState(false);
  const [searchExactText, setSearchExactText] = useState(false);

  useEffect(() => {
    if (data && data.length === 0) {
      getVerbs();
    }
  }, []);

  useEffect(() => {
    updatePlaceholder();
  }, [searchFullText, searchExactText]);

  useEffect(() => {
    getParticles();
  }, [verbs.items, verbs.selectedItem]);

  useEffect(() => {
    setPhrasalVerbInfo();
  }, [verbs.selectedItem, particles.selectedItem]);

  useEffect(() => {
    resetItems();
    getVerbs();
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

  const getParticles = () => {
    if (verbs.items.length === 0 || verbs.selectedItem === "") {
      resetParticles();
    } else {
      doFetchParticles(
        `${server}/api/phrasal-verbs/${verbs.selectedItem.toLowerCase()}`
      );
    }
  };

  useEffect(() => {
    particles.setItems([...fetchParticles.data]);
  }, [fetchParticles.data]);

  const setPhrasalVerbInfo = async () => {
    if (verbs.selectedItem !== "" && particles.selectedItem !== "") {
      const selectedPhrasalVerb = particles.items.find(
        (item) => item.particle === particles.selectedItem
      );
      if (selectedPhrasalVerb) {
        setCardData({
          ...selectedPhrasalVerb,
          title: verbs.selectedItem,
          subTitle: particles.selectedItem,
        });
      } else {
        setCardData({});
      }
    }
  };

  useEffect(() => {
    const uniqueVerbs = setUniqueVerbList(fetchVerbs.data);
    verbs.setItems([...uniqueVerbs]);
  }, [fetchVerbs.data]);

  const getVerbs = async () => {
    const fullSearch = inputSearch.value !== "" && searchFullText ? 1 : 0;
    const ExactSearch = inputSearch.value !== "" && searchExactText ? 1 : 0;
    const params = createQueryParams({
      search_key: inputSearch.value.toLowerCase(),
      full_search: fullSearch,
      exact: ExactSearch,
    });
    doFetchVerbs(`${server}/api/phrasal-verbs/?${params}`);
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
          label="Search exact word if you get too many results"
          checked={searchExactText}
          onChange={setSearchExactText}
        />
      </div>
      <div className={styles.flex}>
        {fetchVerbs.loading && (
          <div className={styles.loading}>
            <BarLoader color="#0070f3" />
          </div>
        )}
        {<SelectItem {...verbs} />}
        {fetchParticles.loading && (
          <div className={styles.loading}>
            <BarLoader color="#0070f3" />
          </div>
        )}
        {<SelectItem {...particles} />}
      </div>
      {verbs.selectedItem !== "" && particles.selectedItem !== "" && (
        <ExplanationCard
          {...cardData}
          resources="phrasal-verbs"
          resource_id="phrasal_verb_id"
        />
      )}
    </div>
  );
};

export default PhrasalVerb;