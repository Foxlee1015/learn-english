import PhrasalVerbForm from "../../components/admin/PhrasalVerbForm";
import PhrasalVerbList from "../../components/admin/PhrasalVerbList";

import AdminStyle from "../../styles/pages/admin/Admin.module.css"

const PhrasalVerbs = () => {
  return (
    <div className={AdminStyle.container}>
      <PhrasalVerbForm />
      <PhrasalVerbList />
    </div>
  );
};

export default PhrasalVerbs;
