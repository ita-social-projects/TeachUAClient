import React, {useState} from 'react';
import {useRegistrations} from './hooks/useRegistrations';
import {useClubNames} from './hooks/useClubNames';
import {useDisplayedRegistrations} from './hooks/useDisplayedRegistrations';
import {Content} from "antd/es/layout/layout";
import {getUserId} from "../../../../service/StorageService";
import "./css/ClubRegistration.css";
import Title from './components/Title';
import Filters from './components/Filters';
import RegistrationsList from './components/RegistrationsList';
import {useHistory, useLocation} from 'react-router-dom';


const ManagerClubRegistrationPage = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [isAll, setIsAll] = useState(queryParams.get('all') === 'true');
    const [selectedClub, setSelectedClub] = useState(queryParams.get('clubName') || "all");
    const [selectedStatus, setSelectedStatus] = useState(queryParams.get('status') || "all");
    const [registrations, updateRegistrations, setRegistrations] = useRegistrations(getUserId(), setLoading, isAll);
    const [searchTerm, setSearchTerm] = useState("");
    const clubNames = useClubNames(registrations);
    const displayedRegistrations = useDisplayedRegistrations(
        selectedClub,
        searchTerm,
        registrations,
        isAll,
        selectedStatus
    );


    const onClubChange = (clubName) => {
        setSelectedClub(clubName);
        queryParams.set('all', isAll ? 'true' : 'false');
        queryParams.set('clubName', clubName);
        if (isAll) {
            queryParams.set('status', selectedStatus);
        } else {
            queryParams.delete('status');
        }
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };

    const onStatusChange = (status) => {
        setSelectedStatus(status);
        queryParams.set('all', isAll ? 'true' : 'false');
        queryParams.set('clubName', selectedClub);
        queryParams.set('status', status);
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };

    const setIsAllAndUpdateURL = (newIsAll) => {
        setIsAll(newIsAll);
        queryParams.set('all', newIsAll ? 'true' : 'false');
        queryParams.set('clubName', selectedClub);
        if (newIsAll) {
            queryParams.set('status', selectedStatus);
        } else {
            queryParams.delete('status');
        }
        history.push({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };


    return (
        <Content className="registrationsContent">
            <div className="contentBox">
                <Title isAll={isAll} setIsAll={setIsAllAndUpdateURL}/>
                <Filters
                    isAll={isAll}
                    onClubChange={onClubChange}
                    onStatusChange={onStatusChange}
                    setSearchTerm={setSearchTerm}
                    clubNames={clubNames}
                    selectedStatus={selectedStatus}
                    selectedClub={selectedClub}
                />
                <RegistrationsList
                    loading={loading}
                    registrations={registrations}
                    setRegistrations={setRegistrations}
                    displayedRegistrations={displayedRegistrations}
                    updateRegistrations={updateRegistrations}
                    isAll={isAll}
                />
            </div>
        </Content>
    );
};

export default ManagerClubRegistrationPage;