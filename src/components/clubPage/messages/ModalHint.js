import React from 'react';
import "../comments/css/CommentEditComponent.less";
import Modal from "antd/es/modal/Modal";

const ModalHint = ({children, visible, setVisible}) => {
    return (
        <div className="comment-edit">
            <Modal
                className="comment-modal"
                centered
                width={521}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <span className="comment-edit-title">{children}</span>
            </Modal>
        </div>
    );
};

export default ModalHint;