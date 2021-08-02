import { Provider } from "react-redux";
import { useStore } from "../redux";

import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/styles.css";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
