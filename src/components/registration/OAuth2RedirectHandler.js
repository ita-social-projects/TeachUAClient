import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { saveToken, saveUserId } from '../../service/StorageService';
import { message } from "antd";

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    render() {
        message.config({
            maxCount: 1
        });

        const token = this.getUrlParameter('token');
        const userId = this.getUrlParameter('id');
        const error = this.getUrlParameter('error');
        const successMesage = (msg) => {
            message.success(msg);
        }
        const errorMesage = (err) => {
            message.error(err);
        }
        saveToken(token);
        saveUserId(userId);
        if (token) {
            return (<div>
                <Redirect to={{
                    pathname: `/user/${userId}`,
                    state: { from: this.props.location }
                }}>
                    {successMesage("Успішний вхід в систему")}
                </Redirect>
            </div>)
        } else {
            return (<div>
                <Redirect to={{
                    pathname: "/",
                    state: {
                        from: this.props.location,
                        error: error
                    }
                }} />
                {errorMesage(error)}
            </div>)
        }
    }
}

export default OAuth2RedirectHandler;