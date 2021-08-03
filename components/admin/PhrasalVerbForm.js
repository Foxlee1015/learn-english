import { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import Cookies from "universal-cookie";
import { server } from "../../config";
import AntFormList from "./common/AntFormList";

import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const initialValues = {
  verb: "",
  particle: "",
  definitions: [],
  sentences: [],
  reviewed: false,
  difficulty: 1,
};

const validateMessages = {
  required: "${label} is required!",
};

const addPhrasalVerb = async (data) => {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  const res = await fetch(`${server}/api/phrasal-verbs/`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: session,
    },
    method: "POST",
  });
  const result = await res.json();
};

const PhrasalVerbForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [verbData, setVerbData] = useState({});
  const [showFormList, setShowFormList] = useState(false);

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

  useEffect(() => {
    const { verb } = form.getFieldValue();
    if (verb !== "") {
      getVerbData(verb);
    }
  }, [form.getFieldValue().verb]);

  const getVerbData = async (verb) => {
    setVerbData({});

    if (verb !== "") {
      const currentVerbData = await getCurrentVerbParticleData(verb);
      if (currentVerbData) {
        setVerbData({ ...currentVerbData });
      }
    }
  };

  useEffect(() => {
    const { particle } = form.getFieldValue();
    updateFormList(particle);
  }, [verbData]);

  const updateFormList = (particle) => {
    setShowFormList(false);
    let definitions = [];
    let sentences = [];

    if (particle !== "") {
      if (verbData && verbData.particles && verbData.particles[particle]) {
        ({ definitions, sentences } = verbData.particles[particle]);
      }
    }

    form.setFieldsValue({
      ...form.getFieldValue(),
      definitions,
      sentences,
    });

    setShowFormList(true);
  };

  const getCurrentVerbParticleData = async (verb) => {
    const res = await fetch(`${server}/api/phrasal-verbs/${verb}`);
    const data = await res.json();
    return data.result;
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
        <Input onBlur={(e) => getVerbData(e.target.value)} />
      </Form.Item>
      <Form.Item
        name={"particle"}
        label="Particle"
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input onBlur={(e) => updateFormList(e.target.value)} />
      </Form.Item>
      <Form.Item
        name={"difficulty"}
        label="Difficulty"
        rules={[{ type: "number", min: 1, max: 5 }]}
      >
        <InputNumber />
      </Form.Item>
      {showFormList && (
        <>
          <AntFormList name="definitions" />
          <AntFormList name="sentences" />
        </>
      )}
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

export default PhrasalVerbForm;
