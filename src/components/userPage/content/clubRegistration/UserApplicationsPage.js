import React, { useEffect, useState, useMemo } from 'react';
import { Content } from "antd/es/layout/layout";
import { Input, Select, Spin, List, message } from 'antd';
import { getUserId } from "../../../../service/StorageService";
import { getUserApplications, cancelClubRegistration } from "../../../../service/ClubRegistrationService";
import UserApplication from "./UserApplication";
import "./css/ClubRegistration.css";
import { useSearchAndFilter } from './hooks/useSearchAndFilter';

const { Option } = Select;

const UserApplicationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [displayedApplications, setDisplayedApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChild, setSelectedChild] = useState("default");
    const [selectedStatus, setSelectedStatus] = useState("default");
    const [childNames, setChildNames] = useState([]);

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
        const loadApplications = async () => {
            try {
                const response = await getUserApplications(getUserId());
                setApplications(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load applications', error);
                setLoading(false);
            }
        };

        loadApplications();
    }, []);

    useEffect(() => {
        const uniqueChildNames = Array.from(new Set(applications.map(app => `${app.child.firstName} ${app.child.lastName}`)));
        setChildNames(uniqueChildNames);
    }, [applications]);

    const onChildChange = (childName) => {
        setSelectedChild(childName);
    };

    const onStatusChange = (status) => {
        setSelectedStatus(status);
    };

    useMemo(() => {
        let displayedApplications = [...applications];

        if (selectedChild !== "default") {
            displayedApplications = displayedApplications.filter(app => `${app.child.firstName} ${app.child.lastName}` === selectedChild);
        }

        if (selectedStatus !== "default") {
            displayedApplications = displayedApplications.filter(app => {
                if(selectedStatus === "Схвалено") return app.active && app.approved;
                if(selectedStatus === "Скасовано") return !app.active;
                if(selectedStatus === "На розгляді") return app.active && !app.approved;
                return true;
            });
        }

        if (searchTerm !== "") {
            displayedApplications = displayedApplications.filter(app => {
                const userName = app.user ? `${app.user.firstName} ${app.user.lastName}`.toLowerCase() : '';
                const childName = app.child ? `${app.child.firstName} ${app.child.lastName}`.toLowerCase() : '';
                const clubName = app.club.name.toLowerCase();

                return (
                    clubName.includes(searchTerm.toLowerCase()) ||
                    userName.includes(searchTerm.toLowerCase()) ||
                    childName.includes(searchTerm.toLowerCase())
                );
            });
        }

        setDisplayedApplications(displayedApplications);
    }, [selectedChild, selectedStatus, searchTerm, applications]);

    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <div className="contentTitle">
                    Заявки на реєстрацію
                </div>

                <div className="searchAndFilter">
                    <Input
                        className="searchBox"
                        placeholder="Пошук..."
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Select
                        defaultValue="default"
                        className="filterSelectStatuses"
                        onChange={onStatusChange}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="default">Всі статуси</Option>
                        <Option value="Схвалено">Схвалено</Option>
                        <Option value="Скасовано">Скасовано</Option>
                        <Option value="На розгляді">На розгляді</Option>
                    </Select>
                    <Select
                        defaultValue="default"
                        className="filterSelectRight"
                        onChange={onChildChange}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="default">Всі діти</Option>
                        {childNames.map((name) => (
                            <Option value={name} key={name}>{name}</Option>
                        ))}
                    </Select>
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
                                emptyText: applications.length === 0
                                    ? <div className="noRegistrations">Немає надісланих заявок</div>
                                    : <div className="noRegistrations">Нічого не знайдено</div>
                            }}
                            dataSource={displayedApplications}
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