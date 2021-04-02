import React from 'react';
import {LiqPayPay, LiqPaySubscribe} from "react-liqpay";


const FooterDonate = () => {

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
                // sandbox="1"
                result_url="http://localhost:3000/clubs"
                server_url="https://www.liqpay.ua/api/3/checkout"
                extra={[<button className="flooded-button donate-button">
                    <span>Допомога проекту</span>
                </button>]}
            />
        </div>
    );
};

export default FooterDonate
