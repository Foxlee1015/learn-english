import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
