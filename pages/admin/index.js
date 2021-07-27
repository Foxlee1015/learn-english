import Layout from "../../components/Layout";
import AdminNav from "../../components/AdminNav"

const Index = ({}) => {
  return (
    <>
      <h2>admin</h2>
      
    </>
  );
};


export default Index;

Index.getLayout = (page) => (
    <Layout>
      <AdminNav />
      {page}
    </Layout>
  )