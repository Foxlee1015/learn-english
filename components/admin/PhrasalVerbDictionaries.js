import styled from "styled-components";
import { Button } from "antd";
import { useEffect, useState } from "react";


const DictionaryContainer = styled.div`
  margin-bottom: 10px;
`;

const DictionarySubTitle = styled.p`
  margin-bottom: 4px;
`;

const DictionaryDesc = styled.p`
  margin-bottom: 2px;
`;

const PhrasalVerbDictionaries = ({
  data
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => { setShow(false) }, [data])

  return (
    <DictionaryContainer>
      <Button type="primary" onClick={() => setShow(!show)} >
        Show Definitions and Examples from dictionaries
      </Button>
      {show && (
        <>
          <DictionarySubTitle>Definitions</DictionarySubTitle>
          {data.definitions && data.definitions.map((sentence, index) => (
            <DictionaryDesc key={`${sentence}${index}`}>{sentence}</DictionaryDesc>))}
          <DictionarySubTitle>Examples</DictionarySubTitle>
          {data.examples && data.examples.map((sentence, index) => (
            <DictionaryDesc key={`${sentence}${index}`}>{sentence}</DictionaryDesc>))}
        </>
      )}
    </DictionaryContainer>
  );
};

export default PhrasalVerbDictionaries;
