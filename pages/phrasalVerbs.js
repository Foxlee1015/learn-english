import Meta from "../components/Meta";
import PhrasalVerbList from "../components/PhrasalVerbList";
import Header from "../components/Header";
import { server } from "../config";
import { createQueryParams } from "../utils/utils";
import { useEffect } from "react";

const phrasalVerbs = ({ originData }) => {

  useEffect(()=>{
    console.log('1', originData)
  }, [])
  return (
    <>
      <Meta title="Phrasal Verb list" />
      <Header title="Phrasal Verbs" />
      <PhrasalVerbList data={originData} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const params = createQueryParams({
      only_verb: 1,
    });
    const res = await fetch(`${server}/api/phrasal-verbs/?${params}`);
    const data = await res.json();
    const phrasalVerbs = data.result.map((verb) => ({ verb }));

    
    console.log('0', phrasalVerbs)

    return {
      props: {
        originData: phrasalVerbs,
      },
    };
  } catch {
    return {
      props: {
        originData: [],
      },
    };
  }
};

export default phrasalVerbs;
