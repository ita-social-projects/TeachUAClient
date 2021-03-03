import React from 'react';


const LoginSocial = () => {
    return (
        <div className="icons">
            <div className="items">
                <a target="_blank" href="#"> <img src={`${process.env.PUBLIC_URL}/static/images/user/google.png`} className="logo" alt="Logo"/>
                </a>
                <a target="_blank" href="#"> <img src={`${process.env.PUBLIC_URL}/static/images/user/facebook.png`} className="logo" alt="Logo"/>
                </a>
            </div>
        </div>
    )
}

export default LoginSocial;
