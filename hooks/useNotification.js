import { useState } from "react";

const useNotification = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  return {
    text,
    setText,
    open,
    setOpen,
  };
};

export default useNotification;
