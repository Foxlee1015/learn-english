import { useEffect, useState, useRef } from "react";
import { Form, Input, Switch, Button, InputNumber } from "antd";
import AntFormList from "./common/AntFormList";
import { renameObjectKey, removeFalseElements } from "../../utils/utils";
import AdminStyle from "../../styles/pages/admin/Admin.module.css";
import { postIdiom } from "../../utils/apis";

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

const IdiomForm = () => {
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
      <div className={AdminStyle.formSubContainer}>
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
      </div>
      <AntFormList name="definitions" />
      <AntFormList name="sentences" />
      <Form.Item>
        <div className={AdminStyle.formItemSub}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
export default IdiomForm;
