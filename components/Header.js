import headerStyles from "../styles/Header.module.css";

const Header = ({ title }) => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        Let&#39;s learn <span>{title} </span>
      </h1>
    </div>
  );
};

export default Header;
