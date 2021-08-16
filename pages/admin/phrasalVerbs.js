import PhrasalVerbForm from "../../components/admin/PhrasalVerbForm";
import PhrasalVerbList from "../../components/admin/PhrasalVerbList";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";
import useFormList from "../../hooks/useFormList";

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
