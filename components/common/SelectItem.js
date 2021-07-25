import { useEffect, useState } from "react";
import styles from "../../styles/SelectItem.module.css";

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
    if (sortedItems.length > 0) {
      setSelectedItem(sortedItems[0]);
    }
  }, [sortedItems]);

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.scrollable}>
        {sortedItems.length > 0 &&
          sortedItems.map((item) => (
            <div className={styles.item} key={item}>
              <button
                className={selectedItem === item ? styles.bold : ""}
                onClick={() => {
                  setSelectedItem(item);
                }}
              >
                {item}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectItem;
