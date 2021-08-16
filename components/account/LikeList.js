import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

import LikeListStyles from "../../styles/components/LikeList.module.css";
import LikeCardHead from "./LikeCardHead";
import LikeCardBody from "./LikeCardBody";

const LikeList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch({});
  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch({});
  const [showVerbs, setShowVerbs] = useState([]);
  const [showIdioms, setShowIdioms] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    doFetchIdioms(`users/idioms`);
    doFetchPhrasalVerbs(`users/phrasal-verbs`);
  };

  return (
    <>
      <LikeCardHead title={"Phrasal verbs"} href={"/phrasalVerbs"} />
      {fetchPhrasalVerbs.loading && <p>loading...</p>}
      {fetchPhrasalVerbs.data && fetchPhrasalVerbs.data.length > 0 && (
        <div className={LikeListStyles.grid}>
          {fetchPhrasalVerbs.data.map((item) => (
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
      <LikeCardHead title={"Idioms"} href={"/idioms"} />
      {fetchIdioms.loading && <p>loading...</p>}
      {fetchIdioms.data && fetchIdioms.data.length > 0 && (
        <div className={LikeListStyles.grid}>
          {fetchIdioms.data.map((item) => (
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
