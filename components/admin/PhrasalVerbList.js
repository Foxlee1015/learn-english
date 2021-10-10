import { useEffect } from "react";
import { PhrasalVerbDictionaries } from ".";
import { useSelectItem } from "../../hooks";
import { SelectItem } from "../common";
import { AdminContentListContainer as Container } from "./common";


const PhrasalVerbList = ({
  phrasalVerbs,
  setPhrasalVerb
}) => {
  const verbs = useSelectItem([], "verb");
  const particles = useSelectItem([], "particle");

  useEffect(() => {
    const uniqueVerbs = [...new Map(phrasalVerbs.data.map(item =>
      [item["verb"], item])).values()]
    verbs.setItems([...uniqueVerbs])
  }, [phrasalVerbs])

  useEffect(() => {
    particles.setItems(phrasalVerbs.data.filter(item => item.verb === verbs.selectedItem.verb))
  }, [verbs.selectedItem])

  useEffect(() => {
    setPhrasalVerb({ ...particles.selectedItem })
  }, [particles.selectedItem])

  return (
    <Container>
      <SelectItem {...verbs} loading={phrasalVerbs.loading} />
      <SelectItem {...particles} />
      {particles.selectedItem && particles.selectedItem.dictionaries && <PhrasalVerbDictionaries data={particles.selectedItem.dictionaries} />}
    </Container>
  );
};

export default PhrasalVerbList;
