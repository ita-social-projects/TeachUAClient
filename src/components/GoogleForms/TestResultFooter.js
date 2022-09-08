import React from "react";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../util/TableUtil";
import {saveAllResults, exportQuizToExcel } from "../../service/GoogleFormService";
const TestResultFooter = ({id, results , setResults}) => {

    const [categoryForm] = Form.useForm();
    const onFinish = () => {
        saveAllResults(id)
		.then((response) => {
                if (response.status) {
                    console.log(response.message)
                    message.warning(response.message);
                    return;
                }

                message.success("Результати  успішно збережено!");

                setResults(addToTable(results, response));
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
                <Button htmlType="submit" className="flooded-button add-contact-type-button">Зберегти усі Результати</Button>
            </Form>
        </div>
    );
};

export default TestResultFooter;