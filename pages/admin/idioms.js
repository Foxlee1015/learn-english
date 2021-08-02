import IdiomForm from "../../components/admin/IdiomForm";
import IdiomList from "../../components/admin/IdiomList";
import AdminNav from "../../components/admin/AdminNav";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const Idioms = () => {
  return (
    <div className={AdminStyle.container}>
      <AdminNav />
      <IdiomForm />
      <IdiomList />
    </div>
  );
};

export default Idioms;
