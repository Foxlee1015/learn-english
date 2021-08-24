import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  margin: 0 10px;
  ${(props) => props.theme.media.tablet`
    margin: 0 8px;
  `}
  ${(props) => props.theme.media.phone`
    margin: 0 6px;
  `}
  :hover {
    color: ${({ theme }) => theme.colors.primary[700]};
  }
`;

const LinkButton = ({ href = null, text, onClick = () => {} }) => {
  return (
    <Button onClick={() => onClick()}>
      {href ? <Link href={href}>{text}</Link> : text}
    </Button>
  );
};

export default LinkButton;
