import React from "react";
import "./css/AddCategory.css";
import {addCategory} from "../../../service/CategoryService";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../../util/TableUtil";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const AddCategory = ({categories, setCategories, setAddCategory}) => {

    const [categoryForm] = Form.useForm();

    const onFinish = (values) => {
        addCategory(values)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success("Категорія '" + response.name + "' успішно додана!");

                setCategories(addToTable(categories, response));
                categoryForm.resetFields();
                setAddCategory(response);
            });
    };

    return (
        <div className="add-category-type">
            <Form className="add-category-type"
                  name="basic"
                  requiredMark={false}
                  onFinish={onFinish}
                  form={categoryForm}>
                <Form.Item name="name"
                           rules={[{
                               required: true,
                               message: "Введіть назву категорії"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Назва категорії">
                    </Input>
                </Form.Item>
                <Form.Item name="description"
                           rules={[{
                               required: true,
                               message: "Введіть опис категорії"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Опис категорії">
                    </Input>
                </Form.Item>
                <Form.Item name="urlLogo"
                           rules={[{
                               required: false,
                               message: "Завантажте лого"
                           }]}>
                    <Upload
                        name="image"
                        action={UPLOAD_IMAGE_URL}
                        maxCount={1}
                        data={{folder: `categories`}}
                        headers={{contentType: 'multipart/form-data'}}>
                        <span className="add-category-upload"><UploadOutlined className="icon" />Завантажити</span>
                    </Upload>
                </Form.Item>
                <Form.Item name="backgroundColor"
                           rules={[{
                               required: true,
                               message: "Введіть Background Color"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Background Color">
                    </Input>
                </Form.Item>
                <Form.Item name="tagBackgroundColor"
                           rules={[{
                               required: true,
                               message: "Введіть Tag Background Color"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Tag Background Color">
                    </Input>
                </Form.Item>
                <Form.Item name="tagTextColor"
                           rules={[{
                               required: true,
                               message: "Введіть Tag Text Color"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Tag Text Color">
                    </Input>
                </Form.Item>
                <Button htmlType="submit" className="flooded-button add-contact-type-button">Добавити</Button>
            </Form>
        </div>
    );
};

export default AddCategory;