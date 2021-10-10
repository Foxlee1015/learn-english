import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, InputNumber, Switch } from "antd";
import { AntFormList } from "./common";
import styled from "styled-components";
import { postPhrasalVerb } from "../../utils/apis";
import { renameObjectKey, removeFalseElements } from "../../utils/utils";
import { PhrasalVerbDictionaries } from ".";
import { useFetch } from "../../hooks";

const InputBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: left;
`;

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
  verb,
  setVerb,
  particle,
  setParticle
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchPhrasalVerbs, doFetchPhrasalVerbs] = useFetch([])
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
    initForm()
  }, []);

  const initForm = () => {
    inputRef.current.focus();
    form.setFieldsValue({ verb });
  }

  const handleBlurVerb = () => {
    const { verb } = form.getFieldValue();
    setVerb(verb)
    updateFormList();
  };

  useEffect(() => {
    doFetchPhrasalVerbs(`phrasal-verbs/${verb}`)
    updateParticleList()
  }, [verb])

  useEffect(() => {

  }, [fetchPhrasalVerbs.data])

  useEffect(() => {
    if (Object.keys(selectedItem).length > 0) {
      const values = renameObjectKey({
        src: selectedItem,
        oldKey: "isPublic",
        newKey: "is_public",
      });
      values['isPublic'] = selectedItem["is_public"]
      console.log(values)
      form.setFieldsValue({ ...values });
    } else {
      form.setFieldsValue({ ...initialValues });
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
        values = { ...phrasalVerb }
        values.isPublic = phrasalVerb["is_public"] === 1 ? true : false;
        console.log(values)
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
    renamedData["is_public"] = data["is_public"] ? 1 : 0
    renamedData["sentences"] = removeFalseElements(renamedData["sentences"]);
    postPhrasalVerb(renamedData, () => {
      refreshForm();
    });
  };


  const handleBlurParticle = () => {
    form.setFieldsValue({ particle });
    setParticle(particle)
  };

  useEffect(() => {
    updateFormList()
  }, [particle])


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
      <Form.Item
        name={"particle"}
        label="Particle"
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input onBlur={() => handleBlurParticle()} />
      </Form.Item>
      <InputBox>
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
      </InputBox>
      <AntFormList name="definitions" />
      <AntFormList name="sentences" />
      <Form.Item>
        <BtnBox>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </BtnBox>
      </Form.Item>
      <PhrasalVerbDictionaries data={selectedItem} />
    </Form>
  );
};

export default PhrasalVerbForm;
