import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useInput } from "../../hooks";
import memberStyles from "../../styles/components/Member.module.css";
import { postNewUser } from "../../utils/apis";
import ErrorMessage from "../../components/member/ErrorMessage";
import Input from "../../components/member/Input";

const usernameErr =
  "Username must be 4~10 characters and contain only lower cases and digits.";
const matchErr = "Password and Password confirm must match.";
const lengthErr = "Password must be between 8 and 16 characters.";
const lowercaseErr = "Password must contain at least one lower case.";
const uppercaseErr = "Password must contain at least one upper case.";
const digitErr = "Password must contain at least one digit.";
const usernameRegex = /^[a-z0-9]{4,10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

const Join = ({}) => {
  const router = useRouter();
  const [username, usernameMsg] = useInput("username", "username", "text");
  const [password, passwordMsg] = useInput("password", "password", "password");
  const [passwordConfirm, passwordConfirmMsg] = useInput(
    "confirm password",
    "password confirm",
    "password"
  );
  const [openSubmit, setOpenSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [joinResult, setJoinResult] = useState("");

  useEffect(() => {
    setOpenSubmit(false);
    const values = [username.value, password.value, passwordConfirm.value];
    const errCounts = [
      usernameMsg.err.length,
      passwordMsg.err.length,
      passwordConfirmMsg.err.length,
    ];

    if (
      joinResult === "" &&
      !values.includes("") &&
      errCounts.every((cnt) => cnt === 0)
    ) {
      setOpenSubmit(true);
    }
  }, [usernameMsg, passwordMsg, passwordConfirmMsg, joinResult]);

  useEffect(() => {
    setJoinResult("");
  }, [password.value, passwordConfirm.value, username.value]);

  useEffect(() => {
    validatePasswords("");
  }, [password.value, passwordConfirm.value]);

  const validateUsername = () => {
    const name = username.value;
    if (name === "" || usernameRegex.test(name)) {
      usernameMsg.setErr([]);
      return;
    }
    usernameMsg.setErr([usernameErr]);
  };

  const validatePassword = () => {
    const pwd = password.value;

    if (pwd === "" || passwordRegex.test(pwd)) {
      passwordMsg.setErr([]);
      return;
    }
    const errors = [];
    if (pwd.length < 8 || pwd.length > 16) {
      errors.push(lengthErr);
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push(lowercaseErr);
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push(uppercaseErr);
    }
    if (pwd.search(/[0-9]/) < 0) {
      errors.push(digitErr);
    }
    passwordMsg.setErr([...errors]);
  };

  const submit = async () => {
    if (openSubmit) {
      setLoading(true);
      await postNewUser(
        {
          name: username.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        },
        () => router.push("/member/signin/"),
        (err) => setJoinResult(err)
      );
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const validatePasswords = () => {
    if (
      password.value !== "" &&
      passwordConfirm.value !== "" &&
      password.value !== passwordConfirm.value
    ) {
      passwordConfirmMsg.setErr([matchErr]);
    } else {
      passwordConfirmMsg.setErr([]);
    }
  };

  return (
    <div className={memberStyles.contianer}>
      <h2 className={memberStyles.title}>Join</h2>
      <Input
        inputAttrs={username}
        label={"Username"}
        onBlur={validateUsername}
      />
      <ErrorMessage errors={usernameMsg.err} />
      <Input
        inputAttrs={password}
        label={"Password"}
        onBlur={validatePassword}
      />
      <Input
        inputAttrs={passwordConfirm}
        label={"Password confirm"}
        onKeyDown={handleKeyDown}
      />
      <ErrorMessage errors={passwordMsg.err} />
      <ErrorMessage errors={passwordConfirmMsg.err} />
      {joinResult !== "" && <ErrorMessage errors={[joinResult]} />}
      <button
        type="button"
        className={memberStyles.btn}
        disabled={!openSubmit}
        onClick={(e) => submit(e)}
      >
        {loading ? "loading..." : "Submit"}
      </button>
    </div>
  );
};

export default Join;
