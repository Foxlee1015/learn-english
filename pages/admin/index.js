import Layout from "../../components/Layout";
import AdminNav from "../../components/AdminNav"

const Admin = ({}) => {
  return (
    <>
      <h2>admin</h2>
      
    </>
  );
};


export default Admin;

Admin.getLayout = (page) => (
    <Layout>
      <AdminNav />
      {page}
    </Layout>
  )