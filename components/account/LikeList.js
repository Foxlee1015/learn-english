import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

import LikeListStyles from "../../styles/components/LikeList.module.css";
import LikeCardHead from "./LikeCardHead";
import LikeCardBody from "./LikeCardBody"


const LikeList = () => {
  const [fetchData, doFetchData] = useFetch({});
  const [showVerbs, setShowVerbs] = useState([]);
  const [showIdioms, setShowIdioms] = useState([]);

  useEffect(() => {
    refreshData()
  }, []);

  const refreshData = () => {
    doFetchData(`users/likes`);
  }

  return (
    <>
      <LikeCardHead 
        title={"Phrasal verbs"}
        href={"/phrasalVerbs"}
      />
      {fetchData.loading && <p>loading...</p>}
      {fetchData.data.phrassal_verbs && fetchData.data.phrassal_verbs.length > 0 && (
        <div className={LikeListStyles.grid}>
          {fetchData.data.phrassal_verbs.map((item) => (
              <LikeCardBody
                key={item._id}
                item={item}
                title={`${item.verb}-${item.particle}`}
                resources={"phrasal-verbs"}
                showItems={showVerbs}
                setShowItems={setShowVerbs}
                refresh={refreshData}
              />
            ))}
        </div>
      )}
      <LikeCardHead 
        title={"Idioms"}
        href={"/idioms"}
      />
      {fetchData.loading && <p>loading...</p>}
      {fetchData.data.idioms && fetchData.data.idioms.length > 0 && (
        <div className={LikeListStyles.grid}>
          {fetchData.data.idioms.map((item) => (
              <LikeCardBody
                key={item._id}
                item={item}
                title={item.expression}
                resources={"idioms"}
                showItems={showIdioms}
                setShowItems={setShowIdioms}
                refresh={refreshData}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default LikeList;

