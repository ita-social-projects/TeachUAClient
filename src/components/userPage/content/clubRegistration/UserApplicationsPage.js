import React, {useEffect, useState} from 'react';
import {Content} from "antd/es/layout/layout";
import {getUserId} from "../../../../service/StorageService";
import "./css/ClubRegistrationPage.less";
import "./css/ClubRegistration.css";
import {getUserApplications, cancelClubRegistration} from "../../../../service/ClubRegistrationService";
import {List, message, Spin} from 'antd';
import UserApplication from "./UserApplication";

const UserApplicationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);

    const cancelApplication = (applicationId) => {
        cancelClubRegistration(applicationId)
            .then((response) => {
                const updatedApplications = applications.map(application =>
                    application.id === response.id ? {...application, active: response.active} : application
                );
                setApplications(updatedApplications);
                message.success("Заявка скасована")
            })
            .catch(err => {
                message.error("Помилка при скасуванні заявки")
                console.error('Failed to cancel registration', err);
            });
    };

    useEffect(() => {
        const userId = getUserId();

        getUserApplications(userId)
            .then(response => {
                setApplications(response);
                setLoading(false)
            });
    }, []);

    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <div className="contentTitle">
                    Заявки на реєстрацію
                </div>

                <div className="registrations">
                    {loading ? (
                        <Spin size="large"/>
                    ) : (
                        <List
                            className="registrations"
                            itemLayout="horizontal"
                            split={false}
                            locale={{
                                emptyText: <div className="noRegistrations">Немає надісланих заявок</div>
                            }}
                            dataSource={applications}
                            pagination={{
                                hideOnSinglePage: true,
                                defaultPageSize: 6,
                                className: "user-content-pagination"
                            }}
                            renderItem={(application) => (
                                <UserApplication
                                    application={application}
                                    cancelApplication={cancelApplication}
                                    key={application.id}
                                />
                            )}
                        />
                    )}
                </div>
            </div>
        </Content>
    );
};

export default UserApplicationsPage;