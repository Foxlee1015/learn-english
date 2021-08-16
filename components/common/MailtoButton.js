const MailtoButton = ({ mailto = "", label = "" }) => {
  return (
    <button
      style={{ textDecoration: "underline" }}
      onClick={(e) => {
        window.location = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </button>
  );
};

export default MailtoButton;
