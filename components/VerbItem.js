import verbStyles from "../styles/Verb.module.css";

// particle = adverb or preposition
const VerbItem = ({ verb, particles }) => {
  console.log(verb, particles);
  return (
    <a className={verbStyles.card}>
      <h3>{verb}</h3>
      {Object.keys(particles).map((particle) => (
        <>
          <p>{particle}</p>
          {particles[particle].map((example) => (
            <p>{example}</p>
          ))}
        </>
      ))}
    </a>
  );
};

export default VerbItem;
