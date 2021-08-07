import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reauthenticate } from "../redux/actions/authActions";

const AuthLoadingComponents = dynamic(() =>
  import("../components/AuthLoading")
);

const ProtectedRoute = (ProtectedComponent) => {
  return (props) => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
      if (auth.loggedIn) {
        // redux
        setVerified(true);
      } else {
        // directly access to the page
        dispatch(
          reauthenticate(
            () => setVerified(true),
            () => Router.replace("/member/signin")
          )
        );
      }
    }, []);

    if (verified) {
      if (Router.pathname.includes("admin")) {
        if (auth.is_admin === 1) {
          return <ProtectedComponent {...props} />;
        } else {
          Router.replace("/403");
        }
      }
      if (Router.pathname.includes("account")) {
        return <ProtectedComponent {...props} />;
      }
      return <AuthLoadingComponents />;
    }

    // authenticating
    if (auth.loggedIn) {
      // loading indicator - redux store login state
      return null;
    }
    return <AuthLoadingComponents />; // show only directly access to the pages // re-auth lading indicator
  };
};

export default ProtectedRoute;
