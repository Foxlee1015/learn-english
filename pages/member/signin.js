import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from '../../redux/actions/authActions'

const initialValues = {
  username: "",
  password: "",
};

const Signin = ({}) => {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(()=>{
    if (auth.loggedIn) {
      router.push("/");
    }
  },[auth])

  const submit = () => {
    if (values.username !== "" && values.password !== "") {
      dispatch(authenticate(values));
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

export default Signin;
