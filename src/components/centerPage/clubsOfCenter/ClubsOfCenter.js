import React , {useEffect, useState} from 'react';
import { Carousel, Layout, Pagination} from "antd";
import ClubListItem from "../../clubList/ClubListItem";
import ClubsOfCenterContent from "./ClubsOfCenterContent";
import "./css/ClubsItemStyles.css"


const ClubsOfCenter = ({clubs,setClickedClub, setClubInfoVisible, centerId}) =>{

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return (
        !clubs ?
            <div className="empty-list-of-clubs"/>  :

            <Layout className="club-list" >

                <span className="title" style={{fontSize:18}}>
                    Гуртки центру
                </span>
                <ClubsOfCenterContent centerId={centerId}/>
                {/* <div className="display-content">
                    {clubs.map( club => (
                            <ClubListItem club={club} onClubClick={onClubClick} key={club.id}/>
                    ))}
                </div> */}

            </Layout>

    );
}

export default ClubsOfCenter;