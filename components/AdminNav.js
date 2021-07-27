import Link from "next/link";
import navStyles from "../styles/components/Nav.module.css";

const AdminNav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/admin/">Phrasal verbs</Link>
        </li>
        <li>
          <Link href="/admin/phrasalVerbs">Phrasal verbs</Link>
        </li>
        <li>
          <Link href="/admin/idioms">Idioms</Link>
        </li>
        <li>
          <Link href="/admin/prepositions">Prepositions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
