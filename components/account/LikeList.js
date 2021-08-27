import { useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import { LikeCardHead, LikeCardBody } from "../account";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-bottom: 40px;
  padding: 10px;

  ${(props) => props.theme.media.desktop`
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    margin-bottom: 30px;
  `}

  ${(props) => props.theme.media.tablet`
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-bottom: 30px;
  `}
  ${(props) => props.theme.media.phone`
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    margin-bottom: 20px;
  `}
`;

const LikeList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch({});
  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch({});
  const [showVerbs, setShowVerbs] = useState([]);
  const [showIdioms, setShowIdioms] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    doFetchIdioms(`users/idioms`);
    doFetchPhrasalVerbs(`users/phrasal-verbs`);
  };

  useEffect(() => {
    console.log(fetchPhrasalVerbs.data, fetchIdioms.data);
  }, [fetchPhrasalVerbs, fetchIdioms]);

  return (
    <>
      <LikeCardHead title={"Phrasal verbs"} href={"/phrasalVerbs"} />
      {fetchPhrasalVerbs.loading && <p>loading...</p>}
      {fetchPhrasalVerbs.data && fetchPhrasalVerbs.data.length > 0 && (
        <Container>
          {fetchPhrasalVerbs.data.map((item) => (
            <LikeCardBody
              key={item._id}
              item={item}
              title={`${item.verb}-${item.particle}`}
              resources={"phrasal-verbs"}
              showItems={showVerbs}
              setShowItems={setShowVerbs}
              refresh={refreshData}
            />
          ))}
        </Container>
      )}
      <LikeCardHead title={"Idioms"} href={"/idioms"} />
      {fetchIdioms.loading && <p>loading...</p>}
      {fetchIdioms.data && fetchIdioms.data.length > 0 && (
        <Container>
          {fetchIdioms.data.map((item) => (
            <LikeCardBody
              key={item._id}
              item={item}
              title={item.expression}
              resources={"idioms"}
              showItems={showIdioms}
              setShowItems={setShowIdioms}
              refresh={refreshData}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default LikeList;
