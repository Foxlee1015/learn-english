import AdminNav from "../navs/AdminNav";
import Footer from "../Footer";
import adminLayoutstyles from "../../styles/components/AdminLayout.module.css";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNav />
      <div className={adminLayoutstyles.container}>
        <main className={adminLayoutstyles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
