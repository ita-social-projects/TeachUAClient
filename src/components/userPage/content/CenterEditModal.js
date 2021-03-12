import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";


const CenterEditModal = () => {

    const [visible, setVisible] = useState(false);


    return (
        <>
            <Button type="text button" onClick={() => setVisible(true)}>
                Редагувати
                <ArrowRightOutlined/>
            </Button>
            <Modal
                className="user-edit"
                centered
                width={880}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div className="edit-header">
                    Редагувати центр
                </div>

            </Modal>
        </>
    );
};


export default CenterEditModal;
