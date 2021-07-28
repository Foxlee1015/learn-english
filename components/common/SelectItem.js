import { useEffect, useState } from "react";
import styles from "../../styles/components/SelectItem.module.css";
import LoadingIndicator from "./LoadingIndicator";

const stringSort = (a, b) => {
  if (a[sortKey] < b[sortKey]) return -1;
  if (a[sortKey] > b[sortKey]) return 1;
  return 0;
};

const SelectItem = ({
  items,
  sort = "desc",
  sortKey = "expression",
  selectedItem,
  setSelectedItem,
}) => {
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const sorted = items.sort(stringSort);
    setSortedItems([...sorted]);
  }, [items]);

  useEffect(() => {
    if (sortedItems.length === 0) {
      setSelectedItem("");
    } else if (selectedItem === "") {
      setSelectedItem(sortedItems[0]._id);
    }
  }, [sortedItems]);

  return (
    <div className={styles.scrollableContainer}>
      <LoadingIndicator />
      <div className={styles.scrollable}>
        {sortedItems.length > 0 &&
          sortedItems.map((item) => (
            <button
              className={`${styles.item} ${
                item._id === selectedItem && styles.checked
              }`}
              key={item._id}
              onClick={() => {
                setSelectedItem(item._id);
              }}
            >
              {item.expression}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SelectItem;
