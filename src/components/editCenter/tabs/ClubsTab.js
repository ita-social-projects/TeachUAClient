import {Checkbox, Form} from "antd";
import ClubLogo from "../../clubPage/header/ClubLogo";
import AddClubModal from "../../addClub/AddClubModal";
import {useEffect, useState} from "react";
import {getAllClubsByUserId, getClubsByCenterId} from "../../../service/ClubService";
import {getUserId} from "../../../service/StorageService";
import {useForm} from "antd/es/form/Form";


const ClubsTab = ({center}) => {
       const [centerId,setCenterId] = useState(center.id)
       const [clubs,setClubs] = useState([])
           useEffect(() => {
          getClubsByCenterId(centerId).then(response => {setClubs(response)})
    }, [])

    return (
        <Form
            className="clubsOfCenter"
            layout="horizontal"
        >
            <Form.Item
                className="form-item"
                label="Оберіть гурток"
                name="clubs">
                <div  className="form-fields">
                    {clubs.map(club => (
                        <div className="checkbox-item" value={club.id}>

                            <ClubLogo logo={club.urlLogo} category={club.categories[0]}/><span
                            className="club-name">{club.name}</span>
                        </div>
                    ))}
                </div>
            </Form.Item>
            <span className="add-club-modal"> <AddClubModal reloadPage={false} centerId={center.id}/> </span>
            <div className="btn">
                <button className="prev-btn" type="button">Назад</button>
                <button className="finish-btn" htmlType="submit">Додати центр і завершити</button>
            </div>
        </Form>
    )
}


export default ClubsTab;