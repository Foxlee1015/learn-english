import styled from "styled-components";
import { Checkbox } from "antd";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const InputCheckbox = ({
  label = "",
  checked = false,
  onChange = () => {},
}) => {
  return (
    <Container>
      <Checkbox
        checked={checked}
        value={checked}
        onChange={(e) => onChange(e.target.checked)}
      >
        {label}
      </Checkbox>
    </Container>
  );
};

export default InputCheckbox;
