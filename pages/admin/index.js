import Layout from "../../components/Layout";
import AdminNav from "../../components/AdminNav"

const Index = ({}) => {
  return (
    <>
      <h2>admin</h2>
      
    </>
  );
};


Index.displayName = 'admin';
Index.getLayout = (page) => (
    <Layout>
      <AdminNav />
      {page}
    </Layout>
  )

  
export default Index;