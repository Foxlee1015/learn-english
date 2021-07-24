import { useState, useEffect } from "react";

const useSelectItem = (data) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setItems(data);
  }, []);

  return {
    items,
    selectedItem,
    setSelectedItem,
  };
};

export default useSelectItem;
