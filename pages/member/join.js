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
  const [errMsg, setErrMsg] = useState([]);
  const [openSubmit, setOpenSubmit] = useState(false);

  useEffect(() => {
    setOpenSubmit(false);
    if (username.value !== "" && password.value !== "") {
      if (passwordConfirm.value === password.value) {
        setOpenSubmit(true);
      }
    }
  }, [username.value, password.value, passwordConfirm.value]);

  function validatePassword() {
    const errors = [];

    if (password.value === "") {
      setErrMsg([]);
      return;
    }
    if (password.value.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (password.value.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (password.value.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    setErrMsg([...errors]);
  }

  const submit = () => {
    if (openSubmit && errMsg.length === 0) {
      postNewUser(
        {
          name: username.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        },
        () => router.push("/member/signin/"),
        (err) => setErrMsg([err])
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const validatePasswords = () => {
    const matchErr = "password and password confirm must match.";
    if (password.value === passwordConfirm.value) {
      setErrMsg([]);
    } else {
      setErrMsg([matchErr]);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password.value]);

  return (
    <>
      <h2>Join</h2>
      <input {...username} className={signinStyles.input}></input>
      <input {...password} className={signinStyles.input}></input>
      <input
        {...passwordConfirm}
        className={signinStyles.input}
        onKeyDown={handleKeyDown}
        onBlur={() => validatePasswords()}
      ></input>
      <button
        type="button"
        className={signinStyles.btn}
        disabled={!openSubmit}
        onClick={(e) => submit(e)}
      >
        Submit
      </button>
      {errMsg.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </>
  );
};

export default Join;
