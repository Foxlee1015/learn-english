import { useEffect, useState } from "react";
import PhrasalVerbForm from "../../components/admin/PhrasalVerbForm";
import PhrasalVerbList from "../../components/admin/PhrasalVerbList";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";
import useFetch from "../../hooks/useFetch";

const PhrasalVerbs = () => {
  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch([]);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    doFetchPhrasalVerbs("phrasal-verbs/");
  }, []);

  return (
    <div className={AdminStyle.container}>
      <PhrasalVerbForm
        data={fetchPhrasalVerbs.data}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <PhrasalVerbList
        data={fetchPhrasalVerbs.data}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};

export default PhrasalVerbs;
