import styled from "styled-components";
import { Checkbox } from "antd";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
  }
  span {
    margin-bottom: 0px;
  }
`;

const InputCheckbox = ({
  label = "",
  checked = false,
  onChange = () => {},
}) => {
  return (
    <Container>
      <CustomCheckbox
        checked={checked}
        value={checked}
        onChange={(e) => onChange(e.target.checked)}
      >
        {label}
      </CustomCheckbox>
    </Container>
  );
};

export default InputCheckbox;
