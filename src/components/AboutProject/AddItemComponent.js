import React, { useState } from 'react';
import { Layout, Modal } from 'antd';
import { mapSearchParameters, searchParameters} from "../../context/SearchContext";


const AddItemComponent = ({ visible, setVisible}) => {


    const closePopup = () => {
        setVisible(false);
    };

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
            <Layout className="map-layout">
            </Layout>
        </Modal>
    )
}

export default AddItemComponent;