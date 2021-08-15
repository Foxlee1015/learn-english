import Link from "next/link";
import Footer from "../Footer";
import errorLayoutstyles from "../../styles/components/ErrorLayout.module.css";

const ErrorLayout = ({ children }) => {
  return (
    <>
      <div className={errorLayoutstyles.container}>
        <main className={errorLayoutstyles.main}>
          {children}
          <Link  href={"/"}>
            Home
          </Link>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ErrorLayout;
