import React, {useEffect} from "react";
import './css/PageSider.css';
import PropTypes from 'prop-types';
import Sider from "antd/es/layout/Sider";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import ContactsInfoUtil from "../../../util/ContactsInfoUtil";

const CenterPageSider = ({center}) => {

    useEffect( () =>{
        window.scrollTo(0, 0);
        this.getData();
    },[]);

        return (
            <Sider className="page-sider" width={364}>
                <div className="address">
                    <EnvironmentFilled
                        className="address-icon"/>
                    <p className="text"> {center.locations[0].address}</p>
                </div>
                <div className="map">
                    <img src={`${process.env.PUBLIC_URL}/static/map.png`} alt="Map"/>
                </div>

                <ContactsInfoUtil label="Зв’яжіться з центром " contacts={center.contacts}/>
            </Sider>
        );
}

CenterPageSider.propTypes = {
   // center: PropTypes.object.isRequired
};

export default CenterPageSider;