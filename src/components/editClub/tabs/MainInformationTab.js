import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import React from "react";
import "../css/MainInformationTab.less"
import {addClub, updateClubBuId} from "../../../service/ClubService";

const MainInformationTab = ({categories, setResult, result}) => {
    const onFinish = (values) => {
        console.log(values);
        setResult(Object.assign(result, values));

        console.log(result);
        updateClubBuId(result).then(response => console.log(response));
    };
    console.log(result);
    // const categoriesName = result.categories.map((category) => category.name)

    return (
        <Form name="basic"
              onFinish={onFinish}>
            <Form.Item name="name"
                       className="edit-club-row edit-club-name"
                       label="Назва"
                       initialValue={result.name}
            >
                <Input className="edit-club-input"
                       value={result.name}
                       placeholder="Назва гуртка"
                />
            </Form.Item>
            <Form.Item name="categories"
                       className="edit-club-row"
                       label="Категорія"
                       initialValue={result.categoriesName}
                       hasFeedback
                       rules={[
                           {
                               required: true,
                               message: "Це поле є обов'язковим"
                           }]}
            >
                <Checkbox.Group className="edit-club-categories">
                    {categories.map(category => <Checkbox
                        value={category.name}>{category.name}</Checkbox>)}
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
                        <InputNumber className="input-age"
                                     min={2}
                                     max={18}/>
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                               style={{margin: 0}}
                               initialValue={result.ageTo ? result.ageTo : 18}>
                        <InputNumber className="input-age"
                                     min={3}
                                     max={18}/>
                    </Form.Item>
                    років
                </span>
            </Form.Item>
            <Form.Item name="center"
                       className="edit-club-row"
                       label="Приналежність до центру"
                       initialValue={result.center}>
                <Select
                    className="edit-club-select"
                    placeholder="Обрати центр"
                />
            </Form.Item>
            <Button htmlType="submit" className="flooded-button edit-club-button">Зберегти зміни</Button>
        </Form>
    )
};

export default MainInformationTab;