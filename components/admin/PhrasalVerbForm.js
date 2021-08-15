import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, InputNumber, Switch } from "antd";
import AntFormList from "./common/AntFormList";
import { postPhrasalVerb } from "../../utils/apis";
import { renameObjectKey, removeFalseElements } from "../../utils/utils";
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

const PhrasalVerbForm = ({
  data,
  selectedItem,
  setSelectedItem,
  refreshData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const inputRef = useRef(null);

  const onFinish = (values) => {
    setLoading(true);
    addPhrasalVerb({
      ...values,
    });
  };

  const refreshForm = () => {
    setLoading(false);
    inputRef.current.focus();
    form.resetFields();
    refreshData();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const updateParticleList = () => {
    const { verb } = form.getFieldValue();
    const filtered = data.filter((item) => item.verb === verb);
    setParticles([...filtered]);
  };

  useEffect(() => {
    if (Object.keys(selectedItem).length > 0) {
      const values = renameObjectKey({
        src: selectedItem,
        oldKey: "isPublic",
        newKey: "is_public",
      });
      form.setFieldsValue({ ...values });
    }
    updateParticleList();
  }, [selectedItem]);

  const updateFormList = () => {
    const { verb, particle } = form.getFieldValue();
    let values = { ...initialValues, verb, particle };

    if (particle !== "") {
      const phrasalVerb = data.find(
        (item) => item.verb === verb && item.particle === particle
      );
      if (phrasalVerb) {
        const { _id, definitions, sentences, difficulty } = phrasalVerb;
        values = {
          ...values,
          _id,
          definitions,
          sentences,
          difficulty,
        };
        values.isPublic = phrasalVerb["is_public"] === 1 ? true : false;
      }
    }
    setSelectedItem({ ...values });
    form.setFieldsValue({
      ...values,
    });
  };

  const addPhrasalVerb = async (data) => {
    const renamedData = renameObjectKey({
      src: data,
      oldKey: "isPublic",
      newKey: "is_public",
    });
    renamedData["verb"] = renamedData.verb.toLowerCase();
    renamedData["particle"] = renamedData.particle.toLowerCase();
    renamedData["definitions"] = removeFalseElements(
      renamedData["definitions"]
    );
    renamedData["sentences"] = removeFalseElements(renamedData["sentences"]);
    postPhrasalVerb(data, () => {
      refreshForm();
    });
  };

  const handleBlurVerb = () => {
    updateParticleList();
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
      {particles.length > 0 &&
        particles.map((item) => (
          <span
            key={item._id}
            style={{
              margin: 5,
              cursor: "pointer",
            }}
            onClick={() => {
              handleClickParticle(item.particle);
            }}
          >
            {item.particle}
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
