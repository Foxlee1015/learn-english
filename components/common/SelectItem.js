import { useEffect, useState } from "react";
import styles from "../../styles/SelectItem.module.css";

const SelectItem = ({
  items,
  selectedItem,
  setSelectedItem,
  disableItems = [],
  sort = "desc",
}) => {
  const [sortedItems, setSortedItems] = useState(items);

  useEffect(() => {
    setSortedItems([...items].sort());
  }, [sort]);

  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.scrollable}>
        {sortedItems.length > 0 &&
          sortedItems
            .filter((item) => !disableItems.includes(item))
            .map((item) => (
              <div className={styles.item} key={item}>
                <button
                  className={selectedItem === item && styles.bold}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                >
                  {item}
                </button>
              </div>
            ))}
        {disableItems.length > 0 &&
          disableItems.map((item) => (
            <div className={styles.item} key={item}>
              <button className={styles.text} disabled>
                {item}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectItem;
