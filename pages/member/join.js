import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useInput from "../../hooks/useInput";
import memberStyles from "../../styles/components/Member.module.css";
import { postNewUser } from "../../utils/apis";

const usernameErr =
  "Username must be at 4~10 characters and contain at least one lower case and one digit.";
const matchErr = "Password and Password confirm must match.";
const lengthErr = "Password must be between 8 and 16 characters.";
const lowercaseErr = "Password must contain at least one lower case.";
const uppercaseErr = "Password must contain at least one upper case.";
const digitErr = "Password must contain at least one digit.";
const usernameRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

const Join = ({}) => {
  const router = useRouter();
  const [username, usernameMsg] = useInput("username", "username", "text");
  const [password, _] = useInput("password", "password", "password");
  const [passwordConfirm, passwordMsg] = useInput(
    "confirm password",
    "confirm password",
    "password"
  );
  const [openSubmit, setOpenSubmit] = useState(false);

  useEffect(() => {
    setOpenSubmit(false);
    if (username.value !== "" && password.value !== "") {
      if (usernameMsg.err.length === 0 && passwordMsg.err.length === 0) {
        setOpenSubmit(true);
      }
    }
  }, [usernameMsg.err, passwordMsg.err]);

  const validateUsername = () => {
    if (usernameRegex.test(username.value)) {
      usernameMsg.setErr([]);
      return;
    }
    usernameMsg.setErr([usernameErr]);
  };

  const validatePassword = () => {
    const pwd = password.value;

    if (passwordRegex.test(pwd)) {
      passwordMsg.setErr([]);
      return;
    }
    if (pwd === "") {
      passwordMsg.setErr([]);
      return;
    }

    const errors = [];
    if (pwd.length < 8 || pwd.length > 16) {
      errors.push(lengthErr);
    }
    if (pwd.search(/[a-z]/i) < 0) {
      errors.push(lowercaseErr);
    }
    if (pwd.search(/[A-Z]/) < 0) {
      errors.push(uppercaseErr);
    }
    if (pwd.search(/[0-9]/) < 0) {
      errors.push(digitErr);
    }
    passwordMsg.setErr([...errors]);
  };

  const submit = () => {
    if (openSubmit) {
      postNewUser(
        {
          name: username.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        },
        () => router.push("/member/signin/"),
        (err) => passwordMsg.setErr([err])
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const validatePasswords = () => {
    if (password.value === passwordConfirm.value) {
      passwordMsg.setErr([]);
    } else {
      passwordMsg.setErr([matchErr]);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password.value]);

  return (
    <div className={memberStyles.contianer}>
      <h2 className={memberStyles.title}>Join</h2>
      <input
        {...username}
        className={memberStyles.input}
        onBlur={() => validateUsername()}
      ></input>
      {usernameMsg.err.map((err) => (
        <p className={memberStyles.err} key={err}>
          {err}
        </p>
      ))}
      <input {...password} className={memberStyles.input}></input>
      <input
        {...passwordConfirm}
        className={memberStyles.input}
        onKeyDown={handleKeyDown}
        onBlur={() => validatePasswords()}
      ></input>
      {passwordMsg.err.map((err) => (
        <p className={memberStyles.err} key={err}>
          {err}
        </p>
      ))}
      <button
        type="button"
        className={memberStyles.btn}
        disabled={!openSubmit}
        onClick={(e) => submit(e)}
      >
        Submit
      </button>
    </div>
  );
};

export default Join;
