import React from 'react';
import {Button} from "antd";

const FooterDonate = () => {
    return (
        <div className="footerDonate">
            <div className="article">
                Як допомогти проєкту?
            </div>
            <div className="description">
                <div className="text">
                    <span>Ініціатива потребує постійної фінансової підтримки,</span>
                    <span>аби покривати щоденні витрати на роботу.</span>
                </div>
            </div>
            <Button className="flooded-button donateButton">Допомогти проекту</Button>
        </div>
    );
};

export default FooterDonate