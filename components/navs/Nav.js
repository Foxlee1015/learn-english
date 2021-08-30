import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  reauthenticate,
  deauthenticate,
} from "../../redux/actions/authActions";
import { LinkButton } from "../common";
import { FlexCenterBox } from "../../styles/common-styles";

const routes = [
  { href: "/", text: "Home" },
  { href: "/phrasalVerbs", text: "Phrasal verbs" },
  { href: "/idioms", text: "Idioms" },
  { href: "/quiz", text: "Quiz" },
];

export const Container = styled.nav`
  ${FlexCenterBox}
  height: 80px;
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.common.black};
  color: ${({ theme }) => theme.colors.common.white};
  ${(props) => props.theme.media.tablet`  
    height: 70px;
  `}
  ${(props) => props.theme.media.phone`
    height: 60px;
  `}
`;

const ListWrapper = styled.ul`
  ${FlexCenterBox}
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListSubWrpper = styled.div`
  margin-left: auto;
`;

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
    <Container>
      <ListWrapper>
        {routes.map((route) => (
          <li key={route.text}>
            <LinkButton href={route.href} text={route.text} />
          </li>
        ))}
      </ListWrapper>
      <ListSubWrpper>
        {auth.is_admin === 1 && <LinkButton href={"/admin"} text={"Admin"} />}
        {auth.loggedIn ? (
          <>
            <LinkButton href={"/account"} text={"Mypage"} />
            <LinkButton onClick={handleLogout} text={"Logout"} />
          </>
        ) : (
          <>
            <LinkButton href={"/member/signin"} text={"Signin"} />
            <LinkButton href={"/member/join"} text={"Join"} />
          </>
        )}
      </ListSubWrpper>
    </Container>
  );
};

export default Nav;
