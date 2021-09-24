import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  text-align: left;
  left: 0;
  right: 0;
`;

const InnerBox = styled.div`
  display: inline-block;
  position: fixed;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.grey[50]};
  border: 1px solid #f0f0f0;
  opacity: 0;
  left: 20px;
  top: -80px;
  transition: 0.4s ease-in;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;

  ${({ active }) =>
    active &&
    `
    opacity: 1;
    transform: translateY(120px);
  `};
`;

const TextBox = styled.div`
  width: 190px;
  height: 100%;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 6px;
  line-height: 30px;
`;

const Notification = ({ text, open, setOpen }) => {
  const [timerId, setTimerId] = useState(null);
  const timer = () => setTimeout(() => setOpen(false), 3500);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    if (open) {
      setTimerId(timer());
    }
  }, [text, open]);

  return (
    <>
      {text && (
        <Container>
          <InnerBox active={open}>
            <TextBox>{text}</TextBox>
          </InnerBox>
        </Container>
      )}
    </>
  );
};

export default Notification;
