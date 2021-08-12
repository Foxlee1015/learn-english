import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { authenticate } from "../../redux/actions/authActions";
import useInput from "../../hooks/useInput";

import memberStyles from "../../styles/components/Member.module.css";

const Signin = ({}) => {
  const router = useRouter();
  const [username, _] = useInput("username", "username", "text");
  const [password, passwordMsg] = useInput("password", "password", "password");
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
          (err) => passwordMsg.setErr([err])
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
    <div className={memberStyles.contianer}>
      <h2 className={memberStyles.title}>Signin</h2>
      <input {...username} className={memberStyles.input}></input>
      <input
        {...password}
        className={memberStyles.input}
        onKeyDown={handleKeyDown}
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

export default Signin;
