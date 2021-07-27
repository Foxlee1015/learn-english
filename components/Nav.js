import Link from "next/link";
import navStyles from "../styles/components/Nav.module.css";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/phrasalVerbs">Phrasal verbs</Link>
        </li>
        <li>
          <Link href="/idioms">Idioms</Link>
        </li>
        <li>
          <Link href="/game">Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
