import styled from "styled-components";


const DictionaryContainer = styled.div`
  margin-bottom: 10px;
`;
const DictionaryTitle = styled.p`
  margin-bottom: 6px;
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
  console.log(data)
  return (
    <DictionaryContainer>
      <DictionaryTitle>Dictionary</DictionaryTitle>
      <DictionarySubTitle>Definitions</DictionarySubTitle>
      {data.definitions && data.definitions.map((sentence, index) => (
        <DictionaryDesc key={`${sentence}${index}`}>{sentence}</DictionaryDesc>))}
      <DictionarySubTitle>Examples</DictionarySubTitle>
      {data.examples && data.examples.map((sentence, index) => (
        <DictionaryDesc key={`${sentence}${index}`}>{sentence}</DictionaryDesc>))}
    </DictionaryContainer>
  );
};

export default PhrasalVerbDictionaries;
