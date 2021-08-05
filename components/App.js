import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reauthenticate } from "../redux/actions/authActions";

const App = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reauthenticate());
  }, []);

  return children;
};

export default App;
