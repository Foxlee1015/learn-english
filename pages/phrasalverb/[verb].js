
import { server } from "../../config";
import { DescCard } from "../../components/common";
import { useState } from "react";
import { useEffect } from "react";

const Page = ({ data }) => {
   const [selectedPhrasalVerb, setSelectedPhrasalVerb] = useState(null);

   useEffect(()=>{
      if (data && data.result && data.result.length > 0) {
         setSelectedPhrasalVerb(data.result[0])
      }
   }, [data])

   return (<>
      {data.result && data.result.length > 0 && (
         <>
         <h5>{data.result[0].verb}</h5>
         {data.result.map((phrasalVerb) => (
            <span key={phrasalVerb.particle} onClick={()=>{setSelectedPhrasalVerb(phrasalVerb)}}>{phrasalVerb.particle}</span>
         ))}
         {selectedPhrasalVerb && (
            <div key={selectedPhrasalVerb.particle}>
               <DescCard data={selectedPhrasalVerb.definitions} title={"Definition"} />
               <DescCard data={selectedPhrasalVerb.sentences} title={"Examples"} />
            </div>
         )}
         </>
      )}
   </>);
};
export async function getServerSideProps(ctx) {
   const res = await fetch(`${server}/api/phrasal-verbs/?search_key=${ctx.query.verb}`);
   const data = await res.json()

   return { props: { data } }
 }
 
 export default Page