import styled from "styled-components";

const Button = styled.button`
  textdecoration: "underline";
`;

const MailtoButton = ({ mailto = "", label = "" }) => {
  return (
    <Button
      onClick={(e) => {
        window.location = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Button>
  );
};

export default MailtoButton;
