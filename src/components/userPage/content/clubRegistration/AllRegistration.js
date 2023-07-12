import React from 'react';
import {Collapse, Button, message} from 'antd';
import classes from "./css/ClubRegistration.module.css";
import { approveClubRegistration } from "../../../../service/ClubRegistrationService";

const { Panel } = Collapse;
const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

const AllRegistration = ({ registration, updateRegistrations }) => {

    const approveRegistration = async (clubRegistrationId) => {
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

    let labelClass = classes.label;
    let statusClass;
    if (registration.active) {
        labelClass += (registration.approved ? " " + classes.labelApproved : " " + classes.labelPending);
        statusClass = registration.approved ? classes.labelApproved : classes.labelPending;
    } else {
        labelClass += " " + classes.labelCanceled;
        statusClass = classes.labelCanceled;
    }

    let statusMessage;

    if (registration.active) {
        if (registration.approved) {
            statusMessage = "Схвалено";
        } else {
            statusMessage = "На розгляді";
        }
    } else {
        statusMessage = "Скасовано";
    }

    const panelHeader = registration.child
        ? (
            <div className={labelClass}>
                <div className={classes.childDetails}>
                    <img
                        src={registration.child.gender === 'MALE' ? boyIcon : girlIcon}
                        alt={registration.child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                        className={classes.childIcon}
                    />
                    <span>{registration.child.firstName} {registration.child.lastName}, {registration.child.age}р</span>
                </div>
                <span className={classes.clubName}>{registration.club.name}</span>
                <Button className={classes.aproveButton}
                        onClick={(event) => {
                            event.stopPropagation();
                            approveRegistration(registration.id);
                }}
                        disabled={statusClass !== classes.labelPending}
                >
                    Підтвердити
                </Button>
            </div>
        )
        : (
            <div className={labelClass}>
                <span className={classes.userDetails}>{registration.user.firstName} {registration.user.lastName}</span>
                <span className={classes.clubName}>{registration.club.name}</span>
                <Button className={classes.aproveButton}
                        onClick={(event) => {
                            event.stopPropagation();
                            approveRegistration(registration.id);
                        }}
                        disabled={statusClass !== classes.labelPending}
                >
                    Підтвердити
                </Button>
            </div>
        );

    return (
        <Collapse>
            <Panel header={panelHeader}>
                {registration?.child?.parent && (
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
                <h3 className={statusClass}>
                    {statusMessage}
                </h3>
                <h3>{registration.registrationDate}</h3>
            </Panel>
        </Collapse>
    );
};

export default AllRegistration;