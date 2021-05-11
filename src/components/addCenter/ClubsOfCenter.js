import { Form, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import CategoryLogo from "../CategoryLogo";
import AddClubModal from '../addClub/AddClubModal';
import "./css/ClubsOfCenter.css";
import { getClubsByUserId } from '../../service/ClubService';
import { getUserId } from '../../service/StorageService';
import { addCenter } from '../../service/CenterService';


const ClubsOfCenter = ({ step, setStep, setVisible, clubs, setClubs, result, setResult }) => {
    const [param, setParam] = useState(false);
    const [clubsOfCenterForm] = Form.useForm();

    const nextStep = () => {
        setStep(0);
        setVisible(false)
    }

    const prevStep = () => {
        setResult(Object.assign(result, clubsOfCenterForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        setResult(Object.assign(result, values));
        console.log("RESULT");
        console.log(result);
        nextStep();
        addCenter(result).then(response => {
            console.log(response);
        })

    }
    useEffect(() => {
        if (result) {
            console.log(result);
            clubsOfCenterForm.setFieldsValue({ ...result });
        }
        getClubsByUserId(getUserId(), 0).then(response => {
            setClubs(response);
            console.log("USE EFFFFFFFFFFFECCCCTTTTT");
            console.log(response);
        })
        if (param) {
            setParam(true);
        }
    }, [param]);

    return (
        <Form
            className="clubsOfCenter"
            layout="horizontal"
            onFinish={onFinish}
            form={clubsOfCenterForm}
        >
            <div className="form-fields">
                <Form.Item
                    className="form-item"
                    label="Оберіть гурток"
                    name="clubs"
                    rules={[{
                        required: true,
                        message: "Виберіть гуртки приналежні до центру"
                    }]}>
                    <Checkbox.Group >
                        {clubs.content.map(club => (
                            <div className="checkbox-item">
                                <Checkbox value={club.id}>
                                    <div className="checkbox-item-content">
                                        <CategoryLogo category={club.categories[0]} /><span className="club-name">{club.name}</span>
                                    </div>
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                </Form.Item>
                <span className="add-club-modal"> <AddClubModal clubs={clubs} setClubs={setClubs} /> </span>
            </div>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="finish-btn" htmlType="submit">Додати гурток і завершити</button>
            </div>
        </Form>
    )
}

export default ClubsOfCenter;