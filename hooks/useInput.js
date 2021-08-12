import { useState } from "react";

const useInput = (name, placeholder, type) => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState([]);

  return [
    {
      value,
      name,
      placeholder,
      type,
      onChange: (e) => setValue(e.target.value),
    },
    { err, setErr },
  ];
};

export default useInput;
