import { useState, useEffect } from "react";

const initialValues = {
  username: "",
  password: "",
};

const Signin = ({}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onFinish = (e) => {
    console.log(values);
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
      ></input>
      <button type="button" onClick={(e) => onFinish(e)}>
        Submit
      </button>
    </>
  );
};

export default Signin;
