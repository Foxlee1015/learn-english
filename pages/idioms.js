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
  const idioms = await res.json();

  return {
    props: {
      idioms,
    },
  };
};

export default idioms;
