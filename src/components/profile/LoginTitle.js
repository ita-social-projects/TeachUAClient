import React from 'react';
import {Button} from "antd";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}


const LoginTitle = () => {
    return (
        <div className="login-registration">
            <a target="blank" href="#"><Button className="flooded-button donate-button">Зареєструватися</Button> </a>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">
                    <a target="blank" href="#"><Button className="flooded-button donate-button">Залогуватися</Button> </a>
                </TabPane>
                <TabPane tab="Tab 2" key="2">                    <a target="blank" href="#"><Button className="flooded-button donate-button">Зареєструватися</Button> </a>
                </TabPane>
            </Tabs>
            );
        </div>
    );
};

export default LoginTitle