import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import React, {useState} from "react";
import "../css/MainInformationTab.less"
import {updateClubBuId} from "../../../service/ClubService";
import {Option} from "antd/es/mentions";

const MainInformationTab = ({categories, centers, setResult, result}) => {

    const [mainInfoForm] = Form.useForm();
    const [hideButton, setHideButton] = useState();

    const commitTab = () => {

        Object.assign(result, mainInfoForm.getFieldValue());
        result.categories = categories.filter(e => result.categoryNames.includes(e.name));
        result.center = centers.find(e => e.name === result.centerName);

        setHideButton({display:"none"});
    }

    const onFinish = (values) => {

        //setResult(Object.assign(result, values));

        updateClubBuId(result).then(window.location.reload());
    };

    const categoriesName = result.categories.map((category) => category.name);

    return (
        <Form name="basic"
              form={mainInfoForm}
              onFinish={commitTab}>
            <Form.Item name="name"
                       className="edit-club-row edit-club-name"
                       label="Назва"
            >
                <Input className="edit-club-input"
                       value={result.name}
                       placeholder="Назва гуртка"
                       defaultValue={result.name}
                />
            </Form.Item>
            <Form.Item name="categoryNames"
                       className="edit-club-row"
                       label="Категорія"
                       initialValue={categoriesName}
            >
                <Checkbox.Group className="edit-club-categories"
                >
                    {categories.map(category => <Checkbox
                        value={category.name}
                    >
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
            <Form.Item name="centerName"
                       className="edit-club-row"
                       label="Приналежність до центру"
                       initialValue={result.center ? result.center.name : ""}>
                <Select
                    className="edit-club-select"
                    placeholder="Обрати центр"
                    hasFeedback>
                    <Option value={null}>{"-"}</Option>
                    {centers.map(center => <Option value={center.name}>{center.name}</Option>)}
                </Select>
            </Form.Item>
            <Button htmlType="button" style={hideButton} onClick={commitTab} className="edit-club-tab-button">Зберегти зміни вікна</Button>
            <Button htmlType="submit" onClick={onFinish} className="edit-club-button">Зберегти гурток</Button>
        </Form>
    )
};

export default MainInformationTab;