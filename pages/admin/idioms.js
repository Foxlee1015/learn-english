import { IdiomForm, IdiomList } from "../../components/admin";
import ProtectedRoute from "../../HOC/ProtectedRoute";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const Idioms = () => {
  return (
    <div className={AdminStyle.container}>
      <IdiomForm />
      <IdiomList />
    </div>
  );
};
export default ProtectedRoute(Idioms);
