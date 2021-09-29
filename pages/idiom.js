import { Meta, Header, IdiomList } from "../components";
import { server } from "../config";

const idioms = ({ data }) => {
  return (
    <>
      <Meta title="Idiom list" />
      <Header title="Idioms" />
      <IdiomList idiomList={data} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const res = await fetch(`${server}/api/idioms`);
    const data = await res.json();
    const idioms = data.result;

    return {
      props: {
        data: idioms,
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

export default idioms;
