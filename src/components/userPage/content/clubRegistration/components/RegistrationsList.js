import AllRegistration from "../AllRegistration";
import UnapprovedRegistration from "../UnapprovedRegistration";
import {List, Spin} from "antd";

const RegistrationsList = ({ loading, unapprovedRegistrations, displayedRegistrations, updateRegistrations, isAll }) => (
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
            />
        )}
    </div>
);

export default RegistrationsList;