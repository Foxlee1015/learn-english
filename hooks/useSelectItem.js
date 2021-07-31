import { useState, useEffect } from "react";

const useSelectItem = (data, sortKey) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setItems([...data]);
    }
  }, [data]);

  return {
    items,
    setItems,
    selectedItem,
    setSelectedItem,
    sortKey,
  };
};

export default useSelectItem;
