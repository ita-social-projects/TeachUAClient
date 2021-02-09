import React from "react";
import './css/PageSider.css';
import PropTypes from 'prop-types';
import Sider from "antd/es/layout/Sider";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {getSimilarClubsByCategoryName} from "../../../service/ClubService";
import SocialMedia from "./SocialMedia";
import SimilarClubs from "./SimilarClubs";
import {searchParameters} from "../../../context/SearchContext";


/*const PageSider = ({club}) => {
    const [similarClubs, setSimilarClubs] = useState([]);

    useEffect(() => {

        getSimilarClubsByCategoryName(club.id, club.categories[0].name, searchParameters.cityName).then(response => {
            setSimilarClubs(response);
        });
    }, [club]);

    return (
        <Sider className="page-sider" width={364}>
            <div className="address">
                <EnvironmentFilled
                    className="address-icon"/>
                <p className="text"> {club.address}</p>
            </div>
            <div className="map">
                <img src="/static/map.png" alt="Map"/>
            </div>
            <SocialMedia/>
            <SimilarClubs similarClubs={similarClubs}/>
        </Sider>
    )
};*/

class PageSider extends React.Component {
    state = {
        similarClubs: []
    };

    getData = () => {
        getSimilarClubsByCategoryName(this.props.club.id, this.props.club.categories[0].name, searchParameters.cityName).then(response => {
            this.setState({similarClubs: response});
        });
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    componentDidUpdate(preProps) {
        if(preProps.club.id !== this.props.club.id) {
            this.getData();
        }
    }

    render() {
        return (
            <Sider className="page-sider" width={364}>
                <div className="address">
                    <EnvironmentFilled
                        className="address-icon"/>
                    <p className="text"> {this.props.club.address}</p>
                </div>
                <div className="map">
                    <img src="/static/map.png" alt="Map"/>
                </div>
                <SocialMedia/>
                <SimilarClubs similarClubs={this.state.similarClubs}/>
            </Sider>
        )
    }
}

PageSider.propTypes = {
    club: PropTypes.object.isRequired
};

export default PageSider;