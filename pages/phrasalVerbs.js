import { Meta, Header, PhrasalVerbList } from "../components";
import { server } from "../config";
import { createQueryParams } from "../utils/utils";

const phrasalVerbs = ({ data }) => {
  return (
    <>
      <Meta title="Phrasal Verb list" />
      <Header title="Phrasal Verbs" />
      <PhrasalVerbList data={data} />
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

    return {
      props: {
        data: phrasalVerbs,
      },
    };
  } catch {
    return {
      props: {
        data: [],
      },
    };
  }
};

export default phrasalVerbs;
