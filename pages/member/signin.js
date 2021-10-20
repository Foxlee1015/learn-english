import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../../redux/actions/authActions";
import { useInput } from "../../hooks";
import {
  ErrorMessage,
  MemberInput as Input,
  MemberContainer as Container,
  SubmitButton,
} from "../../components/member";

const Signin = ({ }) => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
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
    if (auth.is_admin === 1) {
      router.push("/admin")
    } else if (auth.loggedIn) {
      router.push("/")
    }

  }, [auth])

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
    <Container title={"Signin"}>
      <Input inputAttrs={username} label={"Username"} />
      <Input
        inputAttrs={password}
        label={"Password"}
        onKeyDown={handleKeyDown}
      />
      <ErrorMessage errors={passwordMsg.err} />
      <SubmitButton
        disabled={!openSubmit || loading}
        onClick={(e) => submit(e)}
        text={loading ? "loading..." : "Submit"}
      />
    </Container>
  );
};

export default Signin;
