import Link from "next/link";
import { useRouter } from "next/router";
import navStyles from "../../styles/components/Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  reauthenticate,
  deauthenticate,
} from "../../redux/actions/authActions";
import { useEffect } from "react";
import ButtonLink from "../common/ButtonLink";

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

  useEffect(() => {
    dispatch(reauthenticate());
  }, []);

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
          <ButtonLink style={navStyles.linkText} href={"/admin"} text={"Admin"} />
        )}
        {auth.loggedIn ? (
          <>        
            <ButtonLink style={navStyles.linkText} href={"/account"} text={"Mypage"} />
            <ButtonLink style={navStyles.linkText} onClick={handleLogout} text={"Logout"} />
          </>
        ) : (
          <>
          <ButtonLink style={navStyles.linkText} href={"/member/signin"} text={"Signin"} />
          <ButtonLink style={navStyles.linkText} href={"/member/join"} text={"Join"} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
