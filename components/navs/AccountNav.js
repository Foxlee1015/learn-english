import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { Menu } from "antd";

const routes = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/account",
    text: "Mypage",
  },
  {
    href: "/account/likes",
    text: "Study",
  },
];

const Container = styled.div`
  width: 100%;
`;

const AccountNav = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(router.pathname);
  }, []);

  return (
    <Container>
      <Menu
        onClick={(e) => setCurrent(e.href)}
        selectedKeys={[current]}
        mode="horizontal"
      >
        {routes.map((route) => (
          <Menu.Item key={route.href}>
            <Link href={route.href}>{route.text}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Container>
  );
};
export default AccountNav;
