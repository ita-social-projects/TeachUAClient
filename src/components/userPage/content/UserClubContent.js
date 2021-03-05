import React, {useEffect, useState} from "react";
import {getClubsByUserId} from "../../../service/ClubService";


const UserClubContent = ({user, id}) => {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(false);
    useEffect(() => {

        getClubsByUserId(id, user).then(response => {
            setClubs(response)
        });


    }, [])


    return (
        <div className="user-club-content">
            {/*<ClubList loading={loading} load={setLoading} clubs={clubs} setClubs={setClubs}/>*/}
        </div>
    )
};

export default UserClubContent;
