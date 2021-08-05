import IdiomForm from "../../components/admin/IdiomForm";
import IdiomList from "../../components/admin/IdiomList";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const Idioms = () => {
  return (
    <div className={AdminStyle.container}>
      <IdiomForm />
      <IdiomList />
    </div>
  );
};

export default Idioms;
