import { useState, useEffect } from "react";
import { SelectItem, ExplanationCard, InputCheckbox } from "./common";
import { useSelectItem, useInputSearch, useFetch } from "../hooks";
import { createQueryParams } from "../utils/utils";
import styled from "styled-components";
import { PhrasalVerbDictionaries } from "./admin";

const Container = styled.div`
  width: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 0.5rem;
`;

const Input = styled.input`
  margin: 0;
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
`;

const setUniqueVerbList = (items) => {
  try {
    const uniqueVerbs = new Set();
    for (const item of items) {
      uniqueVerbs.add(item.verb.toLowerCase());
    }

    return Array.from(uniqueVerbs).map((item, index) => {
      return { _id: index, verb: item };
    });
  } catch {
    return [];
  }
};

const PhrasalVerbList = ({ data }) => {
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
      const selectedVerb = verbs.items.find(
        (verb) => verb._id === verbs.selectedItem._id
      );
      doFetchParticles(`phrasal-verbs/${selectedVerb.verb.toLowerCase()}`);
    }
  };

  useEffect(() => {
    particles.setItems([...fetchParticles.data]);
  }, [fetchParticles.data]);

  const setPhrasalVerbInfo = async () => {
    if (verbs.selectedItem !== "" && particles.selectedItem !== "") {
      const selectedPhrasalVerb = particles.items.find(
        (item) => item._id === particles.selectedItem
      );
      if (selectedPhrasalVerb) {
        setCardData({
          ...selectedPhrasalVerb,
          title: selectedPhrasalVerb.verb,
          subTitle: selectedPhrasalVerb.particle,
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
    doFetchVerbs(`phrasal-verbs/?${params}`);
  };

  return (
    <Container>
      <Input {...inputSearch} />
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
      <SelectWrapper>
        {<SelectItem {...verbs} loading={fetchVerbs.loading} />}
        {<SelectItem {...particles} loading={fetchParticles.loading} />}
      </SelectWrapper>
      {verbs.selectedItem !== "" && particles.selectedItem !== "" && (
        <ExplanationCard
          {...cardData}
          resources="phrasal-verbs"
          resource_id="phrasal_verb_id"
        />

      )}
      {cardData.dictionaries && <PhrasalVerbDictionaries data={cardData.dictionaries} />}
    </Container>
  );
};

export default PhrasalVerbList;
