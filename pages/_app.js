import { Provider } from "react-redux";
import { useStore } from "../redux";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import AdminNav from "../components/admin/AdminNav";
import "../styles/globals.css";
import "../styles/styles.css";

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        {asPath.includes("/admin") && <AdminNav />}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
