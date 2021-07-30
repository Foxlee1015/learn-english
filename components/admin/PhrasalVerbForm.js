import { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";

import { createQueryParams } from "../../utils/utils";
import { server } from "../../config";
import AntFormList from "./common/AntFormList"

import AdminPhrasalVerbStyle from "../../styles/pages/admin/AdminPhrasalVerb.module.css"

const initialValues = {
  verb: "",
  particle: "",
  definitions: [],
  sentences: [],
  reviewed: false,
  difficulty: 1,
}

const validateMessages = {
  required: "${label} is required!"
};

const addPhrasalVerb = async (data) => {
  const res = await fetch(`${server}/api/phrasal-verbs/`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const result = await res.json();
};

const PhrasalVerbForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    const { verb, particle, sentences, definitions, difficulty } = values;

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
    const { verb, particle } = curValues;
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
      initialValues={initialValues}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"verb"}
        label="Verb"
        rules={[{ required: true }]}
        labelAlign="left"
      >
        <Input onBlur={() => updatePhrasalVerbDetailData()} />
      </Form.Item>
      <Form.Item
        name={"particle"}
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
      <AntFormList name="definitions" />
      <AntFormList name="sentences" />
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
