import { deleteResource } from "../../utils/apis";

const PhrasalVerbList = ({
  data,
  selectedItem,
  setSelectedItem,
  refreshData,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <div>
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
            <button
              onClick={() => {
                deleteResource("phrasal-verbs", item._id, refreshData);
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default PhrasalVerbList;
