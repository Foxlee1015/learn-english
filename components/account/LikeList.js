import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import LikeButton from "../common/LikeButton";

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
          <div key={item._id}>
            <p>{item.verb}-{item.particle}</p>
            <div>
              <LikeButton 
                active
                resources="phrasal-verbs"
                resource_id="phrasal_verb_id"
                _id={item._id}
                callback={()=>doFetchIdioms(`users/likes`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h3>Idioms</h3>
      <div>
        {fetchIdioms.loading && <p>loading...</p>}
        {fetchIdioms.data.idioms && fetchIdioms.data.idioms.map(item=>(
          <div key={item._id}>
            <p>{item.expression}</p>
            <div>
              <LikeButton 
                  active
                  resources="idioms"
                  resource_id="idiom_id" 
                  _id={item._id}
                  callback={()=>doFetchIdioms(`users/likes`)}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  </>);
};

export default LikeList;
