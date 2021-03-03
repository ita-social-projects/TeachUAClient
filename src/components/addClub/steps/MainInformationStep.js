import {Checkbox, Form, Input, InputNumber} from "antd";
import React from "react";
import AddClubContentFooter from "../AddClubContentFooter";

const MainInformationStep = ({categories, step, setStep, setResult, result}) => {
    const onFinish = (values) => {
        setResult(values);
        setStep(1);
    };

    return (
        <Form
            name="basic"
            requiredMark={true}
            onFinish={onFinish}>
            <Form.Item name="name"
                       className="add-club-row"
                       label="Назва"
                       hasFeedback
                       initialValue={result.clubName}
                       rules={[{
                           required: true,
                       }]}>
                <Input className="add-club-input"
                       placeholder="Назва гуртка"/>
            </Form.Item>
            <Form.Item name="categories"
                       className="add-club-row"
                       label="Категорія"
                       hasFeedback
                       initialValue={result.clubCategory}
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
                       validateStatus="success">
                <span className="add-club-age">
                    Від
                    <Form.Item name="ageFrom"
                               style={{margin: 0}}
                               initialValue={result.ageFrom ? result.ageFrom : 2}>
                        <InputNumber className="input-age" min={2} max={18}/>
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                               style={{margin: 0}}
                               initialValue={result.ageTo ? result.ageTo : 18}>
                        <InputNumber className="input-age" min={1} max={18}/>
                    </Form.Item>
                    років
                </span>
            </Form.Item>
            <AddClubContentFooter step={step} setStep={setStep}/>
        </Form>
    )
};

export default MainInformationStep;