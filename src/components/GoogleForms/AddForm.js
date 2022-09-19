import React from "react";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../util/TableUtil";
import { saveFormToDB } from "../../service/GoogleFormService";
import { Link } from "react-router-dom";
const AddForm = ({googleForms, setGoogleForms}) => {

    const [categoryForm] = Form.useForm();

    const onFinish = (values) => {
        saveFormToDB(values)
		.then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success("Категорія  успішно додана!");

                setGoogleForms(addToTable(googleForms, response));
                categoryForm.resetFields();
            });
    };

    return (
        <div className="add-category-type">
            <Form className="add-category-type"
                  name="basic"
                  requiredMark={false}
                  onFinish={onFinish}
                  form={categoryForm}>
                <Form.Item name="link"
                           rules={[{
                               required: true,
                               message: "Введіть посилання"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Посилання на форму">
                    </Input>
                </Form.Item>
                <Form.Item name="group"
                           rules={[{
                               required: true,
                               message: "Введіть групу"
                           }]}>
                    <Input className="add-category-type-input"
                           placeholder="Група для форми">
                    </Input>
                </Form.Item>
                <Button htmlType="submit" className="flooded-button add-contact-type-button">Додати форму</Button>
            </Form>
            <Link to={"/result_archived"}> <Button className="flooded-button add-contact-type-button"
            >Архівовані Результати</Button></Link>
            <Link to={"/dont_push"}> <Button className="flooded-button add-contact-type-button"
            >Dont push this button</Button></Link>
        </div>
    );
};

export default AddForm;