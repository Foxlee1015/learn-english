import { useEffect } from "react";
import styled from "styled-components";
import { PhrasalVerbDictionaries } from ".";
import { useFetch, useSelectItem } from "../../hooks";
import { createQueryParams } from "../../utils/utils";
import { SelectItem } from "../common";
import { AdminContentListContainer as Container } from "./common";


const PhrasalVerbList = ({
}) => {
  const verbs = useSelectItem([], "verb");
  const particles = useSelectItem([], "particle");

  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch([])
  useEffect(() => {
    doFetchPhrasalVerbs(`phrasal-verbs/`);
  }, [])

  useEffect(() => {
    const uniqueVerbs = [...new Map(fetchPhrasalVerbs.data.map(item =>
      [item["verb"], item])).values()]
    verbs.setItems([...uniqueVerbs])
  }, [fetchPhrasalVerbs.data])

  useEffect(() => {
    particles.setItems(fetchPhrasalVerbs.data.filter(item => item.verb === verbs.selectedItem.verb))
  }, [verbs.selectedItem])

  return (
    <Container>
      <SelectItem {...verbs} loading={fetchPhrasalVerbs.loading} />
      <SelectItem {...particles} />
      {particles.selectedItem && <PhrasalVerbDictionaries data={particles.selectedItem.dictionaries} />}
    </Container>
  );
};

export default PhrasalVerbList;
