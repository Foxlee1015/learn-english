import { useState } from "react";
import { Form, Input, Switch, Button, InputNumber } from "antd";
import { server } from "../../config";
import AntFormList from "./common/AntFormList";
import Cookies from "universal-cookie";

import {renameObjectKey} from "../../utils/utils"
import AdminStyle from "../../styles/pages/admin/Admin.module.css";

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

const addIdiom = async (values) => {
  renameObjectKey({src:values, oldKey:"isPublic", newKey:"is_public"})
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  const res = await fetch(`${server}/api/idioms/`, {
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      Authorization: session,
    },
    method: "POST",
  });
  const result = await res.json();
};

const IdiomForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    addIdiom(values);
    form.resetFields();
    setLoading(false);
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
        <Input />
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
