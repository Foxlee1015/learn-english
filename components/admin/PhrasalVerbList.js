import { deleteResource } from "../../utils/apis";
import styled from "styled-components";
import { AdminContentListContainer as Container } from "./common";
import { useEffect, useState } from "react";

const Button = styled.button`
  margin: 5px;
  border: solid 1px black;
  padding: 5px;
`;

const PhrasalVerbList = ({
  data,
  selectedItem,
  setSelectedItem,
  refreshData,
}) => {
  const [verbs, setVerbs] = useState([])
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setVerbs([...new Set(data.map(item => item.verb))])
    }
  }, [data])

  return (
    <Container>
      {verbs.map(verb => (
        <Button key={verb}
          onClick={() => {
            setSelectedItem(data.find(item => item.verb === verb));
          }}
        >{verb}</Button>
      ))}
    </Container>
  );
};

export default PhrasalVerbList;
