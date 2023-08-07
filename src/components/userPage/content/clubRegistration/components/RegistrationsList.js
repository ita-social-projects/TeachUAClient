import AllRegistration from "../AllRegistration";
import UnapprovedRegistration from "../UnapprovedRegistration";
import {List, Spin} from "antd";
import {useCancelRegistration} from "../hooks/useCancelRegistration"
import { useApproveRegistration } from "../hooks/useApproveRegistration";

const RegistrationsList = ({ loading, registrations, setRegistrations, displayedRegistrations, updateRegistrations, isAll }) => {
    const cancelRegistration = useCancelRegistration(registrations, setRegistrations);
    const approveRegistration = useApproveRegistration(registrations, setRegistrations)
    return (
        <div className="registrations">
            {loading ? (
                <Spin size="large"/>
            ) : (
                <List
                    className="registrations"
                    itemLayout="horizontal"
                    split={false}
                    locale={{
                        emptyText: registrations.length === 0
                            ? <div className="noRegistrations">Всі заявки підтверджено</div>
                            : <div className="noRegistrations">Нічого не знайдено</div>
                    }}
                    dataSource={displayedRegistrations}
                    pagination={{hideOnSinglePage: true, defaultPageSize: 6, className: "user-content-pagination"}}
                    renderItem={(registration) => (
                        isAll
                            ? <AllRegistration
                                registration={registration}
                                key={registration.id}
                                approveRegistration={approveRegistration}
                                cancelRegistration={cancelRegistration}
                            />
                            : <UnapprovedRegistration
                                registration={registration}
                                key={registration.id}
                                updateRegistrations={updateRegistrations}
                            />
                    )}
                />
            )}
        </div>
    );
};

export default RegistrationsList;