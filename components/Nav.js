import Link from "next/link";
import navStyles from "../styles/components/Nav.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { deauthenticate } from '../redux/actions/authActions'

const routes = [
  { href: "/", text: "Home" },
  { href: "/phrasalVerbs", text: "Phrasal verbs" },
  { href: "/idioms", text: "Idioms" },
  { href: "/quiz", text: "Quiz" },
  // { href: "/admin", text: "Admin" },
];

const Nav = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  return (
    <nav className={navStyles.nav}>
      <ul>
        {routes.map((route) => (
          <li key={route.text} className={navStyles.linkText}>
            <Link href={route.href}>{route.text}</Link>
          </li>
        ))}
      </ul>
      {auth.loggedIn ? (
        <button className={navStyles.linkText} onClick={()=>dispatch(deauthenticate())}>
          Logout
        </button>
      ) : (
        <button className={navStyles.linkText}>
          <Link href={'/member/signin'}>Signin</Link>
        </button>
      )}
      
    </nav>
  );
};

export default Nav;
