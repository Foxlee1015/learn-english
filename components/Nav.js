import Link from "next/link";
import navStyles from "../styles/components/Nav.module.css";

const routes = [
  { href: "/", text: "Home" },
  { href: "/phrasalVerbs", text: "Phrasal verbs" },
  { href: "/idioms", text: "Idioms" },
  { href: "/quiz", text: "Quiz" },
  { href: "/admin", text: "Admin" },
];

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        {routes.map((route) => (
          <li className={navStyles.linkText}>
            <Link href={route.href}>{route.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
