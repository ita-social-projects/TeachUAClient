import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState, useMemo } from 'react';
import { Input, Select, Spin, List } from "antd";
import { getUserId } from "../../../../service/StorageService";
import { getUnapprovedClubRegistrations } from "../../../../service/ClubRegistrationService";
import UnapprovedRegistration from "./UnapprovedRegistration";
import "./css/ClubRegistration.css";

const { Option } = Select;

const ApproveClubRegistrationPage = () => {
    const [loading, setLoading] = useState(true);
    const [unapprovedRegistrations, setUnapprovedRegistrations] = useState([]);
    const [displayedRegistrations, setDisplayedRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClub, setSelectedClub] = useState("default");
    const [clubNames, setClubNames] = useState([]);

    useEffect(() => {
        const loadRegistrations = async () => {
            try {
                const response = await getUnapprovedClubRegistrations(getUserId());
                setUnapprovedRegistrations(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load registrations', error);
                setLoading(false);
            }
        };

        loadRegistrations();
    }, []);

    useEffect(() => {
        const uniqueClubNames = Array.from(new Set(unapprovedRegistrations.map(reg => reg.club.name)));
        setClubNames(uniqueClubNames);
    }, [unapprovedRegistrations]);

    const onClubChange = (clubName) => {
        setSelectedClub(clubName);
    };

    useMemo(() => {
        let displayedRegistrations = [...unapprovedRegistrations];

        if (selectedClub !== "default") {
            displayedRegistrations = displayedRegistrations.filter(reg => reg.club.name === selectedClub);
        }

        if (searchTerm !== "") {
            displayedRegistrations = displayedRegistrations.filter(reg => {
                const userName = reg.user ? `${reg.user.firstName} ${reg.user.lastName}`.toLowerCase() : '';
                const childName = reg.child ? `${reg.child.firstName} ${reg.child.lastName}`.toLowerCase() : '';
                const clubName = reg.club.name.toLowerCase();

                return (
                    clubName.includes(searchTerm.toLowerCase()) ||
                    userName.includes(searchTerm.toLowerCase()) ||
                    childName.includes(searchTerm.toLowerCase())
                );
            });
        }

        setDisplayedRegistrations(displayedRegistrations);
    }, [selectedClub, searchTerm, unapprovedRegistrations]);

    const updateRegistrations = (clubRegistrationId) => {
        setUnapprovedRegistrations(unapprovedRegistrations.filter(reg => reg.id !== clubRegistrationId));
    };
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
                        className="filterSelect"
                        onChange={onClubChange}
                    >
                        <Option value="default">Всі гуртки</Option>
                        {clubNames.map((name, index) => (
                            <Option value={name} key={index}>{name}</Option>
                        ))}
                    </Select>
                </div>

                <div className="registrations">
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <List
                            className="registrations"
                            itemLayout="horizontal"
                            split={false}
                            locale={{ emptyText: <div className="noRegistrations">Всі заявки підтверджено</div> }}
                            dataSource={displayedRegistrations}
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