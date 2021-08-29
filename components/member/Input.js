import styled from "styled-components";

const Label = styled.span`
  align-self: flex-start;
`;
const Input = styled.input`
  margin: 10px 0px;
  position: relative;
  display: inline-block;
  width: 100%;
  height: 40px;
  padding: 4px 11px;
  color: #000000d9;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
`;

const Input = ({
  label = "",
  inputAttrs,
  onBlur = () => {},
  onKeyDown = () => {},
}) => {
  return (
    <>
      <Label>{label}</Label>
      <Input
        {...inputAttrs}
        onBlur={() => onBlur()}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </>
  );
};

export default Input;
