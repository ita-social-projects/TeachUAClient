import { Carousel, Layout, Pagination } from "antd";
import ClubListItem from "../../clubList/ClubListItem";
import "./css/ClubsItemStyles.css"


const ClubsOfCenter = ({clubs,setClickedClub, setClubInfoVisible}) =>{

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
                <div className="display-content">
                    {clubs.map( club => (
                            <ClubListItem club={club} onClubClick={onClubClick} key={club.id}/>
                    ))}
                </div>

            </Layout>

    );
}

export default ClubsOfCenter;