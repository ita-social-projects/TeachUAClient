import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip} from 'antd';
import { mapSearchParameters, searchParameters} from "../../../context/SearchContext";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {updateClubBuId} from "../../../service/ClubService";
import {deleteFromTable} from "../../../util/TableUtil";
import {updateItemById} from "../../../service/AboutUsService";
import "../css/aboutProject.css";

const EditTitle = ({visible, setVisible, item, upd}) => {
    const [descriptionForm] = Form.useForm();
    const [editTitle, setEditTitle] = useState("");

    const closePopup = () => {
        upd();
        setVisible(false);
    };


    const onFinish = (values) => {
        console.log(values);
        item.text = values.text;
        console.log(item);
        updateItemById(item).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Компонент ${item.id} успішно підтверджений`);
        });
        closePopup();
    }

    const isVisible = () => {
        descriptionForm.setFieldsValue({
            text: item.text
        });
        return visible;
    }

    return (

        <Modal
                centered
                visible={isVisible()}
                 onOk={() => closePopup()}
                onCancel={() => closePopup()}
                width={1200}
                footer={null}
            >
            <br></br>
            <Layout className="aboutProject">
                <Form
                    name="basic"
                    form={descriptionForm}
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <div>
                        <Form.Item
                            name="text"
                            label="Текст"
                            rules={[
                                {
                                    required: true,
                                    max: 6000,
                                    message: "Поле довжиною 0-6000 символів",
                                },
                            ]}
                        >
                            <Input.TextArea
                                style={{height: 400}}
                                placeholder="Введіть текст" />
                        </Form.Item>
                    </div>
                    <div className="help-button">
                        <Button className="flooded-button donate-button" htmlType="submit">Підтвердити</Button>
                    </div>
                </Form>
            </Layout>
        </Modal>
    );
}

export default EditTitle;