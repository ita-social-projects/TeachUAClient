import { Layout, Pagination } from "antd";
import ClubListItem from "../../clubList/ClubListItem";
import "./css/ClubsItemStyles.css"


const ClubsOfCenter = ({clubs,setClickedClub, setClubInfoVisible}) =>{

    const onClubClick = (club) => {
        console.log(club);
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return (
        !clubs ?
            <div className="empty-list-of-clubs"/>  :

            <Layout className="club-list">

                <div className="clubs-inscription">
                    Гуртки центру
                </div>
                <div className="display-content">
                    {clubs.map( club => (
                            <ClubListItem club={club} onClubClick={onClubClick} key={club.id}/>
                    ))}
                </div>

            </Layout>

    );
}

export default ClubsOfCenter;