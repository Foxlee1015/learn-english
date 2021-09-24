import styled from "styled-components";

const Title = styled.h2`
  text-align: center;
  font-size: 35px;
  color: ${({ theme }) => theme.colors.primary[700]};
  ${(props) => props.theme.media.desktop`
    font-size: 35px;
  `}
  ${(props) => props.theme.media.tablet`
    font-size: 30px;
  `}
  ${(props) => props.theme.media.phone`
    font-size: 25px;
  `}
`;

const Header = ({ title }) => {
  return <Title>{title}</Title>;
};

export default Header;
