import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu } from "antd";
import AdminNavStyle from "../../styles/components/AdminNav.module.css";

const routes = [
  { 
    href: "/", 
    text: "Home" 
  },{ 
    href: "/account", 
    text: "Mypage" 
  },{
    href: "/account/likes",
    text: "Study",
  }];

const AccountNav = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(router.pathname);
  }, []);

  return (
    <div className={AdminNavStyle.container}>
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
    </div>
  );
};
export default AccountNav;
