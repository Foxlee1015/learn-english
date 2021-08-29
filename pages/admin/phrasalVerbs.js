import { PhrasalVerbForm, PhrasalVerbList } from "../../components/admin";

import { useFormList } from "../../hooks";
import { AdminContainer as Container } from "../../components/admin/common";

const PhrasalVerbs = () => {
  const phrasalVerbFormList = useFormList("phrasal-verbs/");

  return (
    <Container>
      <PhrasalVerbForm {...phrasalVerbFormList} />
      <PhrasalVerbList {...phrasalVerbFormList} />
    </Container>
  );
};

export default PhrasalVerbs;
