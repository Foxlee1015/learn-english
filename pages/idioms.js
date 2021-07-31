import Meta from "../components/Meta";
import Header from "../components/Header";
import IdiomList from "../components/IdiomList";
import { useEffect } from "react";
import { server } from "../config";

const idioms = ({ idioms }) => {
  return (
    <>
      <Meta title="Idiom list" />
      <Header title="Idioms" />
      <IdiomList data={idioms} />
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/idioms`);
  const data = await res.json();
  const idioms = data.result;

  return {
    props: {
      idioms,
    },
  };
};

export default idioms;
