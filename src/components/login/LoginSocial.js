import React, {useContext} from 'react';
import {ROOT_URI} from "../../config/ApplicationConfig";
import {UriContext} from "../../context/UriContext";


const LoginSocial = () => {
    const uri = useContext(UriContext);

    return (
        <div className="icons">
            <div className="items">
                <a target="_blank" href="#"> <img src={`${uri}/static/images/user/google.png`} className="logo" alt="Logo"/>
                </a>
                <a target="_blank" href="#"> <img src={`${uri}/static/images/user/facebook.png`} className="logo" alt="Logo"/>
                </a>
            </div>
        </div>
    )
}

export default LoginSocial;
