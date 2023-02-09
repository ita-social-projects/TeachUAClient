import React from "react";
import { Form, Input, InputNumber, DatePicker } from "antd";
import moment from "moment";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode =
        inputType === "number" ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
            >
                <InputNumber formatter={(value) => value} parser={(value) => value} />
            </Form.Item>
        ) : inputType === "date" ? (
            <FormItem
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
            >
                <DatePicker formate="DD-MM-YYYY" />
            </FormItem>
        ) : (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        );

    return <td {...restProps}>{editing ? inputNode : children}</td>;
};

export default EditableCell;