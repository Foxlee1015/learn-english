import { IdiomForm, IdiomList } from "../../components/admin";
import ProtectedRoute from "../../HOC/ProtectedRoute";

import { AdminContainer as Container } from "../../components/admin/common";
const Idioms = () => {
  return (
    <Container>
      <IdiomForm />
      <IdiomList />
    </Container>
  );
};
export default ProtectedRoute(Idioms);
