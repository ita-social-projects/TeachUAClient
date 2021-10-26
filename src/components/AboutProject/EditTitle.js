import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip} from 'antd';
import { mapSearchParameters, searchParameters} from "../../context/SearchContext";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {updateClubBuId} from "../../service/ClubService";
import {deleteFromTable} from "../../util/TableUtil";
import {updateItemById} from "../../service/AboutUsService";

const EditTitle = ({visible, setVisible, item}) => {
    const [descriptionForm] = Form.useForm();
    const [editTitle, setEditTitle] = useState("");

    const closePopup = () => {
        console.log("item back");
        console.log(item);
        setVisible(false);
    };


    const onFinish = (values) => {

        console.log(values);
        item.text = values.title;
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
            title: item.text
        });
        return visible;
    }

    return (

        <Modal
                centered
                visible={isVisible()}
                onOk={() => closePopup()}
                onCancel={() => closePopup()}
                footer={null}
                // className="modal"
            >
            <br></br>
            <Form
                name="basic"
                form={descriptionForm}
                onFinish={onFinish}
                requiredMark={false}
            >
                <div>
                    <Form.Item
                        name="title"
                        label="Текст заголовка"
                        rules={[
                            {
                                required: true,
                                max: 100,
                                message: "Поле довжиною 0-100 символів",
                            },
                        ]}
                    >
                        <Input
                            className="input"
                            // defaultValue={item.text}
                            suffix={
                                <Tooltip placement="bottomRight"
                                         title="Це поле може містити тільки українські та англійські літери, довжиною 5-100 символів">
                                    <InfoCircleOutlined className="info-icon" />
                                </Tooltip>
                            }

                            placeholder="Введіть текст заголовка" />
                    </Form.Item>
                </div>
                <div>
                    <Button className="add-item-button" htmlType="submit">Підтвердити</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default EditTitle;