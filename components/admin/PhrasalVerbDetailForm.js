import { useEffect, useState } from "react";
import { Form, Button, InputNumber, Switch } from "antd";
import { AntFormList } from "./common";
import styled from "styled-components";
import { postPhrasalVerb, deletePhrasalVerb } from "../../utils/apis";
import { removeFalseElements } from "../../utils/utils";
import { Modal } from "../common";


const InputBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: left;
`;

const validateMessages = {
  required: "${label} is required!",
};

const PhrasalVerbDetailForm = ({
  phrasalVerb,
  refreshPhrasalVerbs
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const onFinish = (values) => {
    setLoading(true);
    addPhrasalVerb(values)
  };

  useEffect(() => {
    updateFormList()
  }, [phrasalVerb])

  const updateFormList = () => {
    phrasalVerb.isPublic = phrasalVerb["is_public"] === 1 ? true : false;
    phrasalVerb.definitions = phrasalVerb["definitions"] || [];
    phrasalVerb.sentences = phrasalVerb["sentences"] || [];
    phrasalVerb.difficulty = phrasalVerb["difficulty"] || 1;

    form.setFieldsValue({
      ...phrasalVerb,
    });
  };

  const addPhrasalVerb = async (data) => {
    const phrasalVerbDetail = {
      ...phrasalVerb,
      definitions: removeFalseElements(data.definitions),
      sentences: removeFalseElements(data.sentences),
      is_public: data["isPublic"] ? 1 : 0,
      difficulty: data["difficulty"]
    }
    postPhrasalVerb(phrasalVerbDetail, () => {
      setLoading(false);
      refreshPhrasalVerbs();
    });
  };

  const deleteHandler = () => {
    const { _id } = phrasalVerb
    deletePhrasalVerb(_id, () => {
      setShowModal(false)
      refreshPhrasalVerbs();
    })
  }

  return (
    <>
      {showModal && (
        <Modal
          header={`${phrasalVerb.verb}-${phrasalVerb.particle}`}
          main={`Do you want to delete ${phrasalVerb.verb} ${phrasalVerb.particle}?`}
          buttons={[{ onClick: deleteHandler, text: "Delete" }]}
          setShow={setShowModal}
        />
      )}
      <Button type="primary" onClick={() => { setShowModal(true) }}>
        Delete
      </Button>
      <Form
        form={form}
        name="dynamic_form_item"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
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
      </Form>
    </>
  );
};

export default PhrasalVerbDetailForm;
