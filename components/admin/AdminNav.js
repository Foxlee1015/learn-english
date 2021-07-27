import Link from "next/link";
import { useState } from "react";
import adminNavStyles from "../../styles/components/AdminNav.module.css";

const AdminNav = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/admin/">Admin</Link>
          </li>
          <li>
            <Link href="/admin/phrasalVerbs">Phrasal verbs</Link>
          </li>
          <li>
            <Link href="/admin/idioms">Idioms</Link>
          </li>
          <li>
            <Link href="/admin/prepositions">Prepositions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
