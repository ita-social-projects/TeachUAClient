import React, {useState} from 'react';
import {Button} from "antd";
import PaymentComponent from "../payment/PaymentComponent";

const FooterDonate = () => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <div className="footer-donate">
            <div className="article">
                Як допомогти проєкту?
            </div>
            <div className="description">
                <div className="text">
                    <span>Ініціатива потребує постійної фінансової підтримки,</span>
                    <span>аби покривати щоденні витрати на роботу.</span>
                </div>
            </div>
            <Button onClick={()=>setModalVisible(true)} className="flooded-button donate-button">Допомогти проекту</Button>
        <PaymentComponent visible={modalVisible} setVisible={setModalVisible}/>
        </div>
    );
};

export default FooterDonate