import Meta from "../components/Meta";
import VerbList from "../components/Verblist";
import Header from "../components/Header";
import { server } from "../config";

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
  const res = await fetch(`${server}/api/phrasal-verbs/`);
  const data = await res.json();
  const phrasalVerbs = data.result;

  return {
    props: {
      phrasalVerbs,
    },
  };
};

export default phrasalVerbs;
