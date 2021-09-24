import { useState } from "react";

const useInputSearch = () => {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  return [{
    value,
    placeholder,
    type:"text",
    onChange: (e) => setValue(e.target.value),
  },
  setPlaceholder];
};

export default useInputSearch;

