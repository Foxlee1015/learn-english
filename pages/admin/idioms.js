import { useState } from "react";
import { IdiomForm, IdiomList } from "../../components/admin";
import ProtectedRoute from "../../HOC/ProtectedRoute";

import { AdminContainer as Container } from "../../components/admin/common";
const Idioms = () => {

  const [selectedIdiom, setSelectdIdiom] = useState(null);
  return (
    <Container>
      <IdiomForm selectedIdiom={selectedIdiom} setSelectdIdiom={setSelectdIdiom} />
      <IdiomList selectedIdiom={selectedIdiom} setSelectdIdiom={setSelectdIdiom} />
    </Container>
  );
};
export default ProtectedRoute(Idioms);
