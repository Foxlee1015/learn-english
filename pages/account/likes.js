import { LikeList } from "../../components/account";
import ProtectedRoute from "../../HOC/ProtectedRoute";

const Likes = () => {
  return <LikeList />;
};
export default ProtectedRoute(Likes);
