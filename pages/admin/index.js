import ProtectedRoute from "../../HOC/ProtectedRoute";
import AdminNav from "../../components/admin/AdminNav";

const Admin = ({}) => {
  return (
    <>
      <AdminNav />
      <h2>admin</h2>
    </>
  );
};

export default ProtectedRoute(Admin);
