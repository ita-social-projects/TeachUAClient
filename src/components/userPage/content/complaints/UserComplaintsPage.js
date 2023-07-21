import React, { useEffect, useState } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import {
    getComplaintByRecipientId, 
    deleteComplaintById
} from "../../../../service/ComplaintService";
import { List, Switch } from 'antd';
import Complaint from './Compaint';

const UserComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [showOnlyNew, setShowOnlyNew] = useState(true);

    useEffect(() => {
        getComplaintByRecipientId(getUserId()).then(response => setComplaints(response));
    }, []);

    const filteredComplaints = showOnlyNew ? complaints.filter(complaint => complaint.isActive) : complaints;

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
                        <span>Показати скарги без відповіді: </span>
                        <Switch

                            checked={showOnlyNew}
                            onChange={setShowOnlyNew}
                        />
                    </div>

                    <List
                        className="certificates"
                        itemLayout="horizontal"
                        split={false}
                        locale={{
                            emptyText: <div className="noMessages">Скарг немає</div>
                        }}
                        dataSource={filteredComplaints}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 4, className: "user-content-pagination" }}
                        renderItem={(complaint) => (
                            <Complaint message={complaint} key={complaint.id} onDelete={handleDeleteComplaint}/>
                        )}
                    />
                </div>
            </div>
        </Content>
    );
};

export default UserComplaintsPage;