import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip} from 'antd';
import { mapSearchParameters, searchParameters} from "../../context/SearchContext";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {updateClubBuId} from "../../service/ClubService";
import {deleteFromTable} from "../../util/TableUtil";
import {updateItemById} from "../../service/AboutUsService";

const EditVideo = ({visible, setVisible, item}) => {
    const [descriptionForm] = Form.useForm();
    const [editTitle, setEditTitle] = useState("");

    const closePopup = () => {
        console.log("item back");
        console.log(item);
        setVisible(false);
    };


    const onFinish = (values) => {
        console.log(values);
        item.video = values.video;
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

    return (

        <Modal
                centered
                visible={visible}
                 onOk={() => closePopup()}
                onCancel={() => closePopup()}
                width={1200}
                footer={null}
                className='map-modal'
            >
            <Form
                name="basic"
                form={descriptionForm}
                onFinish={onFinish}
                requiredMark={false}
            >
                <div>
                    <Form.Item
                        name="video"
                        label="Текст заголовка"
                        rules={[
                            {
                                required: true,
                                message: "Це поле не може бути пустим",
                            },
                        ]}
                    >
                        <Input
                            defaultValue={item.video}
                            placeholder="Введіть посилання на відео" />
                    </Form.Item>
                </div>
                <div>
                    <Button className="next-btn" htmlType="submit">Підтвердити</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default EditVideo;