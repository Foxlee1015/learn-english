import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import styles from "../../styles/components/SelectItem.module.css";

const stringSort = (sortKey) => (a, b) => {
  if (a[sortKey] < b[sortKey]) return -1;
  if (a[sortKey] > b[sortKey]) return 1;
  return 0;
};

const SelectItem = ({
  items,
  sortKey,
  selectedItem,
  setSelectedItem,
  loading,
}) => {
  const [sortedItems, setSortedItems] = useState([]);

  useEffect(() => {
    const sorted = items.sort(stringSort(sortKey));
    setSortedItems([...sorted]);
  }, [items]);

  const selectFristElementIfNotExist = () => {
    if (
      selectedItem === "" ||
      !sortedItems.find((item) => item["_id"] == selectedItem)
    ) {
      setSelectedItem(sortedItems[0]["_id"]);
    }
  };

  useEffect(() => {
    if (sortedItems.length > 0) {
      selectFristElementIfNotExist();
    }
  }, [sortedItems]);

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.scrollable}>
        {sortedItems.length === 0 && loading && <BarLoader color="#0070f3" />}
        {sortedItems.length > 0 &&
          sortedItems.map((item) => (
            <button
              className={`${styles.item} ${
                item["_id"] === selectedItem && styles.checked
              }`}
              key={item["_id"]}
              onClick={() => {
                setSelectedItem(item[["_id"]]);
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
