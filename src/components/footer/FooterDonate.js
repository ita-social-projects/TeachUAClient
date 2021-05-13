import React from 'react';
import {LiqPayPay} from "react-liqpay";
import {Button} from "antd";

const FooterDonate = () => {

    //TODO: fix public key
    const publicKey = process.env.REACT_APP_PRIVATE_KEY;
    const privateKey = process.env.REACT_APP_PUBLIC_KEY;

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
            <LiqPayPay
                publicKey="sandbox_i96549488438"
                privateKey="sandbox_p6nzimBma81AJ0ynQBx7LAjcZSXoTe5zqHjxyfJ2"
                description="Help Project"
                action="paydonate"
                amount="1"
                currency="UAH"
                language="uk"
                sandbox="1"

                server_url="https://www.liqpay.ua/api/3/checkout"
                extra={[<Button className="flooded-button donate-button">
                    <span>Допомога проєкту</span>
                </Button>]}
            />
        </div>
    );
};

export default FooterDonate