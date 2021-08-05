import { useState } from "react";

const useInputCheckbox = (name, placeholder, type) => {
  const [value, setValue] = useState("");

  return {
    value,
    name,
    placeholder,
    type,
    onChange: (e) => setValue(e.target.value),
  };
};

export default useInputCheckbox;
