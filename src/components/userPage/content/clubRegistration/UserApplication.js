import React from 'react';
import { Collapse, Button } from 'antd';
import classes from "./css/ClubRegistration.module.css";

const { Panel } = Collapse;
const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

const UserApplication = ({ application, cancelApplication }) => {
    let labelClass = classes.label;
    let statusClass;
    if (application.active) {
        labelClass += (application.approved ? " " + classes.labelApproved : " " + classes.labelPending);
        statusClass = application.approved ? classes.labelApproved : classes.labelPending;
    } else {
        labelClass += " " + classes.labelCanceled;
        statusClass = classes.labelCanceled;
    }
    const panelHeader = application.child
        ? (
            <div className={labelClass}>
                <div className={classes.childDetails}>
                    <img
                        src={application.child.gender === 'MALE' ? boyIcon : girlIcon}
                        alt={application.child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                        className={classes.childIcon}
                    />
                    <span>{application.child.firstName} {application.child.lastName}, {application.child.age}р</span>
                </div>
                <span className={classes.clubName}>{application.club.name}</span>
                <Button
                    className={classes.cancelButton}
                    onClick={(event) => {
                        event.stopPropagation();
                        cancelApplication(application.id);
                    }}
                    disabled={!application.active || application.approved}
                >
                    Відмінити
                </Button>
            </div>
        )
        : (
            <div className={labelClass}>
                <span className={classes.userDetails}>{application.user.firstName} {application.user.lastName}</span>
                <span className={classes.clubName}>{application.club.name}</span>
                <Button
                    className={classes.cancelButton}
                    onClick={(event) => {
                        event.stopPropagation();
                        cancelApplication(application.id);
                    }}
                    disabled={!application.active || application.approved}
                >
                    Відмінити
                </Button>
            </div>
        );

    return (
        <Collapse>
            <Panel header={panelHeader}>
                <h3>Коментар: </h3>
                {application.comment}
                <br></br>
                <h3 className={statusClass}>
                    {application.active
                        ? (application.approved
                            ? "Схвалено"
                            : "На розгляді")
                        : "Скасовано"
                    }
                </h3>
                <h3>{application.registrationDate}</h3>
            </Panel>
        </Collapse>
    );
};

export default UserApplication;