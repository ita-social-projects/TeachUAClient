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
        { console.log(" SAVE TOKEN _______________________________________"); }
        const token = this.getUrlParameter('token');
        const userId = this.getUrlParameter('id');
        const error = this.getUrlParameter('error');
        saveToken(token);
        saveUserId(userId);
        if (token) {
            return (<div>
                {message.success("Ви успішно залогувалися!")}
                <Redirect to={{
                    pathname: `/user/${userId}`,
                    state: { from: this.props.location }
                }} />
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
                {message.success(error)}
            </div>)
        }
    }
}

export default OAuth2RedirectHandler;