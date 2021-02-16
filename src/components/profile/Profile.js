import React, {useState} from 'react';
import {Button, Modal, Tabs} from 'antd';
import './сss/Profile.less'
import LoginComponent from "./Login";
import RegistrationComponent from "./Registration";

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const ProfileComponent = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="" onClick={() => setVisible(true)}>
                Увійти
            </Button>
            <Modal
                className="Modal"
                centered
                width={750}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Увійти як користувач" key="1">
                        <LoginComponent/>
                    </TabPane>
                    <TabPane tab="Увійти як власник гуртка" key="2">
                        <RegistrationComponent/>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};

export default ProfileComponent;
