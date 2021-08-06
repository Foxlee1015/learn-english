import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const LoadingComponent = dynamic(() => import("../components/Loading"));

const ProtectedRoute = (ProtectedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const auth = useSelector((state) => state.auth);
      if (auth.loggedIn === null) {
        return <LoadingComponent />;
      }
      if (Router.pathname.includes("admin")) {
        if (auth.is_admin === 1) {
          return <ProtectedComponent {...props} />;
        } else {
          Router.replace("/403");
          return null;
        }
      } else {
        if (auth.loggedIn) {
          return <ProtectedComponent {...props} />;
        } else {
          Router.replace("/401");
          return null;
        }
      }
    }
    return null;
  };
};
export default ProtectedRoute;
