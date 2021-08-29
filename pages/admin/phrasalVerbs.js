import { PhrasalVerbForm, PhrasalVerbList } from "../../components/admin";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";
import { useFormList } from "../../hooks";

const PhrasalVerbs = () => {
  const phrasalVerbFormList = useFormList("phrasal-verbs/");

  return (
    <div className={AdminStyle.container}>
      <PhrasalVerbForm {...phrasalVerbFormList} />
      <PhrasalVerbList {...phrasalVerbFormList} />
    </div>
  );
};

export default PhrasalVerbs;
