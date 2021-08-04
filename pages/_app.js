import { Provider } from "react-redux";
import { useStore } from "../redux";

import ProtectedRoute from "../HOC/ProtectedRoute"
import App from "../components/App";
import Layout from "../components/layouts/Layout";
import AdminLayout from "../components/layouts/AdminLayout";
import AccountLayout from "../components/layouts/AccountLayout";

import "../styles/globals.css";
import "../styles/styles.css";

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

  return (
    <Provider store={store}>
      <App>{getLayout(<Component {...pageProps} />)}</App>
    </Provider>
  );
}
