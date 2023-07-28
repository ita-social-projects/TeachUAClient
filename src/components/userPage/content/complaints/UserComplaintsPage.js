import React, { useEffect, useState } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import {
    getComplaintByRecipientId,
    deleteComplaintById,
    getComplaintBySenderId
} from "../../../../service/ComplaintService";
import { List, Checkbox } from 'antd';
import Complaint from './Compaint';
import { getRole } from '../../../../service/StorageService';

const UserComplaintsPage = () => {
    const userRole = getRole();
    const [complaints, setComplaints] = useState([]);
    const [showOnlyNew, setShowOnlyNew] = useState(true);
    const [showOnlyWithoutAnswer, setShowOnlyWithoutAnswer] = useState(true);

    const toggleShowOnlyNew = () => {
        setShowOnlyNew(!showOnlyNew);
    };

    const toggleShowOnlyWithoutAnswer = () => {
        setShowOnlyWithoutAnswer(!showOnlyWithoutAnswer);
    };

    useEffect(() => {
        if (userRole === 'ROLE_MANAGER') {
            getComplaintByRecipientId(getUserId()).then(response => setComplaints(response));
        }
        else {
            getComplaintBySenderId(getUserId()).then(response => setComplaints(response));
        }
    }, [showOnlyNew, showOnlyWithoutAnswer]);

    let simulatedComplaints = complaints;
    simulatedComplaints = showOnlyNew ? simulatedComplaints.filter(complaint => complaint.isActive) : simulatedComplaints;
    const secondlyfilteredComplaints = showOnlyWithoutAnswer ? simulatedComplaints.filter(complaint => !complaint.hasAnswer) : simulatedComplaints;

    const handleDeleteComplaint = (complaintId) => {
        deleteComplaintById(complaintId)
            .then(() => {
                setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint.id !== complaintId));
            })
            .catch((error) => {
            });
    };

    return (
        <Content className="messagesContent">
            <div className="contentBox">
                <div className="contentTitle">Скарги</div>

                <div className="messages">
                    <div className="filterContainer">
                        <Checkbox checked={showOnlyNew}
                            onChange={toggleShowOnlyNew}>Показати непрочитані скарги </Checkbox>
                        <Checkbox checked={showOnlyWithoutAnswer}
                            onChange={toggleShowOnlyWithoutAnswer}>Показати скарги без відповіді </Checkbox>
                    </div>

                    <List
                        className="certificates"
                        itemLayout="horizontal"
                        split={false}
                        locale={{
                            emptyText: <div className="noMessages">Скарг немає</div>
                        }}
                        dataSource={secondlyfilteredComplaints}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 4, className: "user-content-pagination" }}
                        renderItem={(complaint) => (
                            <Complaint message={complaint} key={complaint.id} userRole={userRole} onDelete={handleDeleteComplaint} />
                        )}
                    />
                </div>
            </div>
        </Content>
    );
};

export default UserComplaintsPage;