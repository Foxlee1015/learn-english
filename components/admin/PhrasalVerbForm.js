import { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Switch } from "antd";
import Cookies from "universal-cookie";
import { server } from "../../config";
import AntFormList from "./common/AntFormList";

import {renameObjectKey} from "../../utils/utils"
import AdminStyle from "../../styles/pages/admin/Admin.module.css";

const initialValues = {
  verb: "",
  particle: "",
  definitions: [],
  sentences: [],
  difficulty: 1,
  isPublic: false,
};

const validateMessages = {
  required: "${label} is required!",
};

const addPhrasalVerb = async (data) => {
  renameObjectKey({src:data, oldKey:"isPublic", newKey:"is_public"})
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
  const [verbData, setVerbData] = useState([]);
  const [showFormList, setShowFormList] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    addPhrasalVerb({
      ...values
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
    setVerbData([]);

    if (verb !== "") {
      const currentVerbData = await getCurrentVerbParticleData(verb);
      if (currentVerbData) {
        setVerbData([...currentVerbData]);
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
    let difficulty = 1
    let isPublic = false

    if (particle !== "") {
      const phrasalVerb = verbData.find(verb=>verb.particle===particle)
      if (phrasalVerb) {
        ({ definitions, sentences, difficulty} = phrasalVerb);
        isPublic = phrasalVerb["is_public"] === 1 ? true : false
      }
    }

    form.setFieldsValue({
      ...form.getFieldValue(),
      definitions,
      sentences,
      difficulty,
      isPublic
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
