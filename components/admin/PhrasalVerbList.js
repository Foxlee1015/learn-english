import { deleteResource } from "../../utils/apis";

const style = {
  btn: {
    margin: 5,
    border: "solid 1px black",
    padding: 5,
    boxSizing: "border-box",
  },
};

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
          <div style={style.btn}>
            <p>
              {selectedItem._id === item._id && "*"}
              {item.verb}-{item.particle} {item.is_public}
            </p>
            <button
              key={item._id}
              style={style.btn}
              onClick={() => {
                setSelectedItem(item);
              }}
            >
              Edit
            </button>
            <button
              style={style.btn}
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
