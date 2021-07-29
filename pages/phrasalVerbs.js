import Meta from "../components/Meta";
import VerbList from "../components/Verblist";
import Header from "../components/Header";
import { server } from "../config";

const phrasalVerbs = ({phrasalVerbs}) => {
  return (
    <>
      <Meta title="Phrasal Verb list" />
      <Header title="Phrasal Verbs" />
      <VerbList data={phrasalVerbs} />
    </>
  );
};

export const getStaticProps = async () => {
  let params = { "only_verb": 1}; 
  let query = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

  const res = await fetch(`${server}/api/phrasal-verbs/?${query}`);
  const phrasalVerbs = await res.json();

  return {
    props: {
      phrasalVerbs,
    },
  };
};

export default phrasalVerbs;
