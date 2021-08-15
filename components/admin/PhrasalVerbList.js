const PhrasalVerbList = ({ data, selectedItem, setSelectedItem }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <button
            key={item._id}
            style={{
              margin: 5,
              border: "solid 1px black",
              padding: 5,
              boxSizing: "border-box",
            }}
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            {selectedItem._id === item._id && "*"}
            {item.verb}-{item.particle} {item.is_public}
          </button>
        ))}
    </div>
  );
};

export default PhrasalVerbList;
