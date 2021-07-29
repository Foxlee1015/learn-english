import { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { server } from "../../config";

const validateMessages = {
  required: "${label} is required!",
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const addPhrasalVerb = async (data) => {
  console.log(data);
  const res = await fetch(`${"http://localhost:8002"}/api/phrasal-verbs/`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = await res.json();
  console.log(result);
};

const PhrasalVerbForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    const { phrasalVerb, sentences, definitions } = values;
    const { verb, particle, level = difficulty } = phrasalVerb;

    setLoading(true);
    addPhrasalVerb({ verb, particle, level, sentences, definitions });
    form.resetFields();
    setLoading(false);
  };

  const getFormValues = () => {
    const curValues = form.getFieldValue();
    const { verb, particle } = curValues.phrasalVerb;
    if (verb !== "" && particle !== "") {
      console.log(verb, particle);
      currentData = getCurrentVerbParticleData({ verb, particle });
      console.log("currentData", currentData);
    }
  };

  const getCurrentVerbParticleData = async ({ verb, particle }) => {
    let params = { verb, particle };
    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const res = await fetch(`${server}/api/phrasal-verbs/?${query}`);
    const phrasalVerb = await res.json();
    return phrasalVerb;
  };

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      onFinish={onFinish}
      initialValues={{
        phrasalVerb: {
          verb: "",
          particle: "",
        },
        definitions: [],
        sentences: [],
        reviewed: false,
        level: 1,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["phrasalVerb", "verb"]}
        label="Verb"
        rules={[{ required: true }]}
      >
        <Input onBlur={() => getFormValues()} />
      </Form.Item>
      <Form.Item
        name={["phrasalVerb", "particle"]}
        label="Particle"
        rules={[{ required: true }]}
      >
        <Input onBlur={() => getFormValues()} />
      </Form.Item>
      <Form.List name="definitions">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={"definitions"} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input placeholder="definition" style={{ width: "90%" }} />
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
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Definitions
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.List name="sentences">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={"sentences"} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input placeholder="sentence" style={{ width: "90%" }} />
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
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Sentences
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        name={["phrasalVerb", "level"]}
        label="Difficulty"
        rules={[{ type: "number", min: 1, max: 5 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PhrasalVerbForm;
