import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deauthenticate } from "../../redux/actions/authActions";
import { Menu } from "antd";

const routes = [
  { key: "/", href: "/", text: "Home" },
  { key: "/admin", href: "/admin", text: "Admin" },
  {
    key: "/admin/phrasalVerbs",
    href: "/admin/phrasalVerbs",
    text: "Phrasal verbs",
  },
  { key: "/admin/idioms", href: "/admin/idioms", text: "Idioms" },
];

const Container = styled.div`
  width: 100%;
`;

const AdminNav = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(router.pathname);
  }, []);

  const handleLogout = () => {
    router.push("/");
    dispatch(deauthenticate());
  };

  return (
    <Container>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
      >
        {routes.map((route) => (
          <Menu.Item key={route.key}>
            <Link href={route.href}>{route.text}</Link>
          </Menu.Item>
        ))}
        <Menu.Item key="logout" style={{ marginLeft: "auto" }}>
          <button onClick={() => handleLogout()}>Logout</button>
        </Menu.Item>
      </Menu>
    </Container>
  );
};
export default AdminNav;
