import Layout from "../components/Layout";
import AdminNav from "../components/admin/AdminNav";
import "../styles/globals.css";
import "../styles/styles.css";

import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  return (
    <Layout>
      {asPath.includes("/admin") && <AdminNav />}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
