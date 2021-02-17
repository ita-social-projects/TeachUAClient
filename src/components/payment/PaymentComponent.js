import {Input, Modal, Switch} from 'antd';
import React from 'react';
import './css/PaymenComponent.css';
import ArrowLeftOutlined from "@ant-design/icons/es/icons/ArrowLeftOutlined";

const PaymentComponent = ({visible, setVisible}) => {


    return (
        <Modal
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={null}
            className="modal-payment"
            width={610}
        >
            <div className="payment-header">
                <ArrowLeftOutlined/>
                <div className="payment-dots">
                    <div className="payment-dot dot-filled"/>
                    <div className="payment-dot"/>
                </div>
            </div>
            <div className="payment-label">
                <span>
                    Деталі платежу
                </span>
            </div>
            <div className="payment-row">
                <span className="label">
                    Прізвище та Ім'я
                </span>
                <div className="payment-box" ><Input className="payment-input" placeholder="Basic usage" /></div>
            </div>
            <div className="payment-row">
                <span className="label">
                    Електронна пошта
                </span>
                <div className="payment-box" ><Input className="payment-input" placeholder="Basic usage" /></div>
            </div>
            <div className="payment-row">
                <span className="label">
                    Допомагати регулярно
                </span>
                <div className="payment-box" ><Switch defaultChecked/></div>
            </div>
        </Modal>
    );
}
export default PaymentComponent;