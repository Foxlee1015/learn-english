import { Meta, Header, PhrasalVerbList } from "../components";
import { server } from "../config";

const phrasalverb = ({ data }) => {
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
    const res = await fetch(`${server}/api/verbs/`);
    const data = await res.json();
    const phrasalverb = data.result.map((verb) => ({ verb }));

    return {
      props: {
        data: phrasalverb,
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

export default phrasalverb;
