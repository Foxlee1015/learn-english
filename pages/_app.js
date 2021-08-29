import { Provider } from "react-redux";
import { useStore } from "../redux";
import GlobalStyle from "../styles/global-styles";
import { ThemeProvider } from "../styles/themed-components";
import theme from "../styles/theme";

import ProtectedRoute from "../HOC/ProtectedRoute";
import {
  Layout,
  AdminLayout,
  AccountLayout,
  ErrorLayout,
} from "../components/layouts";
import "../styles/styles.css";
import { css } from "@emotion/react";

const errorPages = ["/401", "/403", "/404", "/500"];

export default function MyApp({ Component, pageProps, router: { route } }) {
  const store = useStore(pageProps.initialReduxState);

  const getLayout = (page) => {
    let LayoutComponent = Layout;

    if (errorPages.includes(route)) {
      LayoutComponent = ErrorLayout;
    } else if (route.includes("admin")) {
      LayoutComponent = ProtectedRoute(AdminLayout);
    } else if (route.includes("account")) {
      LayoutComponent = ProtectedRoute(AccountLayout);
    }
    return <LayoutComponent>{page}</LayoutComponent>;
  };

  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>
    </>
  );
}
