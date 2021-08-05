import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { authenticate, reauthenticate } from "../../redux/actions/authActions";
import useInput from "../../hooks/useInput";

import signinStyles from "../../styles/components/Signin.module.css";

const Signin = ({}) => {
  const router = useRouter();
  const username = useInput("username", "username", "text");
  const password = useInput("password", "password", "password");
  const [errMsg, setErrMsg] = useState("");
  const [openSubmit, setOpenSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (username.value !== "" && password.value !== "") {
      setOpenSubmit(true);
    } else {
      setOpenSubmit(false);
    }
  }, [username.value, password.value]);

  const submit = () => {
    if (username.value !== "" && password.value !== "") {
      dispatch(
        authenticate(
          {
            username: username.value,
            password: password.value,
          },
          () => {
            router.push("/");
        },
          (err) => setErrMsg(err)
        )
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <>
      <h2>Signin</h2>
      <input {...username} className={signinStyles.input}></input>
      <input
        {...password}
        className={signinStyles.input}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        type="button"
        className={signinStyles.btn}
        disabled={!openSubmit}
        onClick={(e) => submit(e)}
      >
        Submit
      </button>
      {errMsg}
    </>
  );
};

export default Signin;
