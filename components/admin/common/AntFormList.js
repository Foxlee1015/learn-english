import { Form, Input, Button, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import styled from "styled-components";

const BtnBox = styled.div`
  display: flex;
  justify-content: left;
`;

const AntFormList = ({ name }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item label={name} required={false} key={field.key}>
              <Form.Item {...field} noStyle>
                <Input placeholder={name} style={{ width: "90%" }} />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <BtnBox>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                {name}
              </Button>
              <Form.ErrorList errors={errors} />
            </BtnBox>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AntFormList;
