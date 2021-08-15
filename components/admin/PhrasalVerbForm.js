import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, InputNumber, Switch } from "antd";
import AntFormList from "./common/AntFormList";
import { postPhrasalVerb } from "../../utils/apis";
import { server } from "../../config";
import { renameObjectKey, removeFalseElements } from "../../utils/utils";
import AdminStyle from "../../styles/pages/admin/Admin.module.css";
import useFetch from "../../hooks/useFetch";

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

const PhrasalVerbForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [verbData, setVerbData] = useState([]);
  const inputRef = useRef(null);
  const [fetchParticles, doFetchParticles] = useFetch([]);

  const onFinish = (values) => {
    setLoading(true);
    addPhrasalVerb({
      ...values,
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getVerbData = async () => {
    const { verb } = form.getFieldValue();
    setVerbData([]);

    if (verb !== "") {
      doFetchParticles(`phrasal-verbs/${verb}`);
    }
  };

  useEffect(() => {
    if (fetchParticles.data.length > 0) {
      setVerbData([...fetchParticles.data]);
    }
  }, [fetchParticles.data]);

  const updateFormList = () => {
    const { verb, particle } = form.getFieldValue();
    let values = { ...initialValues, verb, particle };

    if (particle !== "") {
      const phrasalVerb = verbData.find((item) => item.particle === particle);
      if (phrasalVerb) {
        const { definitions, sentences, difficulty } = phrasalVerb;
        values = {
          ...values,
          definitions,
          sentences,
          difficulty,
        };
        values.isPublic = phrasalVerb["is_public"] === 1 ? true : false;
      }
    }
    form.setFieldsValue({
      ...values,
    });
  };

  const addPhrasalVerb = async (data) => {
    renameObjectKey({ src: data, oldKey: "isPublic", newKey: "is_public" });
    data["verb"] = data.verb.toLowerCase();
    data["particle"] = data.particle.toLowerCase();
    data["definitions"] = removeFalseElements(data["definitions"]);
    data["sentences"] = removeFalseElements(data["sentences"]);
    postPhrasalVerb(data, () => {
      form.resetFields();
      setLoading(false);
      inputRef.current.focus();
    });
  };

  const handleBlurVerb = () => {
    form.setFieldsValue({ particle: "" });
    getVerbData();
    updateFormList();
  };

  const handleBlurParticle = () => {
    updateFormList();
  };

  const handleClickParticle = (particle) => {
    form.setFieldsValue({ particle });
    updateFormList();
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
        name="verb"
        label="Verb"
        rules={[{ required: true }]}
        labelAlign="left"
      >
        <Input
          ref={inputRef}
          onBlur={() => {
            handleBlurVerb();
          }}
        />
      </Form.Item>
      {verbData.length > 0 &&
        verbData.map((verb) => (
          <span
            key={verb._id}
            style={{
              margin: 5,
              cursor: "pointer",
            }}
            onClick={() => {
              handleClickParticle(verb.particle);
            }}
          >
            {verb.particle}
          </span>
        ))}
      <Form.Item
        name={"particle"}
        label="Particle"
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input onBlur={() => handleBlurParticle()} />
      </Form.Item>
      <div className={AdminStyle.formSubContainer}>
        <Form.Item
          name={"difficulty"}
          label="Difficulty"
          rules={[{ type: "number", min: 0, max: 5 }]}
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

export default PhrasalVerbForm;
