import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";

import { Menu } from 'antd';
import AdminNavStyle from "../../styles/components/AdminNav.module.css";

const AdminNav = () => {
  
  const router = useRouter()
  const [current, setCurrent] = useState("");

  useEffect(()=>{
    setCurrent(router.pathname)
  },[])
    return (
      <div className={AdminNavStyle.container}>
        <Menu onClick={(e)=>setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="/admin">
            <Link href="/admin/">Admin</Link>
          </Menu.Item>
          <Menu.Item key="/admin/phrasalVerbs">
            <Link href="/admin/phrasalVerbs">Phrasal verbs</Link>
          </Menu.Item>
          <Menu.Item key="/admin/idioms">
            <Link href="/admin/idioms">Idioms</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
  export default AdminNav;