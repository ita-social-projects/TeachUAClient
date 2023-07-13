import {approveClubRegistration} from "../../../../../service/ClubRegistrationService";
import {message} from "antd";

export const useApproveRegistration = (updateRegistrations) => {
    return async (clubRegistrationId) => {
        try {
            const response = await approveClubRegistration(clubRegistrationId);
            if (response.approved) {
                updateRegistrations(response.id);
            }
            message.success("Реєстрацію підтверджено")
        } catch (error) {
            message.error("Помилка при підтверджені реєстрації")
            console.error('Failed to approve registration', error);
        }
    };
};