import Meta from "../components/Meta";
import Header from "../components/Header";
import LinkCard from "../components/common/LinkCard";
import Homestyles from "../styles/pages/Home.module.css";

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
  // {
  //   title: "Prepositions",
  //   desc: "A preposition is a word or group of words used before a noun, pronoun, or noun phrase to show direction, time, place, location, spatial relationships, or to introduce an object.",
  //   href: "/prepositions",
  //   disabled: true,
  // },
];

const Home = ({}) => {
  return (
    <>
      <Meta title="Learn English! idioms, phrasal verbs" />
      <Header title="Learn English" />
      <div className={Homestyles.grid}>
        {cards.map(({ title, desc, href, disabled }) => (
          <LinkCard
            key={title}
            title={title}
            desc={desc}
            href={href}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
