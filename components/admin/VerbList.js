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

const VerbList = ({
  setVerb
}) => {
  const [fetchVerbs, doFetchVerbs] = useFetch([])

  useEffect(() => {
    const params = createQueryParams({
      only_verb: 1
    });
    doFetchVerbs(`phrasal-verbs/?${params}`);
  }, [])

  return (
    <Container>
      {fetchVerbs.data && fetchVerbs.data.map(item => (
        <Button key={item}
          onClick={() => {
            setVerb(item)
          }}
        >{item}</Button>
      ))}
    </Container>
  );
};

export default VerbList;
