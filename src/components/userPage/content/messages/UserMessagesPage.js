import React, { useEffect, useState } from 'react';
import { Content } from "antd/es/layout/layout";
import { getUserId } from "../../../../service/StorageService";
import "./css/UserMessagesPage.less";
import {
    getMessagesByRecipientId,
    deleteMessageById,
    getNewMessagesByRecipientId
} from "../../../../service/MessageService";
import Message from "./Message";
import { List, Switch } from 'antd';

const UserMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [showOnlyNew, setShowOnlyNew] = useState(true);

    useEffect(() => {
        if (showOnlyNew) {
            getNewMessagesByRecipientId(getUserId()).then(response => setMessages(response));
        } else {
            getMessagesByRecipientId(getUserId()).then(response => setMessages(response));
        }
    }, [showOnlyNew]);

    const filteredMessages = showOnlyNew ? messages.filter(message => message.isActive) : messages;
    const handleDeleteMessage = (messageId) => {
        deleteMessageById(messageId)
            .then(() => {
                setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
            })
            .catch((error) => {
            });
    };

    return (
        <Content className="messagesContent">
            <div className="contentBox">
                <div className="contentTitle">Мої повідомлення</div>

                <div className="messages">
                    <div className="filterContainer">
                        <span>Показати тільки нові повідомлення: </span>
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
                            emptyText: <div className="noMessages">Повідомлень немає</div>
                        }}
                        dataSource={filteredMessages}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 4, className: "user-content-pagination" }}
                        renderItem={(message) => (
                            <Message message={message} key={message.id} onDelete={handleDeleteMessage} />
                        )}
                    />
                </div>
            </div>
        </Content>
    );
};

export default UserMessagesPage;