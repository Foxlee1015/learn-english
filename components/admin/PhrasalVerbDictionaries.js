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

const DictionarySrcTag = styled.span`
`


const dictionaries = [
  {
    'dict_key': "dict_cambridge",
    'src': 'Cambridge',
  },
  {
    'dict_key': "dict_merriam",
    'src': 'Merriam',
  },
  {
    'dict_key': "dict_oxford",
    'src': 'Oxford',
  }
]

const DictDesc = ({ src, data }) => {
  return (
    <>
      {data.map(text => (<DictionaryDesc key={text}>{text}<DictionarySrcTag>{" -"}{src}</DictionarySrcTag></DictionaryDesc>))}
    </>
  )
}

const PhrasalVerbDictionaries = ({
  data
}) => {
  return (
    <DictionaryContainer>
      <DictionaryTitle>Dictionary</DictionaryTitle>
      <DictionarySubTitle>Definitions</DictionarySubTitle>
      {dictionaries.map(({ src, dict_key }) => (
        data[dict_key] && (
          <DictDesc key={src} src={src} data={data[dict_key].definitions} />
        )
      ))}
      <DictionarySubTitle>Examples</DictionarySubTitle>
      {dictionaries.map(({ src, dict_key }) => (
        data[dict_key] && (
          <DictDesc key={src} src={src} data={data[dict_key].examples} />
        )
      ))}
    </DictionaryContainer>
  );
};

export default PhrasalVerbDictionaries;
