import Nav from "../navs/Nav";
import Meta from "../Meta";
import Footer from "../Footer";
import styles from "../../styles/components/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
