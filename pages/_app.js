import { Provider } from "react-redux";
import { useStore } from "../redux";

import Layout from "../components/layouts/Layout";
import "../styles/globals.css";
import "../styles/styles.css";
import ProtectedRoute from "../HOC/ProtectedRoute"
import App from "../components/App";
import AdminLayout from "../components/layouts/AdminLayout";
import AccountLayout from "../components/layouts/AccountLayout";

export default function MyApp({ Component, pageProps, router: { route } }) {
  const store = useStore(pageProps.initialReduxState);

  const getLayout = (page) => {
    let LayoutComponent = Layout;
    if (route.includes("admin")) {
      LayoutComponent = ProtectedRoute(AdminLayout);
    } else if (route.includes("account")) {
      LayoutComponent = ProtectedRoute(AccountLayout);
    }
    return <LayoutComponent>{page}</LayoutComponent>;
  };

  // const getLayout = getDefaultLayout || ((page) => page);

  return (
    <Provider store={store}>
      <App>{getLayout(<Component {...pageProps} />)}</App>
    </Provider>
  );
}
