import React, { useEffect, useState } from 'react';
import { Typography, List, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { getToken } from "../../../../service/StorageService";
import { Redirect } from "react-router-dom";
import { getCertificatesOfAuthenticatedUser, downloadCertificate } from "../../../../service/CertificateService";
import "../messages/css/UserMessagesPage.less";
import "./css/UserCertificatesPage.less";

const UserCertificatesPage = () => {

    const { Text } = Typography;
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        getCertificatesOfAuthenticatedUser()
            .then(response => setCertificates(response));
    }, []);

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

                <List
                    className="certificates"
                    itemLayout="horizontal"
                    split={false}
                    locale={{ 
                        emptyText: <div className="noMessages">Сертифікатів немає</div>
                    }} 
                    dataSource={certificates}
                    renderItem={(certificate) => (
                        <List.Item
                            actions={[
                                <Button htmlType="submit" onClick={() => { 
                                    downloadCertificate(certificate.serialNumber) 
                                }}>Завантажити</Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={<h3>{certificate.courseDescription}</h3>}
                                description={certificate.date}
                            />
                            <Text italic>{certificate.certificateType}</Text>
                        </List.Item>
                    )}
                />
            </div>
        </Content>
    );
};

export default UserCertificatesPage;