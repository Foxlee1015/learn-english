
import { server } from "../../config";
import { DescCard } from "../../components/common";

const Page = ({ idiom }) => {

   return (
   <>
      <h5>{idiom.expression}</h5>
      <DescCard data={idiom.definitions} title={"Definition"} />
      <DescCard data={idiom.sentences} title={"Examples"} />
   </>);
};
 
export async function getStaticPaths() {
   const res = await fetch(`${server}/api/idioms`);
   const data = await res.json()
 
   const paths = data.result.map((idiom) => ({
     params: { expression: idiom.expression.replace(/ /g, "-").toLowerCase() },
   }))
 

   return { paths, fallback: false }
 }
 
export async function getStaticProps({ params }) {
   const res = await fetch(`${server}/api/idioms/?search_key=${params.expression.replace(/-/g, " ") }&exact=1`);
   const data = await res.json()
 
   return { props: { idiom : data.result[0] } }
 }
 
export default Page
