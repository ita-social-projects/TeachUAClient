import { Modal, Spin } from "antd";

const DownloadModal = ({isModalShown}) => {
    return (
        <Modal 
            title="Завантаження..." 
            centered={true} 
            closable={false} 
            footer={null} 
            open={isModalShown}
        >
            <Spin size="large"/>
        </Modal>
    );
};

export default DownloadModal;