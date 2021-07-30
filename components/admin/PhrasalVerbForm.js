import { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { createQueryParams } from "../../utils/utils";
import { server } from "../../config";


import AdminPhrasalVerbStyle from "../../styles/pages/admin/AdminPhrasalVerb.module.css"

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
    const { phrasalVerb, sentences, definitions, difficulty } = values;
    const { verb, particle } = phrasalVerb;

    setLoading(true);
    addPhrasalVerb({
      verb,
      particle,
      level: difficulty,
      sentences,
      definitions,
    });
    form.resetFields();
    setLoading(false);
  };

  const updatePhrasalVerbDetailData = async () => {
    const curValues = form.getFieldValue();
    const { verb, particle } = curValues.phrasalVerb;
    let definitions = [];
    let sentences = [];

    if (verb !== "" && particle !== "") {
      const currentData = await getCurrentVerbParticleData({ verb, particle });
      if (currentData && currentData.particles[particle]) {
        ({ definitions, sentences } = currentData.particles[particle]);
      }
    }

    form.setFieldsValue({
      ...curValues,
      definitions,
      sentences,
    });
  };

  const getCurrentVerbParticleData = async (params) => {
    let query = createQueryParams(params);

    const res = await fetch(`${server}/api/phrasal-verbs/?${query}`);
    const data = await res.json();
    if (data.result && data.result.length > 0) {
      return data.result[0];
    } else {
      return null;
    }
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
        difficulty: 1,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["phrasalVerb", "verb"]}
        label="Verb"
        rules={[{ required: true }]}
        labelAlign="left"
      >
        <Input onBlur={() => updatePhrasalVerbDetailData()} />
      </Form.Item>
      <Form.Item
        name={["phrasalVerb", "particle"]}
        label="Particle"
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input onBlur={() => updatePhrasalVerbDetailData()} />
      </Form.Item>
      <Form.Item
        name={"difficulty"}
        label="Difficulty"
        rules={[{ type: "number", min: 1, max: 5 }]}
      >
        <InputNumber />
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
              
        <div className={AdminPhrasalVerbStyle.formItemSub}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Definitions
              </Button>
              <Form.ErrorList errors={errors} />

        </div>
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
              
        <div className={AdminPhrasalVerbStyle.formItemSub}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Sentences
              </Button>
              <Form.ErrorList errors={errors} />
        </div>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <div className={AdminPhrasalVerbStyle.formItemSub}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default PhrasalVerbForm;
