import React from 'react';
import {Button} from "antd";

const FooterDonate = () => {
    return (
        <div className="footerDonate">
            <div className="footerDonateText">
                Як допомогти проєкту?
            </div>
            <div className="footerDonateDescription">
                Ініціатива потребує постійної фінансової підтримки, <br>
            </br> аби покривати щоденні витрати на роботу.
            </div>
            <Button className="donateButton">Допомогти проекту</Button>

        </div>
    );
};

export default FooterDonate