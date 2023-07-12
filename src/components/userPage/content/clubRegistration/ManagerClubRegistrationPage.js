import React, { useEffect, useState, useMemo } from 'react';
import { Content } from "antd/es/layout/layout";
import { Input, Select, Spin, Radio, List } from "antd";
import { getUserId } from "../../../../service/StorageService";
import { getUnapprovedClubRegistrations, getAllClubRegistrations } from "../../../../service/ClubRegistrationService";
import UnapprovedRegistration from "./UnapprovedRegistration";
import "./css/ClubRegistration.css";
import AllRegistration from "./AllRegistration";
import { useSearchAndFilter } from './hooks/useSearchAndFilter';

const { Option } = Select;

const ManagerClubRegistrationPage = () => {
    const [loading, setLoading] = useState(true);
    const [unapprovedRegistrations, setUnapprovedRegistrations] = useState([]);
    const [displayedRegistrations, setDisplayedRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClub, setSelectedClub] = useState("default");
    const [clubNames, setClubNames] = useState([]);
    const [isAll, setIsAll] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("default");


    useEffect(() => {
        const loadRegistrations = async () => {
            try {
                let response;
                if (!isAll) {
                    response = await getUnapprovedClubRegistrations(getUserId());
                } else {
                    response = await getAllClubRegistrations(getUserId()); // Assuming you have such a function
                }
                setUnapprovedRegistrations(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load registrations', error);
                setLoading(false);
            }
        };

        loadRegistrations();
    }, [isAll]);

    useEffect(() => {
        const uniqueClubNames = Array.from(new Set(unapprovedRegistrations.map(reg => reg.club.name)));
        setClubNames(uniqueClubNames);
    }, [unapprovedRegistrations]);

    const onClubChange = (clubName) => {
        setSelectedClub(clubName);
    };


    const onStatusChange = (status) => {
        setSelectedStatus(status);
    };

    useMemo(() => {
        let displayedRegistrations = [...unapprovedRegistrations];

        if (selectedClub !== "default") {
            displayedRegistrations = displayedRegistrations.filter(reg => reg.club.name === selectedClub);
        }

        if (isAll && selectedStatus !== "default") {
            displayedRegistrations = displayedRegistrations.filter(reg => {
                if(selectedStatus === "Схвалено") return reg.active && reg.approved;
                if(selectedStatus === "Скасовано") return !reg.active;
                if(selectedStatus === "На розгляді") return reg.active && !reg.approved;
                return true;
            });
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
    }, [selectedClub, searchTerm, unapprovedRegistrations, isAll, selectedStatus]);


    const updateRegistrations = (clubRegistrationId) => {
        setUnapprovedRegistrations(unapprovedRegistrations.filter(reg => reg.id !== clubRegistrationId));
    };
    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <div className="contentTitle">
                    <div className="titleText">Заявки на реєстрацію</div>
                    <Radio.Group className="radioGroup" onChange={e => setIsAll(e.target.value)} defaultValue={false}>
                        <Radio className="radioItem" value={true}>Всі</Radio>
                        <Radio className="radioItem" value={false}>Не підтверджені</Radio>
                    </Radio.Group>
                </div>

                <div className="searchAndFilter">
                    <Input
                        className="searchBox"
                        placeholder="Пошук..."
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {isAll ? (
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
                    ) : null}
                    <Select
                        defaultValue="default"
                        className="filterSelectRight"
                        onChange={onClubChange}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="default">Всі гуртки</Option>
                        {clubNames.map((name) => (
                            <Option value={name} key={name}>{name}</Option>
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
                    locale={{
                        emptyText: unapprovedRegistrations.length === 0
                            ? <div className="noRegistrations">Всі заявки підтверджено</div>
                            : <div className="noRegistrations">Нічого не знайдено</div>
                    }}
                    dataSource={displayedRegistrations}
                    pagination={{ hideOnSinglePage: true, defaultPageSize: 6, className: "user-content-pagination" }}
                    renderItem={(registration) => (
                        isAll
                            ? <AllRegistration
                                registration={registration}
                                key={registration.id}
                                updateRegistrations={updateRegistrations}
                            />
                            : <UnapprovedRegistration
                                registration={registration}
                                key={registration.id}
                                updateRegistrations={updateRegistrations}
                            />
                    )}
                />)}
                </div>
            </div>
        </Content>
    );
};

export default ManagerClubRegistrationPage;