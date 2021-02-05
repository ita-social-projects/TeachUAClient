import React, {useContext} from "react";
import {Button} from "antd";
import {SearchContext} from "../../context/SearchContext";
import Cities from "./Cities";
import AuthMenu from "./AuthMenu";

const HeaderRight = () => {
    const {setClubs} = useContext(SearchContext);

    return (
        <div className="right-side-menu">
            <Button className="outlined-button support-button">Допомогти</Button>
            <div className="left-divider">
                <Cities setClubs={setClubs}/>
                <AuthMenu/>
            </div>
        </div>
    )
};

export default HeaderRight;