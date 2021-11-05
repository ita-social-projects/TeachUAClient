import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Layout, message, Modal, Tooltip, Upload} from 'antd';
import { mapSearchParameters, searchParameters} from "../../../context/SearchContext";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {updateClubBuId} from "../../../service/ClubService";
import {deleteFromTable} from "../../../util/TableUtil";
import {updateItemById} from "../../../service/AboutUsService";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {uploadImage} from "../../../service/UploadService";
import {deleteFile} from "../../../service/UploadService";

const EditPicture = ({visible, setVisible, item}) => {
    const [descriptionForm] = Form.useForm();

    const closePopup = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        if (values.picture && values.picture.file) {
            console.log(deleteFile(item.picture));
            item.picture = values.picture.file.response;
        }
        item.text = values.text;
        updateItemById(item).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Компонент "текст з зображенням" успішно відредаговано`);
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
            <Layout className="aboutProject">
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
                                action={UPLOAD_IMAGE_URL}
                                data={{folder: `about_us/images`}}
                                accept="image/png,image/jpeg,image/jpg,image/svg,image/jfif,image/.pjp"
                                maxCount={1}
                                headers={{ contentType: 'multipart/form-data' }}
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
                    <div className="help-button">
                        <Button className="flooded-button donate-button" htmlType="submit">Підтвердити</Button>
                    </div>
                </Form>
            </Layout>
        </Modal>
    );
}

export default EditPicture;