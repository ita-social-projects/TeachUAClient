import React, { useEffect, useState, useMemo } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import { getUnapprovedClubRegistrations, getAllClubRegistrations } from "../../../../service/ClubRegistrationService";
import "./css/ClubRegistration.css";
import Title from './components/Title';
import Filters from './components/Filters';
import RegistrationsList from './components/RegistrationsList';


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
                    response = await getAllClubRegistrations(getUserId());
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
                <Title setIsAll={setIsAll} />
                <Filters
                    isAll={isAll}
                    onClubChange={onClubChange}
                    onStatusChange={onStatusChange}
                    setSearchTerm={setSearchTerm}
                    clubNames={clubNames}
                />
                <RegistrationsList
                    loading={loading}
                    unapprovedRegistrations={unapprovedRegistrations}
                    displayedRegistrations={displayedRegistrations}
                    updateRegistrations={updateRegistrations}
                    isAll={isAll}
                />
            </div>
        </Content>
    );
};

export default ManagerClubRegistrationPage;