import { useState, useEffect } from "react";

const useSelectItem = (data) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data.result && data.result.length > 0) {
      setItems([...data.result]);
    }
  }, [data]);

  return {
    items,
    setItems,
  };
};

export default useSelectItem;
