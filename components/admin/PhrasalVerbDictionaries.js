import styled from "styled-components";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { CopyTwoTone } from "@ant-design/icons";


const DictionaryContainer = styled.div`
  margin-bottom: 10px;
`;

const DictionarySubTitle = styled.p`
  margin-bottom: 4px;
`;

const CopyIcon = styled(CopyTwoTone)`
  margin-bottom: 0px;
`

const DictionaryDesc = styled.p`
  font-size: 12px;
  margin-bottom: 0px;
`;


const TextWithCopyIcon = ({ text }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <DictionaryDesc>{text}<CopyIcon onClick={() => handleClick()} /></DictionaryDesc>
  )
}

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
            <TextWithCopyIcon key={`${sentence}${index}`} text={sentence} />))}
          <DictionarySubTitle>Examples</DictionarySubTitle>
          {data.examples && data.examples.map((sentence, index) => (
            <TextWithCopyIcon key={`${sentence}${index}`} text={sentence} />))}
        </>
      )}
    </DictionaryContainer>
  );
};

export default PhrasalVerbDictionaries;
