import './css/SocialMedia.css';
import React, {useState, useEffect} from "react";
import MaskIcon from "../../MaskIcon";
import {getAllContacts} from "../../../service/ContactService";

const SocialMedia = ({label}) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacts().then(response => setContacts(response));
    }, []);

    return (<div className="social-media">
            <span className="label">{label}</span>
            <div className="links">
                {contacts.map(contact =>
                    <div className="contact">
                        <MaskIcon maskColor="#0D2C95" iconUrl={contact.urlLogo}/>
                        <span className="contact-name">{contact.name}</span>
                    </div>)}
            </div>
        </div>
    )
};

export default SocialMedia;