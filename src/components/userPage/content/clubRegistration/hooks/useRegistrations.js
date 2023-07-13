import { useState, useEffect } from 'react';
import { getUnapprovedClubRegistrations, getAllClubRegistrations } from "../../../../../service/ClubRegistrationService";

export const useRegistrations = (userId, setLoading, isAll) => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const loadRegistrations = async () => {
            try {
                let response;
                if (!isAll) {
                    response = await getUnapprovedClubRegistrations(userId);
                } else {
                    response = await getAllClubRegistrations(userId);
                }
                setRegistrations(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load registrations', error);
                setLoading(false);
            }
        };

        loadRegistrations();
    }, [isAll]);

    const updateRegistrations = (clubRegistrationId) => {
        setRegistrations(registrations.filter(reg => reg.id !== clubRegistrationId));
    };

    return [registrations, updateRegistrations, setRegistrations];
}