import React, { useEffect, useState } from 'react';
import { Typography, List, Button, Modal, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { getToken } from "../../../../service/StorageService";
import { Redirect } from "react-router-dom";
import { getCertificatesOfAuthenticatedUser, downloadCertificate } from "../../../../service/CertificateService";
import { getCertificateTypeBySerialNumber } from "../../../../util/CertificateUtil";
import "../messages/css/UserMessagesPage.less";
import "./css/UserCertificatesPage.less";

const UserCertificatesPage = () => {

    const { Text } = Typography;
    const [certificates, setCertificates] = useState([]);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        getCertificatesOfAuthenticatedUser()
            .then(response => setCertificates(response));
    }, []);

    const startDownload = (certificate) => {
        setIsModalShown(true);
        downloadCertificate(certificate.id, () => setIsModalShown(false));
    }

    if (!getToken()) {
        return (
            <Redirect to="/" />
        );
    }
    return (
        <Content className="messagesContent">

            <div className="contentBox">

                <div className="contentTitle">
                    Мої сертифікати
                </div>
                <Modal title="Завантаження..." centered={true} 
                        closable={false} footer={null} open={isModalShown}>
                    <Spin size="large"/>
                </Modal>
                <List
                    className="certificates"
                    itemLayout="horizontal"
                    split={false}
                    locale={{ 
                        emptyText: <div className="noMessages">Сертифікатів немає</div>
                    }} 
                    dataSource={certificates}
                    renderItem={(certificate) => (
                        <List.Item actions={[
                                <Button onClick={() => startDownload(certificate)}>
                                    Завантажити
                                </Button>
                        ]}>
                            <List.Item.Meta
                                title={<h3>{certificate.courseDescription}</h3>}
                                description={certificate.date}
                            />
                            <Text italic>{getCertificateTypeBySerialNumber(certificate.serialNumber)}</Text>
                        </List.Item>
                    )}
                />
            </div>
        </Content>
    );
};

export default UserCertificatesPage;