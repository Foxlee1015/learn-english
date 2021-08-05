import { useEffect, useState } from "react";
import styles from "../../styles/components/SelectItem.module.css";
import LoadingIndicator from "./LoadingIndicator";

const stringSort = (sortKey) => (a, b) => {
  if (a[sortKey] < b[sortKey]) return -1;
  if (a[sortKey] > b[sortKey]) return 1;
  return 0;
};

const SelectItem = ({ items, sortKey, selectedItem, setSelectedItem }) => {
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const sorted = items.sort(stringSort(sortKey));
    setSortedItems([...sorted]);
  }, [items]);

  const selectFristElementIfNotExist = () => {
    if (
      selectedItem === "" ||
      !sortedItems.find((item) => item[sortKey] == selectedItem)
    ) {
      setSelectedItem(sortedItems[0][sortKey]);
    }
  };

  useEffect(() => {
    if (sortedItems.length > 0) {
      selectFristElementIfNotExist();
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
                item[sortKey] === selectedItem && styles.checked
              }`}
              key={item[sortKey]}
              onClick={() => {
                setSelectedItem(item[[sortKey]]);
              }}
            >
              {item[sortKey]}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SelectItem;
