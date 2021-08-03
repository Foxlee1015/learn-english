import { useState } from "react";
import { Form, Input, Switch, Button } from "antd";
import { server } from "../../config";
import AntFormList from "./common/AntFormList";
import Cookies from "universal-cookie";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const initialValues = {
  expression: "",
  definitions: [],
  sentences: [],
  reviewed: false,
};

const validateMessages = {
  required: "${label} is required!",
};

const addIdiom = async (values) => {
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
  console.log(result);
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
      <AntFormList name="definitions" />
      <AntFormList name="sentences" />

      <Form.Item label="Public" name={"reviewed"}>
        <Switch />
      </Form.Item>
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
