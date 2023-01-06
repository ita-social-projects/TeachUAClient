import React, {useState} from "react";
import ClubsOfCenterList from "./ClubsOfCenterList"

const ClubsOfCenterContent = (centerClubs) => {
    const [clubs, setClubs] = useState({
        content: centerClubs,
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(false);

    return (
        <div className="user-club-content">
            <ClubsOfCenterList load={loading} setLoad={setLoading} clubs={clubs} setClubs={setClubs}/>
        </div>
    )
};

export default ClubsOfCenterContent;
