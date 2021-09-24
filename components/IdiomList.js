import { useState, useEffect } from "react";
import { SelectItem, ExplanationCard, InputCheckbox } from "./common";
import { useSelectItem, useInputSearch, useFetch } from "../hooks";
import { createQueryParams } from "../utils/utils";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;

  > * {
    flex: 1;
  }
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

const IdiomList = ({ idiomList }) => {
  const idioms = useSelectItem(idiomList, "expression");
  const [inputSearch, setInputSearchPlaceholder] = useInputSearch();
  const [fetchIdioms, doFetchIdioms] = useFetch([]);
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

  useEffect(() => {
    idioms.setItems([...fetchIdioms.data]);
  }, [fetchIdioms.data]);

  const getIdioms = async () => {
    const fullSearch = inputSearch.value !== "" && searchFullText ? 1 : 0;
    const ExactSearch = inputSearch.value !== "" && searchExactText ? 1 : 0;
    const params = createQueryParams({
      search_key: inputSearch.value,
      full_search: fullSearch,
      exact: ExactSearch,
    });
    doFetchIdioms(`idioms/?${params}`);
  };

  const setIdiomInfo = async () => {
    const selectedIdiom = idioms.items.find(
      (item) => item._id === idioms.selectedItem
    );
    if (selectedIdiom) {
      setCardData({ ...selectedIdiom, title: selectedIdiom.expression });
    } else {
      setCardData({});
    }
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
        label="Search exact Idiom if you get too many results"
        checked={searchExactText}
        onChange={setSearchExactText}
      />
      <SelectWrapper>
        <SelectItem {...idioms} loading={fetchIdioms.loading} />
      </SelectWrapper>
      {idioms.selectedItem !== "" && (
        <ExplanationCard
          {...cardData}
          resources="idioms"
          resource_id="idiom_id"
        />
      )}
    </Container>
  );
};

export default IdiomList;
