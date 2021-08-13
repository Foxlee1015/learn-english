import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const LikeList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch({});

  useEffect(()=>{
    doFetchIdioms(`users/likes`);
  },[])
  
  return (<>
    <div>
      <h3>Phrasal verbs</h3>
      <div>
        {fetchIdioms.loading && <p>loading...</p>}
        {fetchIdioms.data.phrassal_verbs && fetchIdioms.data.phrassal_verbs.map(item=>(
          <p key={item._id}>{item.verb}-{item.particle}</p>
        ))}
      </div>
    </div>
    <div>
      <h3>Idioms</h3>
      <div>
        {fetchIdioms.loading && <p>loading...</p>}
        {fetchIdioms.data.idioms && fetchIdioms.data.idioms.map(item=>(
          <p key={item._id}>{item.expression}</p>
        ))}
      </div>
    </div>
  </>);
};

export default LikeList;
