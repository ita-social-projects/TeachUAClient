import {Layout} from "antd";
import {withRouter} from 'react-router';
import React from "react";
import PageHeader from "./header/PageHeader";
import PageContent from "./content/PageContent";
import PageSider from "./sider/PageSider";
import {getClubById} from "../../service/ClubService";
import Loader from "../Loader";
import './css/ClubPage.css';

class ClubPage extends React.Component {
    state = {
        club: {}
    };

    getData = () => {
        getClubById(this.props.match.params.id).then(response => {
            this.setState({club: response});
        });
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(preProps) {
        if(preProps.match.params.id !== this.props.match.params.id) {
            this.getData();
        }
    }

    render() {
        return !this.state.club.categories ? <Loader/> : (
            <Layout>
                <PageHeader club={this.state.club}/>
                <Layout className="club-page" style={{padding: 40, background: 'white'}}>
                    <PageContent club={this.state.club}/>
                    <PageSider club={this.state.club}/>
                </Layout>
            </Layout>)
    }
}

export default withRouter(ClubPage);