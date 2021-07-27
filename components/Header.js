import headerStyles from "../styles/components/Header.module.css";

const Header = ({ title }) => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>{title}</span>
      </h1>
    </div>
  );
};

export default Header;
