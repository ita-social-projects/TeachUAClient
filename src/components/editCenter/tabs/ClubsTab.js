import {Checkbox, Form} from "antd";
import ClubLogo from "../../clubPage/header/ClubLogo";
import AddClubModal from "../../addClub/AddClubModal";
import {useEffect, useState} from "react";


const ClubsTab = ({center}) => {
          const [clubs,setClubs]= useState([]);

    useEffect(() => {
        console.log(center.clubs)
        setClubs(center.clubs)
    }, [])
     return (
    <Form
    className="clubsOfCenter"
    layout="horizontal"

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
    <span className="add-club-modal"> <AddClubModal  /> </span>
    <div className="btn">
        <button className="prev-btn" type="button" >Назад</button>
        <button className="finish-btn" htmlType="submit">Додати центр і завершити</button>
    </div>
</Form>
)
}


export default ClubsTab;