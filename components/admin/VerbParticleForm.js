import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, } from "antd";
import styled from "styled-components";
import { postPhrasalVerb } from "../../utils/apis";

const BtnBox = styled.div`
  display: flex;
  justify-content: left;
`;

const initialValues = {
  verb: "",
  particle: "",
};

const validateMessages = {
  required: "${label} is required!",
};

const VerbParticleForm = ({
  refreshPhrasalVerbs
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const onFinish = (values) => {
    setLoading(true);
    postPhrasalVerb(values, () => {
      refreshForm();
      refreshPhrasalVerbs();
    });
  };

  const refreshForm = () => {
    setLoading(false);
    initForm()
  };

  useEffect(() => {
    setLoading(false);
    initForm()
  }, []);

  const initForm = () => {
    inputRef.current.focus();
    form.setFieldsValue({ initialValues });
  }

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
        />
      </Form.Item>
      <Form.Item
        name={"particle"}
        label="Particle"
        labelAlign="left"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <BtnBox>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Phrasal verb
          </Button>
        </BtnBox>
      </Form.Item>
    </Form>
  );
};

export default VerbParticleForm;
