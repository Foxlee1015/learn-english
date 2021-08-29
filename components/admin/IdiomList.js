import { useEffect } from "react";
import { useFetch } from "../../hooks";
import styled from "styled-components";
import { AdminContentListContainer as Container } from "./common";

const Button = styled.button`
  margin: 5px;
  border: solid 1px black;
  padding: 5px;
`;

const IdiomList = () => {
  const [fetchIdioms, doFetchIdioms] = useFetch([]);

  useEffect(() => {
    doFetchIdioms("idioms/");
  }, []);

  return (
    <Container>
      {fetchIdioms.data &&
        fetchIdioms.data.length > 0 &&
        fetchIdioms.data.map((item) => (
          <Button key={item._id}>{item.expression}</Button>
        ))}
    </Container>
  );
};

export default IdiomList;
