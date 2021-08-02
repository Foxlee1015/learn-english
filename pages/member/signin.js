import { useState, useEffect } from "react";
import { connect } from "react-redux";
// import Cookies from "universal-cookie";
import { authenticate } from "../../redux/actions/authActions";
// import { server } from "../../config";
import { useRouter } from "next/router";

const initialValues = {
  username: "",
  password: "",
};

const Signin = ({}) => {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submit = () => {
    if (values.username !== "" && values.password !== "") {
      authenticate(values);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  // const userLogin = async (values) => {
  //   const res = await fetch(`${server}/api/sessions/`, {
  //     body: JSON.stringify(values),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   });

  //   const response = await res.json();
  //   if (response && response.result) {
  //     const cookies = new Cookies();
  //     cookies.set("EID_SES", response.result, {
  //       path: "/",
  //       maxAge: 60 * 60 * 24,
  //     });
  //     router.push("/");
  //   }
  // };

  return (
    <>
      <h2>Signin</h2>
      <input
        name="username"
        placeholder="username"
        type="text"
        onChange={handleChange}
      ></input>
      <input
        name="password"
        placeholder="password"
        type="password"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></input>
      <button type="button" onClick={(e) => submit(e)}>
        Submit
      </button>
    </>
  );
};

export default connect((state) => state, { authenticate })(Signin);
