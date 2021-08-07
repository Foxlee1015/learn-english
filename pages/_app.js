import { Provider } from "react-redux";
import { useStore } from "../redux";

import ProtectedRoute from "../HOC/ProtectedRoute"
import Layout from "../components/layouts/Layout";
import AdminLayout from "../components/layouts/AdminLayout";
import AccountLayout from "../components/layouts/AccountLayout";
import ErrorLayout from "../components/layouts/ErrorLayout";

import "../styles/globals.css";
import "../styles/styles.css";

const errorPages = ["/401", "/403", "/404", "/500"]

export default function MyApp({ Component, pageProps, router: { route } }) {
  const store = useStore(pageProps.initialReduxState);

  const getLayout = (page) => {
    let LayoutComponent = Layout;
    
    if (errorPages.includes(route)) {
      LayoutComponent = ErrorLayout
    } else if (route.includes("admin")) {
      LayoutComponent = ProtectedRoute(AdminLayout);
    } else if (route.includes("account")) {
      LayoutComponent = ProtectedRoute(AccountLayout);
    }
    return <LayoutComponent>{page}</LayoutComponent>;
  };

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
