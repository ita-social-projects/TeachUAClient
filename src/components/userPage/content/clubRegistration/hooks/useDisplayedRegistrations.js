import { useState, useEffect } from 'react';

export const useDisplayedRegistrations = (selectedClub, searchTerm, unapprovedRegistrations, isAll, selectedStatus) => {
    const [displayedRegistrations, setDisplayedRegistrations] = useState([]);

    const filterRegistrationsByClub = (registrations, selectedClub) => {
        if (selectedClub === "all") {
            return registrations;
        }

        return registrations.filter(reg => reg.club.name === selectedClub);
    };

    const filterRegistrationsByStatus = (registrations, selectedStatus, isAll) => {
        if (!isAll || selectedStatus === "all") {
            return registrations;
        }

        return registrations.filter(reg => {
            switch (selectedStatus) {
                case "approved":
                    return reg.active && reg.approved;
                case "rejected":
                    return !reg.active;
                case "under_review":
                    return reg.active && !reg.approved;
                default:
                    return true;
            }
        });
    };

    const filterRegistrationsBySearchTerm = (registrations, searchTerm) => {
        if (searchTerm === "") {
            return registrations;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return registrations.filter(reg => {
            const userName = reg.user ? `${reg.user.firstName} ${reg.user.lastName}`.toLowerCase() : '';
            const childName = reg.child ? `${reg.child.firstName} ${reg.child.lastName}`.toLowerCase() : '';
            const clubName = reg.club.name.toLowerCase();

            return (
                clubName.includes(lowerCaseSearchTerm) ||
                userName.includes(lowerCaseSearchTerm) ||
                childName.includes(lowerCaseSearchTerm)
            );
        });
    };

    useEffect(() => {
        let updatedRegistrations = [...unapprovedRegistrations];

        updatedRegistrations = filterRegistrationsByClub(updatedRegistrations, selectedClub);
        updatedRegistrations = filterRegistrationsByStatus(updatedRegistrations, selectedStatus, isAll);
        updatedRegistrations = filterRegistrationsBySearchTerm(updatedRegistrations, searchTerm);

        setDisplayedRegistrations(updatedRegistrations);
    }, [selectedClub, searchTerm, unapprovedRegistrations, isAll, selectedStatus]);

    return displayedRegistrations;
}