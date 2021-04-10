import './css/SocialMedia.css';
import React, {useState, useEffect} from "react";
import MaskIcon from "../../MaskIcon";
import {getAllContacts} from "../../../service/ContactService";

const SocialMedia = ({label, contacts}) => {

    const contactsArray=Array.from(contacts);
    return (<div className="social-media">
            <span className="label">{label}</span>
            <div className="links">
                {contactsArray.map(contact =>
                    <div className="contact" key={contact.contact_data}>
                        <MaskIcon  maskColor="#0D2C95" iconUrl={contact.contactType.urlLogo}/>
                        <span className="contact-name">{contact.contact_data}</span>
                    </div>)}
            </div>
        </div>
    )
};

export default SocialMedia;