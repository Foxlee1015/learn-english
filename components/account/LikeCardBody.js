
import LikeButton from "../common/LikeButton";
import DescCard from "../common/DescCard";
import LikeListStyles from "../../styles/components/LikeList.module.css";

const LikeCardBody = ({ item, title, resources, showItems, setShowItems, refresh }) => {
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
            successCallback={() => refresh()}
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
  
export default LikeCardBody;