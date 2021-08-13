import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { server } from "../../config"

const LikeList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch([]);

  useEffect(()=>{
    doFetchIdioms(`${server}/api/users/likes`);
  },[])

  useEffect(()=>{
    console.log(fetchIdioms.data);
  },[fetchIdioms.data])

  return <>LikeList</>;
};

export default LikeList;
