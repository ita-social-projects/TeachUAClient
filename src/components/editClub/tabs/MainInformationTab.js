import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import React from "react";
import "../css/MainInformationTab.less"
import {updateClubById} from "../../../service/ClubService";
import {Option} from "antd/es/mentions";

const MainInformationTab = ({categories, setResult, result , centers}) => {
    const onFinish = (values) => {
        setResult(Object.assign(result, values));

        console.log(result);
        updateClubById(result).then(response => console.log(response));
    };

    const onContactsChange = (values) => {
        console.log(values);
        let categories = result.categoriesName;
        if (values.target.checked === true) {
            if (!categories.includes(values.target.value)) {
                categories.push(values.target.value);
            }
            setResult({...result, categoriesName: categories})
            console.log(categories);
        } else {
            const index = categories.indexOf(values.target.value);
            if (index !== -1) {
                categories.splice(index, 1);
                setResult({...result, categoriesName: categories})
            }
            console.log(categories);
        }
        console.log(result);
    }
    console.log(result);

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
                       onChange={e => setResult({...result, name: e.target.value})}
                />
            </Form.Item>
            <Form.Item name="categories"
                       className="edit-club-row"
                       label="Категорія"
                       initialValue={result.categoriesName}
                       onChange={onContactsChange}
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
                               initialValue={result.ageFrom ? result.ageFrom : 2}
                               onChange={e => setResult({...result, ageFrom: e.target.value})}
                    >
                        <InputNumber className="input-age"
                                     min={2}
                                     max={18}/>
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                               style={{margin: 0}}
                               initialValue={result.ageTo ? result.ageTo : 18}
                               onChange={e => setResult({...result, ageTo: e.target.value})}
                    >
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
                       initialValue={result.center}
                       onChange={e => setResult({...result, center: e.target.value})}
            >
                    <Select
                        className="add-club-select"
                        placeholder="Назва центру"
                        hasFeedback>
                        {centers.map(c => <Option value={c.id}>{c.name}</Option>)}
                    </Select>
            </Form.Item>
            <Button htmlType="submit" className="flooded-button edit-club-button">Зберегти зміни</Button>
        </Form>
    )
};

export default MainInformationTab;