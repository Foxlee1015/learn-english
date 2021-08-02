import { useState } from "react";

const useInput = (name, placeholder, type) => {
  const [value, setValue] = useState("");

  return {
    value,
    name,
    placeholder,
    type,
    onChange: (e) => setValue(e.target.value),
  };
};

export default useInput;
