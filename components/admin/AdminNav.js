import { useState } from "react";
import { Menu } from 'antd';
import Link from "next/link";

import AdminNavStyle from "../../styles/components/AdminNav.module.css";

const AdminNav = () => {
  const [current, setCurrent] = useState("admin");
    return (
      <div className={AdminNavStyle.container}>
        <Menu onClick={(e)=>setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="admin">
            <Link href="/admin/">Admin</Link>
          </Menu.Item>
          <Menu.Item key="admin-phrasal-verbs">
            <Link href="/admin/phrasalVerbs">Phrasal verbs</Link>
          </Menu.Item>
          <Menu.Item key="admin-idioms">
            <Link href="/admin/idioms">Idioms</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
  export default AdminNav;