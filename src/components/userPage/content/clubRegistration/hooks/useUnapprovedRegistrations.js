import { useState, useEffect } from 'react';
import { getUnapprovedClubRegistrations, getAllClubRegistrations } from "../../../../../service/ClubRegistrationService";

export const useUnapprovedRegistrations = (userId, setLoading, isAll) => {
    const [unapprovedRegistrations, setUnapprovedRegistrations] = useState([]);

    useEffect(() => {
        const loadRegistrations = async () => {
            try {
                let response;
                if (!isAll) {
                    response = await getUnapprovedClubRegistrations(userId);
                } else {
                    response = await getAllClubRegistrations(userId);
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

    const updateRegistrations = (clubRegistrationId) => {
        setUnapprovedRegistrations(unapprovedRegistrations.filter(reg => reg.id !== clubRegistrationId));
    };

    return [unapprovedRegistrations, updateRegistrations];
}