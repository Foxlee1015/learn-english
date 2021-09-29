
import { server } from "../../config";
import { DescCard } from "../../components/common";

const Page = ({ data }) => {

   return (
   <>
      {data.result && data.result.length > 0 && (
         <>
            <h5>{data.result[0].expression}</h5>
            <DescCard data={data.result[0].definitions} title={"Definition"} />
            <DescCard data={data.result[0].sentences} title={"Examples"} />
         </>
      )}
   </>);
};
export async function getServerSideProps(ctx) {

   let searchKey = ctx.query.expression
   const res = await fetch(`${server}/api/idioms/?search_key=${searchKey.replace(/-/g, " ")}&exact=1`);
   const data = await res.json()

   return { props: { data } }
 }
 
 export default Page