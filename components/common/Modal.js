import { useRef } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { useOnClickOutside } from "../../hooks";

const Outter = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey[25]};
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
`;

const Inner = styled.div`
  position: relative;
  top: 100px;
  width: 300px;
  margin: 0 auto;
  padding: 10px 24px;
  color: ${({ theme }) => theme.colors.common.black};
  background-color: ${({ theme }) => theme.colors.common.white};
`;

const Header = styled.div`
  ${FlexCenterBox}
  justify-content: space-between;
`;

const Title = styled.h6`
  margin: 10px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Main = styled.div`
  margin: 20px 0;
`;
const ButtonWrapper = styled.div`
  margin-top: auto;
  ${FlexCenterBox}
  justify-content: flex-end;
`;
const Button = styled.button`
  color: ${({ theme }) => theme.colors.common.white};
  background: ${({ theme }) => theme.colors.primary[500]};
  border-color: ${({ theme }) => theme.colors.primary[500]};
  box-shadow: 0 2px #0000000b;
  height: 32px;
  padding: 4px 15px;
  line-height: 1.4;
  :hover {
    border-color: ${({ theme }) => theme.colors.primary[800]};
    background: ${({ theme }) => theme.colors.primary[800]};
  }
`;

const Close = styled.div`
  cursor: pointer;
  margin-left: 10px;
  ::before {
    content: "x";
    color: black;
    font-weight: 300;
    font-family: Arial, sans-serif;
  }
`;

const Modal = ({
  header = "",
  main = "",
  buttons = [],
  setShow = () => {},
}) => {
  const ref = useRef();
  useOnClickOutside(ref, (e) => {
    setShow(false);
  });
  return (
    <Outter>
      <Inner ref={ref}>
        <Header>
          <Title>{header}</Title>
          <Close
            onClick={() => {
              setShow(false);
            }}
          />
        </Header>
        <Main>{main}</Main>
        <ButtonWrapper>
          {buttons.map((button) => (
            <Button key={button} type="button" onClick={() => button.onClick()}>
              {button.text}
            </Button>
          ))}
        </ButtonWrapper>
      </Inner>
    </Outter>
  );
};

export default Modal;
