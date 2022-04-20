import React, {useEffect, useState} from 'react';
import {Content} from "antd/es/layout/layout";
import {getToken, getUserId} from "../../../../service/StorageService";
import {Redirect} from "react-router-dom";
import "./css/UserMessagesPage.less";
import {getMessagesByRecipientId} from "../../../../service/MessageService";
import Message from "./Message";
import {sortMessages} from "./MessageUtil";

const UserMessagesPage = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
            getMessagesByRecipientId(getUserId()).then(response => setMessages(sortMessages(response)));
        },
        []
    );

    if (!getToken()) {
        return (
            <Redirect to="/"/>
        );
    }
    return (
        <Content className="messagesContent">

            <div className="contentBox">

                <div className="contentTitle">
                    Мої повідомлення
                </div>

                <div className="messages">

                    {messages.length === 0
                        ?
                        <div className="noMessages">
                            Повідомлень немає
                        </div>
                        :
                        messages.map(message => <Message message={message} key={message.id}/>)
                    }
                </div>
            </div>
        </Content>
    );
};

export default UserMessagesPage;