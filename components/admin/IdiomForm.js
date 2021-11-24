import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Form, Input, Switch, Button, InputNumber } from "antd";
import { AntFormList } from "./common";
import { renameObjectKey, removeFalseElements } from "../../utils/utils";
import { postIdiom } from "../../utils/apis";

const InputBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: left;
`;

const initialValues = {
  expression: "",
  definitions: [],
  sentences: [],
  difficulty: 1,
  isPublic: false,
};

const validateMessages = {
  required: "${label} is required!",
};

const IdiomForm = ({ selectedIdiom, setSelectdIdiom }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    addIdiom(values);
  };

  useEffect(() => {
    if (selectedIdiom) {
      form.setFieldsValue({
        expression: selectedIdiom.expression,
        difficulty: selectedIdiom.level || 1,
        isPublic: selectedIdiom.is_public || 0,
        definitions: selectedIdiom["definitions"] || [],
        sentences: selectedIdiom["sentences"] || []
      });
    } else {
      form.setFieldsValue({
        ...initialValues
      });
    }
  }, [selectedIdiom])

  const addIdiom = async (values) => {
    const renamedValues = renameObjectKey({
      src: values,
      oldKey: "isPublic",
      newKey: "is_public",
    });
    renamedValues["expression"] = renamedValues.expression.toLowerCase();
    renamedValues["definitions"] = removeFalseElements(
      renamedValues["definitions"]
    );
    renamedValues["sentences"] = removeFalseElements(
      renamedValues["sentences"]
    );
    postIdiom(renamedValues, () => {
      form.resetFields();
      setLoading(false);
      inputRef.current.focus();
    });
  };

  return (
    <Form
      form={form}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={initialValues}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"expression"}
        label="Expression"
        rules={[{ required: true }]}
      >
        <Input ref={inputRef} />
      </Form.Item>
      <InputBox>
        <Form.Item
          name={"difficulty"}
          label="Difficulty"
          rules={[{ type: "number", min: 1, max: 5 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Public" name={"isPublic"} valuePropName="checked">
          <Switch />
        </Form.Item>
      </InputBox>
      <AntFormList name="definitions" />
      <AntFormList name="sentences" />
      <Form.Item>
        <BtnBox>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </BtnBox>
      </Form.Item>
    </Form>
  );
};
export default IdiomForm;
