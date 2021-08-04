import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/Loading"));

const ProtectedRoute = (ProtectedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const auth = useSelector((state) => state.auth);
      if (auth.loggedIn === null) {
        return <DynamicComponent />;
      }
      if (auth.loggedIn) {
        if (Router.pathname.includes("admin")) {
          if (auth.is_admin === 1) {
            return <ProtectedComponent {...props} />;
          } else {
            Router.replace("/");
            return null;
          }
        }
        return <ProtectedComponent {...props} />;
      } else {
        Router.replace("/");
        return null;
      }
    }
    return null;
  };
};
export default ProtectedRoute;
