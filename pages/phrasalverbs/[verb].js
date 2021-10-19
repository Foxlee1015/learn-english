
import { server } from "../../config";
import { DescCard } from "../../components/common";
import { Meta } from "../../components";
import { useState, useEffect } from "react";

const Page = ({ phrasalVerbs }) => {
   const [selectedPhrasalVerb, setSelectedPhrasalVerb] = useState(null);

   useEffect(() => {
      if (phrasalVerbs.length > 0) {
         setSelectedPhrasalVerb(phrasalVerbs[0])
      }
   }, [phrasalVerbs])

   return (<>
      <Meta title={`Learn English - phrasal verb ${phrasalVerbs[0].verb} ${phrasalVerbs[0].particle}`} />
      {selectedPhrasalVerb && (
         <>
            <h5>{phrasalVerbs[0].verb}</h5>
            {phrasalVerbs.map((phrasalVerb) => (
               <>
                  <span key={phrasalVerb.particle} onClick={() => { setSelectedPhrasalVerb(phrasalVerb) }}>{phrasalVerb.particle}</span>
               </>
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
   const res = await fetch(`${server}/api/phrasal-verbs/`);
   const data = await res.json()

   const paths = data.result.map((verb) => ({
      params: { verb },
   }))

   return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
   const phrasalVerb = `${params['verb']}-${params['particle'].replaceAll(" ", "-")}`
   const res = await fetch(`${server}/api/phrasal-verbs/?${phrasalVerb}`);
   const data = await res.json()

   return { props: { phrasalVerbs: data.result } }
}

export default Page