import React from 'react';
import { Collapse, Button } from 'antd';
import classes from "./css/ClubRegistration.module.css";
import { approveClubRegistration } from "../../../../service/ClubRegistrationService";

const { Panel } = Collapse;
const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

const UnapprovedRegistration = ({ registration, updateRegistrations }) => {

    const approveRegistration = async (clubRegistrationId) => {
        try {
            const response = await approveClubRegistration(clubRegistrationId);
            if (response.approved) {
                updateRegistrations(response.id);
            }
        } catch (error) {
            console.error('Failed to approve registration', error);
        }
    };

    const panelHeader = registration.child
        ? (
            <div className={classes.label}>
                <div className={classes.childDetails}>
                    <img
                        src={registration.child.gender === 'MALE' ? boyIcon : girlIcon}
                        alt={registration.child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                        className={classes.childIcon}
                    />
                    <span>{registration.child.firstName} {registration.child.lastName}, {registration.child.age}р</span>
                </div>
                <span className={classes.clubName}>{registration.club.name}</span>
                <Button className={classes.aproveButton} onClick={(event) => {
                    event.stopPropagation();
                    approveRegistration(registration.id);
                }}>
                    Підтвердити
                </Button>
            </div>
        )
        : (
            <div className={classes.label}>
                <span className={classes.userDetails}>{registration.user.firstName} {registration.user.lastName}</span>
                <span className={classes.clubName}>{registration.club.name}</span>
                <Button className={classes.aproveButton} onClick={(event) => {
                    event.stopPropagation();
                    approveRegistration(registration.id);
                }}>
                    Підтвердити
                </Button>
            </div>
        );

    return (
        <Collapse>
            <Panel header={panelHeader}>
                {registration.child && registration.child.parent && (
                    <>
                        <h3>Хто зареєстрував:</h3>
                        <p>{registration.child.parent.firstName} {registration.child.parent.lastName}, {registration.child.parent.phone}, {registration.child.parent.email}</p>
                    </>
                )}
                {registration.user && (
                    <>
                        <h3>Додаткова інформація:</h3>
                        <p>{registration.user.phone}, {registration.user.email}</p>
                    </>
                )}
                <h3>Коментар: </h3>
                {registration.comment}
                <br></br>
                <h3>{registration.registrationDate}</h3>

            </Panel>
        </Collapse>
    );
};

export default UnapprovedRegistration;