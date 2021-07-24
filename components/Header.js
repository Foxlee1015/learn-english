import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Phrasal </span> Verbs
      </h1>
      <p className={headerStyles.description}>
        They are inherently idiomatic and cannot be easily understood by the
        individual words that make up the phrase
      </p>
    </div>
  );
};

export default Header;
