import PhrasalVerbForm from "../../components/admin/PhrasalVerbForm";
import PhrasalVerbList from "../../components/admin/PhrasalVerbList";
import AdminNav from "../../components/admin/AdminNav";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const PhrasalVerbs = () => {
  return (
    <div className={AdminStyle.container}>
      <AdminNav />
      <PhrasalVerbForm />
      <PhrasalVerbList />
    </div>
  );
};

export default PhrasalVerbs;
