import React from "react";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../util/TableUtil";
import { saveAllQuestions } from "../../service/GoogleFormService";
const QuestionFooter = ({id, questions, setQuestions}) => {

    const [categoryForm] = Form.useForm();

	const onFinish = () => {
		saveAllQuestions(id)
		.then((response) => {
		  if (response.status) {
			console.log(response.message);
			message.warning(response.message);
			return;
		  }
	
		  message.success("Питання  успішно збережено!");
	
		  setQuestions(addToTable(questions, response));
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
                <Button htmlType="submit" className="flooded-button add-contact-type-button">Зберегти усі Питання</Button>
            </Form>
        </div>
    );
};

export default QuestionFooter;