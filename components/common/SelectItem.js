import styles from "../../styles/SelectItem.module.css";

const SelectItem = ({
  items,
  selectedItem,
  setSelectedItem,
  disableItems = [],
}) => {
  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.scrollable}>
        {items.length > 0 &&
          items.map((item) => (
            <div className={styles.item} key={item}>
              <button
                className={selectedItem === item ? styles.bold : styles.text}
                onClick={() => {
                  setSelectedItem(item);
                }}
                disabled={disableItems.includes(item)}
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
