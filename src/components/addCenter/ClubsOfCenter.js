import { Form, Checkbox } from 'antd';
import {useEffect, useState} from 'react';
import ClubLogo from "../clubPage/header/ClubLogo";
import AddClubModal from '../addClub/AddClubModal';
import "./css/ClubsOfCenter.css";
import { getAllClubsByUserId, getClubsByUserId } from '../../service/ClubService';
import { getUserId } from '../../service/StorageService';
import { addCenter } from '../../service/CenterService';

const ClubsOfCenter = ({ step, setStep, setVisible, clubs, setClubs, result, setResult, setLocations ,fromCenter}) => {
    const [clubsOfCenterForm] = Form.useForm();
    const [clubsId,setClubsIds] = useState([]);

    const nextStep = () => {
        setStep(0);
        setVisible(false)
    }

    const prevStep = () => {
        setResult(Object.assign(result, clubsOfCenterForm.getFieldValue()));
        setStep(step - 1);
    }
    const onChange = e => {
        setClubsIds(e)
    }
    const onFinish = (values) => {
        setResult(Object.assign(result, values));
        result.clubs = clubsId;
        console.log(result);
        addCenter(result).then(response => {
            window.location.reload();
            /*
            Temporary solution, page shouldn't reload every time
             */
            // console.log(response);
            // setResult(null)
            // setLocations([]);
            // nextStep();
        })
        if(result.clubs.length===0){
            alert("Ви не вибрали жодного клубу")
        }
        // window.location.reload()
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

                    <Checkbox.Group onChange={onChange} >
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
            <span className="add-club-modal"> <AddClubModal clubs={clubs} setClubs={setClubs} fromCenter={fromCenter} /> </span>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="finish-btn" htmlType="submit">Завершити</button>
            </div>
        </Form>
    )
}

export default ClubsOfCenter;