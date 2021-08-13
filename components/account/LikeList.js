import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const LikeList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch([]);

  useEffect(()=>{
    doFetchIdioms(`users/likes`);
  },[])

  useEffect(()=>{
    console.log(fetchIdioms.data);
  },[fetchIdioms.data])

  return <>LikeList</>;
};

export default LikeList;
