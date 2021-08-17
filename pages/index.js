import Meta from "../components/Meta";
import Header from "../components/Header";
import LinkCard from "../components/common/LinkCard";
import Homestyles from "../styles/pages/Home.module.css";
import LikeCount from "../components/account/LikeCount";

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

const Home = ({}) => {
  return (
    <>
      <Meta title="Learn English! idioms, phrasal verbs" />
      <Header title="Learn English" />
      <div className={Homestyles.grid}>
        {cards.map((data) => (
          <LinkCard key={data.title} {...data} />
        ))}
      </div>
    </>
  );
};

export default Home;
