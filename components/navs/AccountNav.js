import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu } from "antd";
import AdminNavStyle from "../../styles/components/AdminNav.module.css";

const routes = [{ key: "/", href: "/", text: "Home" }];

const AccountNav = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(router.pathname);
  }, []);

  return (
    <div className={AdminNavStyle.container}>
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
      </Menu>
    </div>
  );
};
export default AccountNav;
