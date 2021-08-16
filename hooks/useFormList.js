import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useFormList = (url) => {
  const [fetch, doFetch] = useFetch([]);
  const [selectedItem, setSelectedItem] = useState({});

  const loadPhrasalVerbs = () => {
    setSelectedItem({});
    doFetch(url);
  };

  useEffect(() => {
    loadPhrasalVerbs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedItem]);

  return {
    data: fetch.data,
    selectedItem,
    setSelectedItem,
    refreshData: loadPhrasalVerbs,
  };
};

export default useFormList;
