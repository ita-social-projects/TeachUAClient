import React, {useEffect, useState} from 'react';
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import {Avatar, Collapse} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {CheckCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import { DeleteOutlined } from '@ant-design/icons';
import { getLogo } from '../messages/MessageUtil';

const Complaint = ({message, onDelete}) => {

    const {Panel} = Collapse;
    const [active, setActive] = useState(message.isActive);
    const handleDelete = () => {
        onDelete(message.id);
    };

    const showReadComplaint = (isActive) => {
        if (isActive) return <ExclamationCircleOutlined className="exclamation"/>
        else return <CheckCircleOutlined className="checkCircle"/>
    }

    return (
        <Collapse onChange={() => {
            if (message.isActive) setActive(false);
        }}
                  expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
        >
            <div className="userInfo">
                <Avatar size={36} src={getLogo(message.user.urlLogo)} icon={<UserOutlined/>}/>
                <div className="userName">
                    {`${message.user.firstName} ${message.user.lastName}`}
                </div>
            </div>
            <Panel key={message.id}
                   header={
                       <div>
                           <div>
                               {message.club.name}
                           </div>
                       </div>
                   }
                   extra={
                       <div className="extra">
                           {/* <div className="date"> */}
                               {/* {message.date ? getFormattedDate(message.date) : ''} */}
                           {/* </div> */}
                           {showReadComplaint(active)}
                           <DeleteOutlined className="deleteButton" onClick={handleDelete} />
                       </div>
                   }
            >
                <div>
                    {message.text}
                </div>
            </Panel>
        </Collapse>
    );
};

export default Complaint;