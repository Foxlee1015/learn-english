import styled from "styled-components";

const Span = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const MailtoButton = ({ mailto = "", label = "" }) => {
  return (
    <Span
      onClick={(e) => {
        window.location = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Span>
  );
};

export default MailtoButton;
