import { useSelector } from "react-redux";
import AdminNav from "../navs/AdminNav";
import Footer from "../Footer";
import adminLayoutstyles from "../../styles/components/AdminLayout.module.css";

const AdminLayout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {auth.loggedIn && <AdminNav />}
      <div className={adminLayoutstyles.container}>
        <main className={adminLayoutstyles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
