import styled from "styled-components";
import { Meta, Header } from "../components";
import { LinkCard } from "../components/common";
import { LikeCount } from "../components/account";

const cards = [
  {
    title: "Phrasal verbs",
    desc: "A phrasal verb is the combination of two or three words from different grammatical categories – a verb and a particle, such as an adverb or a preposition – to form a single semantic unit on a lexical or syntactic level.",
    href: "/phrasalVerbs",
  },
  {
    title: "Idioms",
    desc: "An idiom is a phrase, saying, or a group of words with a metaphorical (not literal) meaning.",
    href: "/idioms",
  },
  { title: "Quiz", desc: "Prasal verbs / Idioms quiz", href: "/quiz" },
  {
    title: "My page",
    desc: "Check out my study list",
    href: "/account/likes",
    actionText: "Go to My page!",
    Component: LikeCount,
    authRequired: true,
  },
];

const Container = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  ${(props) => props.theme.media.desktop` 
    grid-template-columns: repeat(2, 1fr);
  `}
  ${(props) => props.theme.media.tablet`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

const Home = ({}) => {
  return (
    <>
      <Meta title="Learn English! idioms, phrasal verbs" />
      <Header title="Learn English" />
      <Container>
        {cards.map((data) => (
          <LinkCard key={data.title} {...data} />
        ))}
      </Container>
    </>
  );
};

export default Home;
