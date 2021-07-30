import PhrasalVerbForm from "../../components/admin/PhrasalVerbForm";
import PhrasalVerbList from "../../components/admin/PhrasalVerbList";

import AdminPhrasalVerbStyle from "../../styles/pages/admin/AdminPhrasalVerb.module.css"

const PhrasalVerbs = () => {
  return (
    <div className={AdminPhrasalVerbStyle.container}>
      <PhrasalVerbForm />
      <PhrasalVerbList />
    </div>
  );
};

export default PhrasalVerbs;
