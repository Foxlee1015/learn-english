import Meta from "../components/Meta";
import VerbList from "../components/Verblist";
import Header from "../components/Header";
import { server } from "../config";
import { createQueryParams } from "../utils/utils";

const phrasalVerbs = ({ phrasalVerbs }) => {
  return (
    <>
      <Meta title="Phrasal Verb list" />
      <Header title="Phrasal Verbs" />
      <VerbList data={phrasalVerbs} />
    </>
  );
};

export const getStaticProps = async () => {
  const params = createQueryParams({
    only_verb: 1,
  });
  const res = await fetch(`${server}/api/phrasal-verbs/?${params}`);
  const data = await res.json();
  const phrasalVerbs = data.result.map(verb=>({"verb":verb}));


  return {
    props: {
      phrasalVerbs,
    },
  };
};

export default phrasalVerbs;
