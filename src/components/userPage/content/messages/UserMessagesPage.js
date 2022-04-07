import React, {useEffect, useState} from 'react';
import {Content} from "antd/es/layout/layout";
import {getToken} from "../../../../service/StorageService";
import {Redirect} from "react-router-dom";
import classes from "./css/UserMessagesPage.module.css";

const UserMessagesPage = () => {

    if (!getToken()) {
        return (
            <Redirect to="/"/>
        );
    }
    return (
        <Content className={classes.messagesContent}>

            <div className={classes.contentBox}>

                <div className={classes.contentTitle}>
                    Мої повідомлення
                </div>

                <div className={classes.messages}>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                </div>
            </div>
        </Content>
    );
};

export default UserMessagesPage;