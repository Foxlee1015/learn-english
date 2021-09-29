
import { server } from "../../config";
import { DescCard } from "../../components/common";
import { useState } from "react";
import { useEffect } from "react";

const Page = ({ phrasalVerbs }) => {
   const [selectedPhrasalVerb, setSelectedPhrasalVerb] = useState(null);

   useEffect(()=>{
      if (phrasalVerbs.length > 0) {
         setSelectedPhrasalVerb(phrasalVerbs[0])
      }
   }, [phrasalVerbs])

   return (<>
      {phrasalVerbs.length > 0 && (
         <>
         <h5>{phrasalVerbs[0].verb}</h5>
         {phrasalVerbs.map((phrasalVerb) => (
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

export async function getStaticPaths() {
   const res = await fetch(`${server}/api/phrasal-verbs/?only_verb=1`);
   const data = await res.json()
 
   const paths = data.result.map((verb) => ({
     params: { verb },
   }))
 
   return { paths, fallback: false }
 }
 
export async function getStaticProps({ params }) {
   const res = await fetch(`${server}/api/phrasal-verbs/?search_key=${params.verb}&exact=1`);
   const data = await res.json()
   
   return { props: { phrasalVerbs : data.result } }
 }
 
export default Page