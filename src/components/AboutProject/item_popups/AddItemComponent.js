import React, { useState } from 'react';
import {Button, Layout, message, Modal, Tooltip} from 'antd';
import { mapSearchParameters, searchParameters} from "../../../context/SearchContext";
import {createItem} from "../../../service/AboutUsService";

const AddItemComponent = ({ visible, setVisible, upd}) => {

    // const [type, setType] = useState(1);

    const closePopup = () => {
        upd();
        setVisible(false);
    };

    const create = (type) => {
        createItem(type).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success(`Пустий компонент успішно підтверджений`);
        });
    }

    return (
        <Modal
            centered
            visible={visible}
            onOk={() => closePopup()}
            onCancel={() => closePopup()}
            footer={null}
        >
            <Layout className="aboutProject">
                    <div className="row">
                        <Button className="add-item-button flooded-button donate-button"
                            onClick={() => {
                                create(1);
                            }}>
                            Заголовок
                        </Button>
                        <Button className="add-item-button flooded-button donate-button"
                            onClick={() => {
                                create(2);
                            }}>
                            Текст
                        </Button>
                        <Button className="add-item-button flooded-button donate-button"
                            onClick={() => {
                                create(3);
                            }}>
                            Зображенння і текст
                        </Button>
                    </div>
                    <div className="row">
                        <Button className="add-item-button flooded-button donate-button"
                            onClick={() => {
                                create(4);
                            }}>
                            Текст і зображення
                        </Button>
                        <Button className="add-item-button flooded-button donate-button"
                            onClick={() => {
                                create(5);
                            }}>
                            Відео
                        </Button>
                    </div>
            </Layout>
        </Modal>
    )
}

export default AddItemComponent;