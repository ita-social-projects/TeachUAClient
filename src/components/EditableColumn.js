import {Form, Input, InputNumber, Select, Upload} from "antd";
import React from "react";
import {UPLOAD_IMAGE_URL} from "../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const { TextArea } = Input;

const EditableColumn = ({editing, dataIndex, title, inputType, selectData, uploadFolder, record, index, children, ...restProps}) => {
    let inputNode;

    switch (inputType) {
        case 'upload':
            inputNode = <Upload
                name="image"
                action={UPLOAD_IMAGE_URL}
                maxCount={1}
                data={{folder: uploadFolder}}
                headers={{contentType: 'multipart/form-data'}}
            >
                <span className="upload"><UploadOutlined className="icon"/>Завантажити</span>
            </Upload>;
            break;
        case 'textarea':
            inputNode = <TextArea rows={4}
                                  placeholder="Текст"/>;
            break;
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