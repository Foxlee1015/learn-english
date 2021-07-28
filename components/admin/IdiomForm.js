import { Form, Input, InputNumber, Button } from "antd";
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
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
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

  const onFinish = (values) => {
    console.log(values);
    addIdiom(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={{ expression: "", definitions: "", sentences: "" }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["idiom", "expression"]}
        label="Expression"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["idiom", "definitions"]}
        label="Definition"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["idiom", "sentences"]} label="Sentence">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default IdiomForm;
