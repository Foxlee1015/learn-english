import { AdminContainer as Container } from "../../components/admin/common";
import { PhrasalVerbDetailForm, PhrasalVerbList, VerbParticleForm } from "../../components/admin";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks";
const PhrasalVerbs = () => {
  const [phrasalVerb, setPhrasalVerb] = useState({
    'verb': "",
    'particle': ""
  })
  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch([])

  useEffect(() => {
    refreshPhrasalVerbs()
  }, [])

  const refreshPhrasalVerbs = () => {
    doFetchPhrasalVerbs(`phrasal-verbs/`);
  }

  return (
    <Container>
      <VerbParticleForm refreshPhrasalVerbs={refreshPhrasalVerbs} />
      <PhrasalVerbList setPhrasalVerb={setPhrasalVerb} phrasalVerbs={fetchPhrasalVerbs} />
      {phrasalVerb.verb !== "" && phrasalVerb.particle !== "" && (
        <PhrasalVerbDetailForm phrasalVerb={phrasalVerb} refreshPhrasalVerbs={refreshPhrasalVerbs} />
      )}
    </Container>
  );
};

export default PhrasalVerbs;
