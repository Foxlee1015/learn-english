import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const PhrasalVerbList = () => {
  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch([]);

  useEffect(() => {
    doFetchPhrasalVerbs("phrasal-verbs/");
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {fetchPhrasalVerbs.data &&
        fetchPhrasalVerbs.data.length > 0 &&
        fetchPhrasalVerbs.data.map((item) => (
          <button
            key={item._id}
            style={{
              margin: 5,
              border: "solid 1px black",
              padding: 5,
              boxSizing: "border-box",
            }}
          >
            {item.verb}
          </button>
        ))}
    </div>
  );
};

export default PhrasalVerbList;
