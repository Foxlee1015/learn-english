import styled from "styled-components";
import { replaceText } from "../../utils/utils";
import Tag from "./Tag";

const Text = styled.p``;

const SentenceCard = ({ data, title, replaceToBlank = "" }) => {
  return (
    <>
      <Tag text={title} />
      {data.length > 0 ? (
        data.map((text) => (
          <Text key={text}>
            {replaceToBlank !== ""
              ? replaceText(text, replaceToBlank, "____")
              : text}
          </Text>
        ))
      ) : (
        <Text>No {title} yet...</Text>
      )}
    </>
  );
};

export default SentenceCard;
