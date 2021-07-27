import { useEffect, useState } from "react";
import styles from "../../styles/components/SelectItem.module.css";
import LoadingIndicator from "./LoadingIndicator";

const SelectItem = ({
  items,
  selectedItem,
  setSelectedItem,
  sort = "desc",
}) => {
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    setSortedItems([...items].sort());
  }, [items]);

  useEffect(() => {
    if (sortedItems.length === 0) {
      setSelectedItem("");
    } else if (selectedItem === "") {
      setSelectedItem(sortedItems[0]);
    }
  }, [sortedItems, setSelectedItem]);

  return (
    <div className={styles.scrollableContainer}>
      <LoadingIndicator />
      <div className={styles.scrollable}>
        {sortedItems.length > 0 &&
          sortedItems.map((item) => (
            <button
              className={`${styles.item} ${
                selectedItem === item && styles.checked
              }`}
              key={item}
              onClick={() => {
                setSelectedItem(item);
              }}
            >
              {item}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SelectItem;
