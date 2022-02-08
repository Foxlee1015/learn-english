
import { server } from "../../config";
import { DescCard } from "../../components/common";
import { Meta } from "../../components";

const Page = ({ phrasalVerb }) => {
   return (<>
      <Meta title={`Learn English - phrasal verb ${phrasalVerb.phrasal_verb}`} />
      <h5>{phrasalVerb.phrasal_verb.toUpperCase()}</h5>
      <div>
         <DescCard data={phrasalVerb.definitions} title={"Definition"} />
         <DescCard data={phrasalVerb.sentences} title={"Examples"} />
      </div>

   </>);
};

export async function getStaticPaths() {
   const res = await fetch(`${server}/api/phrasal-verbs/`);
   const data = await res.json()

   const paths = data.result.map(({ phrasal_verb }) => {
      const phrasalverb = `${phrasal_verb.replace(" ", "-")}`
      return ({
         params: { phrasalverb },
      })
   }
   )

   return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
   const res = await fetch(`${server}/api/phrasal-verbs/${params.phrasalverb}`);
   const data = await res.json()

   return { props: { phrasalVerb: data.result[0] } }
}

export default Page