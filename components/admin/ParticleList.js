import { useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks";
import { createQueryParams } from "../../utils/utils";
import { AdminContentListContainer as Container } from "./common";

const Button = styled.button`
  margin: 5px;
  border: solid 1px black;
  padding: 5px;
`;

const ParticleList = ({
  verb,
  particle,
  setParticle
}) => {
  const [fetchParticles, doFetchParticles] = useFetch([])

  useEffect(() => {
    print(verb)
    if (verb !== "") {
      doFetchParticles(`phrasal-verbs/${verb}`);
    }
  }, [verb])

  return (
    <Container>
      {fetchParticles.data && fetchParticles.data.map(item => (
        <Button key={item.particle}
          onClick={() => {
            setParticle(item.particle)
          }}
        >{item.particle}</Button>
      ))}
    </Container>
  );
};

export default ParticleList;
