import LinkCard from "../components/common/LinkCard";
import Homestyles from "../styles/pages/Home.module.css";

const Home = ({}) => {
  return (
    <div className={Homestyles.grid}>
      <LinkCard
        title={"Prasal verbs"}
        desc={
          "A phrasal verb is the combination of two or three words from different grammatical categories – a verb and a particle, such as an adverb or a preposition – to form a single semantic unit on a lexical or syntactic level."
        }
        href={"/phrasalVerbs"}
      />
      <LinkCard
        title={"Idioms"}
        desc={
          "An idiom is a phrase, saying, or a group of words with a metaphorical (not literal) meaning."
        }
        href={"/idioms"}
      />
      <LinkCard
        title={"Prepositions"}
        desc={
          "A preposition is a word or group of words used before a noun, pronoun, or noun phrase to show direction, time, place, location, spatial relationships, or to introduce an object."
        }
        href={"/prepositions"}
        disabled={true}
      />
      <LinkCard
        title={"Quiz"}
        desc={"Prasal verbs / quiz ~~~"}
        href={"/quiz"}
      />
    </div>
  );
};

export default Home;
