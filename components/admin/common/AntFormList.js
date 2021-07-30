import { Form, Input, Button, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import AdminStyle from "../../../styles/pages/admin/Admin.module.css"

const AntFormList = ({name}) => {
    return (
        <Form.List name={name}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={name} required={false} key={field.key}>
                <Form.Item {...field} noStyle>
                  <Input placeholder={name} style={{ width: "90%" }} />
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
                <div className={AdminStyle.formItemSub}>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                    >
                        {name}
                    </Button>
                    <Form.ErrorList errors={errors} />
                </div>
            </Form.Item>
          </>
        )}
      </Form.List>
    )
}

export default AntFormList