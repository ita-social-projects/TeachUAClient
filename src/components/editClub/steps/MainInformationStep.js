import {Checkbox, Form, Input, InputNumber} from "antd";
import React from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import "../css/MainInformationTab.less"

const MainInformationStep = ({categories, setResult, result}) => {
    const onFinish = (values) => {
        setResult(values);
    };

    const categoriesName = result.categories.map((category) => category.name)

    const checked = (value) => {
        console.log(result);
        console.log(categoriesName, value);
        console.log(categoriesName.includes(value));
        return categoriesName.includes(value);
    }

    return (
        <Form className="main-information"
              name="basic"
              onFinish={onFinish}>
            <Form.Item name="name"
                       className="edit-club-row edit-club-name"
                       label="Назва"
            >
                <Input className="edit-club-row edit-club-input"
                       value={result.name}
                       placeholder="Назва гуртка"
                       defaultValue={result.name}
                />
            </Form.Item>
            <Form.Item name="categories"
                       className="edit-club-row edit-club-category"
                       label="Категорія"
                       initialValue={result.clubCategory}
            >
                <Checkbox.Group className="edit-club-categories"
                >
                    {categories.map(category => <Checkbox
                        value={category.name}
                        checked={checked(category.name)}>
                        {category.name}
                    </Checkbox>)}
                </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Вік дитини"
                       className="edit-club-row"
            >
                <span className="edit-club-age"
                >
                    Від
                    <Form.Item name="ageFrom"
                               style={{margin: 0}}
                               initialValue={result.ageFrom ? result.ageFrom : 2}>
                        <InputNumber
                            min={2}
                            max={18}/>
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                               style={{margin: 0}}
                               initialValue={result.ageTo ? result.ageTo : 18}>
                        <InputNumber
                            min={3}
                            max={18}/>
                    </Form.Item>
                    років
                </span>
            </Form.Item>
            <EditClubContentFooter/>
        </Form>
    )
};

export default MainInformationStep;