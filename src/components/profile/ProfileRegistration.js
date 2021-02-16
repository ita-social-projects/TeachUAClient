import React, {useState} from 'react';
import {Button, Modal, Tabs} from 'antd';
import './сss/Profile.less'
import UserRegistrationComponent from "./UserRegistration";
import ClubOwnerRegistrationComponent from "./ClubOwnerRegistration";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const ProfileRegistrationComponent = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="" onClick={() => setVisible(true)}>
                Зареєструватися
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
                    <TabPane tab="Зареєструватися як користувач" key="1">
                        <div className="message">Зареєструватися як користувач для перегляду інформації про гуртки,
                            а також для зв'язку з власниками гуртків</div>
                          <div className="login-media"> Зареєструватися за допомогою соцмереж
                              <a target="_blank" href="#"><GoogleOutlined/></a>
                              <a target="_blank" href="#"><FacebookOutlined/></a>
                              </div>
                        <UserRegistrationComponent/>
                    </TabPane>
                    <TabPane tab="Зареєструватися як власник гуртка" key="2">
                        <div className="message">Зареєструватися як власник гуртка для додавання та редагування власних гуртків</div>
                        <div className="login-media"> Зареєструватися за допомогою соцмереж
                            <a target="_blank" href="#"><GoogleOutlined/></a>
                            <a target="_blank" href="#"><FacebookOutlined/></a>
                        </div>
                        <ClubOwnerRegistrationComponent/>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};

export default ProfileRegistrationComponent;
