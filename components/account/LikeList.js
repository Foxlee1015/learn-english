import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LikeButton from "../common/LikeButton";
import DescCard from "../common/DescCard";

import LikeListStyles from "../../styles/components/LikeList.module.css";

const LikeList = () => {
  const [fetchData, doFetchData] = useFetch({});
  const [showVerbs, setShowVerbs] = useState([]);
  const [showIdioms, setShowIdioms] = useState([]);

  useEffect(() => {
    doFetchData(`users/likes`);
  }, []);

  return (
    <>
      <h3>Phrasal verbs</h3>
      <div className={LikeListStyles.grid}>
        {fetchData.loading && <p>loading...</p>}
        {fetchData.data.phrassal_verbs &&
          fetchData.data.phrassal_verbs.map((item) => (
            <LikeCard
              key={item._id}
              item={item}
              title={`${item.verb}-${item.particle}`}
              resources={"phrasal-verbs"}
              showItems={showVerbs}
              setShowItems={setShowVerbs}
            />
          ))}
      </div>
      <h3>Idioms</h3>
      <div className={LikeListStyles.grid}>
        {fetchData.loading && <p>loading...</p>}
        {fetchData.data.idioms &&
          fetchData.data.idioms.map((item) => (
            <LikeCard
              key={item._id}
              item={item}
              title={item.expression}
              resources={"idioms"}
              showItems={showIdioms}
              setShowItems={setShowIdioms}
            />
          ))}
      </div>
    </>
  );
};

export default LikeList;

const LikeCard = ({ item, title, resources, showItems, setShowItems }) => {
  const handleClick = (_id) => {
    if (showItems.includes(_id)) {
      const newItems = showItems.filter((item) => item !== _id);
      setShowItems([...newItems]);
    } else {
      setShowItems([...showItems, _id]);
    }
  };

  return (
    <div
      className={`${LikeListStyles.container} ${
        showItems.includes(item._id) && LikeListStyles.open
      }`}
      key={item._id}
    >
      <div className={LikeListStyles.head}>
        <LikeButton
          active
          resources={resources}
          _id={item._id}
          successCallback={() => doFetchData(`users/likes`)}
        />
        <h5 className={LikeListStyles.title}>{title}</h5>
        <button
          onClick={() => {
            handleClick(item._id, showItems, setShowItems);
          }}
        >
          <p className={LikeListStyles.text}>
            {showItems.includes(item._id) ? "hide" : "more"}
          </p>
        </button>
      </div>
      {showItems.includes(item._id) && (
        <div className={LikeListStyles.descBox}>
          <DescCard data={item.definitions} title={"Definition"} />
          <DescCard data={item.sentences} title={"Examples"} />
        </div>
      )}
    </div>
  );
};
