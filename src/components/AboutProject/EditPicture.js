import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip, Upload} from 'antd';
import { mapSearchParameters, searchParameters} from "../../context/SearchContext";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {updateClubBuId} from "../../service/ClubService";
import {deleteFromTable} from "../../util/TableUtil";
import {updateItemById} from "../../service/AboutUsService";
import {UPLOAD_IMAGE_URL} from "../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {uploadImage} from "../../service/UploadService";
import {deleteFile} from "../../service/UploadService";

const EditPicture = ({visible, setVisible, item}) => {
    const [descriptionForm] = Form.useForm();
    const [editTitle, setEditTitle] = useState("");

    const closePopup = () => {
        console.log("item back");
        console.log(item);
        setVisible(false);
    };


    const onFinish = (values) => {
        if (values.picture && values.picture.file) {
            console.log(deleteFile(item.picture));
            item.picture = uploadImage(values.picture.file, `about_us`);
        }
        item.text = values.text;
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
            picture: item.picture,
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
            <Form
                name="basic"
                form={descriptionForm}
                onFinish={onFinish}
                requiredMark={false}
            >
                <div>
                    <Form.Item name="picture"
                               className="add-club-row"
                               label="Фото"
                               hasFeedback>
                        <Upload
                            name="image"
                            accept="image/png,image/jpeg,image/jpg,image/svg,image/jfif,image/.pjp"
                            maxCount={1}
                            headers={{ contentType: 'multipart/form-data' }}
                            showUploadList={false}
                            beforeUpload={() => false}
                        >
                            <span className="add-club-upload"><UploadOutlined className="icon" />Завантажити фото</span>
                        </Upload>
                    </Form.Item>
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
                <div>
                    <Button className="next-btn" htmlType="submit">Підтвердити</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default EditPicture;