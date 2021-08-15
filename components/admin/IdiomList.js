import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const IdiomList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch([]);

  useEffect(() => {
    doFetchIdioms("idioms/");
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {fetchIdioms.data &&
        fetchIdioms.data.length > 0 &&
        fetchIdioms.data.map((item) => (
          <button
            key={item._id}
            style={{
              margin: 5,
              border: "solid 1px black",
              padding: 5,
              boxSizing: "border-box",
            }}
          >
            {item.expression}
          </button>
        ))}
    </div>
  );
};

export default IdiomList;
