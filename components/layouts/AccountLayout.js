import AccountNav from "../navs/AccountNav";
import Footer from "../Footer";
import accountLayoutstyles from "../../styles/components/AccountLayout.module.css";

const AccountLayout = ({ children }) => {
  return (
    <>
      <AccountNav />
      <div className={accountLayoutstyles.container}>
        <main className={accountLayoutstyles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;
