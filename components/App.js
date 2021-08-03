import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reauthenticate } from "../redux/actions/authActions";

const App = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(reauthenticate());
    console.log("test");
  }, []);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return children;
};

export default App;
