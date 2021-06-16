import { Form, Checkbox } from 'antd';
import { useEffect } from 'react';
import ClubLogo from "../clubPage/header/ClubLogo";
import AddClubModal from '../addClub/AddClubModal';
import "./css/ClubsOfCenter.css";
import { getAllClubsByUserId, getClubsByUserId } from '../../service/ClubService';
import { getUserId } from '../../service/StorageService';
import { addCenter } from '../../service/CenterService';

const ClubsOfCenter = ({ step, setStep, setVisible, clubs, setClubs, result, setResult, setLocations }) => {
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
        console.log(result)
        addCenter(result).then(response => {
            console.log(response);
            setResult(null)
            setLocations([]);
            nextStep();
        })
    }

    useEffect(() => {
        if (result) {
            clubsOfCenterForm.setFieldsValue({ ...result });
        }
        getAllClubsByUserId(getUserId()).then(response => {
            setClubs(response);
        })
    }, []);

    return (
        <Form
            className="clubsOfCenter"
            layout="horizontal"
            onFinish={onFinish}
            form={clubsOfCenterForm}
        >
            <Form.Item
            className="form-item"
            label="Оберіть гурток"
            name="clubs"
            rules={[{
                required: true,
                message: "Виберіть гуртки приналежні до центру"
            }]}>
            <div className="form-fields">

                    <Checkbox.Group  >
                        {clubs.map(club => (
                            <div className="checkbox-item">
                                <Checkbox value={club.id}>
                                        <ClubLogo logo={club.urlLogo} category={club.categories[0]} /><span className="club-name">{club.name}</span>
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
            </div>
            </Form.Item>
            <span className="add-club-modal"> <AddClubModal clubs={clubs} setClubs={setClubs} /> </span>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="finish-btn" htmlType="submit">Додати центр і завершити</button>
            </div>
        </Form>
    )
}

export default ClubsOfCenter;