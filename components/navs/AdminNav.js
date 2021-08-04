import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { deauthenticate } from "../../redux/actions/authActions";
import { Menu } from "antd";
import AdminNavStyle from "../../styles/components/AdminNav.module.css";

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

const AdminNav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(router.pathname);
  }, []);

  const handleLogout = () => {
    dispatch(deauthenticate());
    router.push("/");
  };

  return (
    <div className={AdminNavStyle.container}>
      {auth.is_admin === 1 ? (
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
      ) : (
        <p>authenticating...</p>
      )}
    </div>
  );
};
export default AdminNav;
