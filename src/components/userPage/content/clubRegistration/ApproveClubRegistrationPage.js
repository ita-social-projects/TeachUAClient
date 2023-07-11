import React, { useEffect, useState } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import "./css/ClubRegistrationPage.less";
import "./css/ClubRegistration.css";
import { getUnapprovedClubRegistrations } from "../../../../service/ClubRegistrationService";
import { List, Spin } from 'antd';
import UnapprovedRegistration from "./UnapprovedRegistration";

const ApproveClubRegistrationPage = () => {
    const [loading, setLoading] = useState(true);
    const [unapprovedRegistrations, setUnapprovedRegistrations] = useState([]);

    useEffect(() => {
        const managerId = getUserId(); 

        getUnapprovedClubRegistrations(managerId)
            .then(response => {
                setUnapprovedRegistrations(response);
                setLoading(false);
            });
    }, []);

    const updateRegistrations = (clubRegistrationId) => {
        setUnapprovedRegistrations(unapprovedRegistrations.filter(reg => reg.id !== clubRegistrationId));
    };

    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <div className="contentTitle">
                    Заявки на реєстрацію
                </div>

                <div className="registrations">
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <List
                            className="registrations"
                            itemLayout="horizontal"
                            split={false}
                            locale={{
                                emptyText: <div className="noRegistrations">Всі заявки підтверджено</div>
                            }}
                            dataSource={unapprovedRegistrations}
                            pagination={{ hideOnSinglePage: true, defaultPageSize: 6, className: "user-content-pagination" }}
                            renderItem={(registration) => (
                                <UnapprovedRegistration 
                                    registration={registration} 
                                    key={registration.id} 
                                    updateRegistrations={updateRegistrations} 
                                />
                            )}
                        />
                    )}
                </div>
            </div>
        </Content>
    );
};

export default ApproveClubRegistrationPage;