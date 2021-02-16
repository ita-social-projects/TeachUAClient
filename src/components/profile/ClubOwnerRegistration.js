import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import './сss/Profile.less'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const ClubOwnerRegistrationComponent = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (

        <Form
            {...layout}
            name="basic-login"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Емейл"
                name="Емейл"
                rules={[{required: true, message: 'Будь ласка введіть Ваш емейл!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="Пароль"
                rules={[{required: true, message: 'Будь ласка введіть Ваш пароль!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Запам'ятати мене</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>


    );

}

export default ClubOwnerRegistrationComponent;