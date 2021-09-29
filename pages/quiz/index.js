import styled from "styled-components";
import { useRouter } from "next/router";
import { FlexCenterBox } from "../../styles/common-styles";

const btnLinks = [
  { url: "/quiz/phrasalverb", text: "Phrasal Verbs" },
  { url: "/quiz/idioms", text: "Idioms" },
];

const Container = styled.div`
  ${FlexCenterBox}
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button`
  ${FlexCenterBox}
  margin: 20px 0;
  padding: 20px;
  width: 200px;
  height: 80px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary[700]};
  background: ${({ theme }) => theme.colors.primary[50]};

  :hover {
    color: ${({ theme }) => theme.colors.common.white};
    background: ${({ theme }) => theme.colors.primary[200]};
  }

  ${(props) => props.theme.media.tablet`
    margin: 15px 0;
    padding: 15px;
    width: 180px;
    height: 70px;
    border-radius: 8px;
  `}
  ${(props) => props.theme.media.phone`
    margin: 10px 0;
    padding: 10px;
    width: 160px;
    height: 60px;
    border-radius: 6px;
  `}
`;

const Quiz = ({}) => {
  const router = useRouter();

  return (
    <Container>
      {btnLinks.map((btnLink) => (
        <Button
          key={btnLink.url}
          type="button"
          onClick={() => router.push(btnLink.url)}
        >
          {btnLink.text}
        </Button>
      ))}
    </Container>
  );
};

export default Quiz;
