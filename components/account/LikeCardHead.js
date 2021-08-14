import LinkButton from "../common/LinkButton"
import LikeListStyles from "../../styles/components/LikeList.module.css";

const LikeCardHead = ({title="", href=""}) => {
    return (
      <div className={LikeListStyles.subHead}>
        <h3 className={LikeListStyles.subTitle}>{title}</h3>
        <LinkButton text={`Check out all the ${title}`} href={href} />
      </div>
    )}
export default LikeCardHead