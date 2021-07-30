import { useState } from "react";
import { Form, Input, Switch, Button } from "antd";
import { server } from "../../config";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
};

const addIdiom = async (values) => {
  const res = await fetch(`${server}/api/idioms/`, {
    body: JSON.stringify(values.idiom),
    headers: {
      "Content-Type": "application/json",
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
    console.log(values);
    addIdiom(values);
    form.resetFields();
    setLoading(false);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={{
        expression: "",
        definitions: [],
        sentences: [],
        reviewed: false,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["idiom", "expression"]}
        label="Expression"
        rules={[{required: true}]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["idiom", "definitions"]}
        label="Definition"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["idiom", "sentences"]} label="Sentence">
        <Input />
      </Form.Item>
      <Form.Item label="Public" name={["idiom", "reviewed"]}>
        <Switch />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default IdiomForm;
