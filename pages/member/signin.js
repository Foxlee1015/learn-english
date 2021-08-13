import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { authenticate } from "../../redux/actions/authActions";
import useInput from "../../hooks/useInput";
import ErrorMessage from "../../components/member/ErrorMessage";

import memberStyles from "../../styles/components/Member.module.css";

const Signin = ({}) => {
  const router = useRouter();
  const [username, _] = useInput("username", "username", "text");
  const [password, passwordMsg] = useInput("password", "password", "password");
  const [openSubmit, setOpenSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateValues = () => {
    if (username.value !== "" && password.value !== "") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (validateValues()) {
      setOpenSubmit(true);
    } else {
      setOpenSubmit(false);
    }
  }, [username.value, password.value]);

  const submit = async () => {
    if (openSubmit) {
      setLoading(true);
      dispatch(
        authenticate(
          {
            username: username.value,
            password: password.value,
          },
          () => router.push("/"),
          (err) => passwordMsg.setErr([err]),
          () => setLoading(false)
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
      <ErrorMessage errors={passwordMsg.err} />
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

export default Signin;
