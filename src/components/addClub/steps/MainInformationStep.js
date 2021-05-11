import { Checkbox, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import AddClubContentFooter from "../AddClubContentFooter";

const MainInformationStep = ({ categories, step, setStep, setResult, result }) => {
    const [mainForm] = Form.useForm();
    const [ageValidateStatus, setAgeValidateStatus] = useState("success")

    useEffect(() => {
        if (result) {
            console.log(result);
            mainForm.setFieldsValue({ ...result })
        }
    }, []);

    const onFinish = (values) => {
        if (values.ageFrom && values.ageTo && values.ageFrom < values.ageTo) {
            setResult(Object.assign(result, values));
            setStep(1);
            mainForm.resetFields();
        }
        else {
            setAgeValidateStatus("error")
        }
    };

    const onChange = () => {
        const formFields = mainForm.getFieldValue();
        if (formFields.ageFrom && formFields.ageTo) {
            setAgeValidateStatus("success");
        }
        else {
            setAgeValidateStatus("error");
        }
    }

    return (
        <Form
            name="basic"
            form={mainForm}
            requiredMark={true}
            onFinish={onFinish}>
            <Form.Item name="name"
                className="add-club-row"
                label="Назва"
                hasFeedback
                rules={[{
                    required: true,
                }]}>
                <Input className="add-club-input"
                    placeholder="Назва гуртка" />
            </Form.Item>
            <Form.Item name="categories"
                className="add-club-row"
                label="Категорія"
                hasFeedback
                rules={[{
                    required: true,
                }]}>
                <Checkbox.Group className="add-club-categories">
                    {categories.map(category => <Checkbox
                        value={category.name}>{category.name}</Checkbox>)}
                </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Вік дитини"
                className="add-club-row"
                hasFeedback
                validateStatus={ageValidateStatus}>
                <span className="add-club-age">
                    Від
                    <Form.Item name="ageFrom"
                        style={{ margin: 0 }}
                        initialValue={2}
                    >
                        <InputNumber onChange={onChange} className="input-age"
                            min={2}
                            max={18} />
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                        style={{ margin: 0 }}
                        initialValue={18}>
                        <InputNumber onChange={onChange} className="input-age"
                            min={3}
                            max={18} />
                    </Form.Item>
                    років
                </span>
            </Form.Item>
            <AddClubContentFooter step={step} setStep={setStep} />
        </Form>
    )
};

export default MainInformationStep;