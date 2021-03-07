import React from 'react';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../service/config/AuthConfig';


const RegistrationSocial = ({ role }) => {

    return (
        <div className="icons">
            <div className="items">
                <a target="_blank" href={GOOGLE_AUTH_URL + "&role=" + role}> <img src={`${process.env.PUBLIC_URL}/static/images/user/google.png`} className="logo" alt="Logo" />
                </a>
                <a target="_blank" href={FACEBOOK_AUTH_URL + "&role=" + role}> <img src={`${process.env.PUBLIC_URL}/static/images/user/facebook.png`} className="logo" alt="Logo" />
                </a>
            </div>
        </div>
    )
}

export default RegistrationSocial
