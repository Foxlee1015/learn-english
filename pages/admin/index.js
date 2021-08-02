import ProtectedRoute from "../../HOC/ProtectedRoute"

const Admin = ({}) => {
  return (
    <>
      <h2>admin</h2>
    </>
  );
};

export default ProtectedRoute(Admin);
