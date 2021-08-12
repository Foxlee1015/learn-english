import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useInput from "../../hooks/useInput";
import signinStyles from "../../styles/components/Signin.module.css";
import { postNewUser } from "../../utils/apis";

const Join = ({}) => {
  const router = useRouter();
  const username = useInput("username", "username", "text");
  const password = useInput("password", "password", "password");
  const passwordConfirm = useInput(
    "confirm password",
    "confirm password",
    "password"
  );
  const [errMsg, setErrMsg] = useState("");
  const [openSubmit, setOpenSubmit] = useState(false);

  useEffect(() => {
    setOpenSubmit(false);
    if (username.value !== "" && password.value !== "") {
      if (passwordConfirm.value === password.value) {
        setOpenSubmit(true);
      }
    }
  }, [username.value, password.value, passwordConfirm.value]);

  const submit = () => {
    if (openSubmit) {
      postNewUser(
        {
          name: username.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        },
        () => router.push("/"),
        (err) => setErrMsg(err)
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
      <h2>Join</h2>
      <input {...username} className={signinStyles.input}></input>
      <input {...password} className={signinStyles.input}></input>
      <input
        {...passwordConfirm}
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

export default Join;
