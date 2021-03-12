import {Form, Input, InputNumber, Select} from "antd";
import React from "react";

const EditableColumn = ({editing, dataIndex, title, inputType, selectData, record, index, children, ...restProps}) => {
    let inputNode;

    switch (inputType) {
        case 'number':
            inputNode = <InputNumber/>;
            break;
        case 'select': {
            inputNode = <Select showSearch
                                options={selectData.map(data => ({value: data}))}/>;
            break;
        }
        default: {
            inputNode = <Input/>;
            break;
        }
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `Заповніть поле ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableColumn;