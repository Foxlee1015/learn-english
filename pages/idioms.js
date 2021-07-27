import Meta from "../components/Meta";
import Header from "../components/Header";
import IdiomList from "../components/IdiomList";

const idioms = () => {
  return (
    <>
      <Meta title="Idiom list" />
      <Header title="Idioms" />
      <IdiomList />
    </>
  );
};

export default idioms;
