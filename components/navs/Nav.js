import Link from "next/link";
import { useRouter } from "next/router";
import navStyles from "../../styles/components/Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deauthenticate } from "../../redux/actions/authActions";

const routes = [
  { href: "/", text: "Home" },
  { href: "/phrasalVerbs", text: "Phrasal verbs" },
  { href: "/idioms", text: "Idioms" },
  { href: "/quiz", text: "Quiz" },
];

const Nav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(deauthenticate());
    router.push("/");
  };

  return (
    <nav className={navStyles.nav}>
      <ul>
        {routes.map((route) => (
          <li key={route.text} className={navStyles.linkText}>
            <Link href={route.href}>{route.text}</Link>
          </li>
        ))}
      </ul>
      <div className={navStyles.buttons}>
        {auth.is_admin === 1 && (
          <button className={navStyles.linkText}>
          <Link href={"/admin"}>Admin</Link>
        </button>
        )}
        {auth.loggedIn ? (
          <>
            <button className={navStyles.linkText}>
              <Link href={"/account"}>Mypage</Link>
            </button>
            <button
              className={navStyles.linkText}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </>
        ) : (
          <button className={navStyles.linkText}>
            <Link href={"/member/signin"}>Signin</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
