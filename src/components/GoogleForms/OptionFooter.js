import React from "react";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../util/TableUtil";
import { saveAllOptions } from "../../service/GoogleFormService";
const FormOptionFooter = ({id, options, setOptions}) => {

    const [categoryForm] = Form.useForm();

	const onFinish = () => {
		saveAllOptions(id)
		.then((response) => {
		  if (response.status) {
			console.log(response.message);
			message.warning(response.message);
			return;
		  }
	
		  message.success("Опції  успішно збережено!");
	
		  setOptions(addToTable(options, response));
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
                <Button htmlType="submit" className="flooded-button add-contact-type-button">Зберегти усі Опції</Button>
            </Form>
        </div>
    );
};

export default FormOptionFooter;