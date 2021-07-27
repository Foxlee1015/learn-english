import Layout from "../components/Layout";
import AdminNav from "../components/admin/AdminNav";
import "../styles/globals.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  // const [currentUrl, setCurrentUrl] = useState("/");

  // useEffect(() => {
  //   console.log(router.asPath);
  // }, [router.asPath]);

  // useEffect(() => {
  //   console.log(currentUrl);
  //   console.log(currentUrl.includes("/admin"));
  // }, [currentUrl]);

  return (
    <Layout>
      {asPath.includes("/admin") && <AdminNav />}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
