import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { reauthenticate } from '../redux/actions/authActions'

import Nav from "./Nav";
import Meta from "./Meta";
import Footer from "./Footer";
import styles from "../styles/components/Layout.module.css";

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(reauthenticate())
  },[])

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
