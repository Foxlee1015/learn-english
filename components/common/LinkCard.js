import Link from "next/link";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 275px;
  min-height: 220px;
  padding: 10px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${({ theme }) => theme.colors.common.white};
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  ${({ disabled }) =>
    disabled &&
    `
    background-color: rgba(117,117,117,0.1);
    text-shadow: none;
    box-shadow: none;
  `};
`;

const Title = styled.h5`
  color: ${({ theme }) => theme.colors.common.black};
  align-self: center;
  :hover {
    color: ${({ theme }) => theme.colors.primary[700]};
  }
  ${({ disabled }) =>
    disabled &&
    `
    :hover {
      color: ${({ theme }) => theme.colors.common.black};
    }
  `};
`;

const Text = styled.p``;

const LinkButton = styled.button`
  min-width: 64px;
  margin: 5px;
  padding: 4px 5px;
  margin-top: auto;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;

  color: ${({ theme }) => theme.colors.grey[500]};
  :hover {
    background-color: ${({ theme }) => theme.colors.grey[50]};
    color: ${({ theme }) => theme.colors.primary[700]};
    font-weight: 600;
  }
`;

const LinkCard = ({
  title = "",
  desc = "",
  href = "",
  actionText = "LEARN MORE",
  Component = null,
  authRequired = false,
}) => {
  const auth = useSelector((state) => state.auth);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(authRequired && !auth.loggedIn);
  }, [auth]);

  return (
    <>
      {disabled ? (
        <Container disabled>
          <Title disabled>{title}</Title>
          <Text>{desc}</Text>
          <LinkButton disabled>
            <Link href={"/member/signin"}>{"Login"}</Link>
          </LinkButton>
        </Container>
      ) : (
        <Container>
          <Title>
            <Link href={href}>{title}</Link>
          </Title>
          <Text>{desc}</Text>
          {Component && <Component />}
          <LinkButton>
            <Link href={href}>{actionText}</Link>
          </LinkButton>
        </Container>
      )}
    </>
  );
};

export default LinkCard;
