import React from "react";
import styled from "styled-components";

const Button = styled.button`
  height: 32px;
  padding: 0px 15px;
  margin: 20px;
  color: #000000d9;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-shadow: 0 2px #00000004;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;

  :hover {
    color: #fff;
    background: #40a9ff;
    border-color: #40a9ff;
  }
  :disabled {
    cursor: not-allowed;
    color: #ff7875;
    background: #fff;
    border-color: #ff7875;
    opacity: 0.5;
  }
`;

const SubmitButton = ({ onClick = () => { }, text = "", disabled = false }) => {

  return (
    <Button type="button" onClick={() => onClick()} disabled={disabled}>
      {text}
    </Button>
  );
};

export default SubmitButton;
