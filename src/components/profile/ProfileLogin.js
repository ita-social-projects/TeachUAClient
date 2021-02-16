import React, {useState} from 'react';
import {Button, Modal, Tabs} from 'antd';
import './сss/Profile.less'
import UserLoginComponent from "./UserLogin";
import ClubOwnerLoginComponent from "./ClubOwnerLogin";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const ProfileLoginComponent = () => {
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
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Увійти як користувач" key="1">
                        <div className="message">Увійти як користувач для перегляду інформації про гуртки, а також для зв'язку з власниками гуртків</div>
                        <div className="login-media"> Увійти за допомогою соцмереж
                            <a target="_blank" href="#"><GoogleOutlined/></a>
                            <a target="_blank" href="#"><FacebookOutlined/></a>
                        </div>
                        <UserLoginComponent/>
                    </TabPane>
                    <TabPane tab="Увійти як власник гуртка" key="2">
                        <div className="message">Увійти як власник гуртка для додавання та редагування власних гуртків</div>
                        <div className="login-media"> Увійти за допомогою соцмереж
                            <a target="_blank" href="#"><GoogleOutlined/></a>
                            <a target="_blank" href="#"><FacebookOutlined/></a>
                        </div>
                        <ClubOwnerLoginComponent/>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};

export default ProfileLoginComponent;
