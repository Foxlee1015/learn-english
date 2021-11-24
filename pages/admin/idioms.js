import { useState, useEffect } from "react";
import { IdiomForm, IdiomList } from "../../components/admin";
import ProtectedRoute from "../../HOC/ProtectedRoute";
import { useFetch } from "../../hooks";

import { AdminContainer as Container } from "../../components/admin/common";
const Idioms = () => {

  const [selectedIdiom, setSelectdIdiom] = useState(null);
  const [fetchIdioms, doFetchIdioms] = useFetch([]);

  useEffect(() => {
    refreshIdioms()
  }, []);

  const refreshIdioms = () => {
    doFetchIdioms("idioms/");
  }


  return (
    <Container>
      <IdiomForm selectedIdiom={selectedIdiom} setSelectdIdiom={setSelectdIdiom} refresh={refreshIdioms} />
      <IdiomList selectedIdiom={selectedIdiom} setSelectdIdiom={setSelectdIdiom} data={fetchIdioms.data} />
    </Container>
  );
};
export default ProtectedRoute(Idioms);
