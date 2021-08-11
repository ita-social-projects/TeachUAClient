import {Button, Layout, Result} from "antd";
import {Router, withRouter} from 'react-router';
import React from "react";
//import Loader from "../Loader";
import './../../clubPage/css/ClubPage.css';
import MarathonTaskContent from "./MarathonTaskContent";
import marathonDay from "../marathonDayData/DataObjects";


class MarathonTaskPage extends React.Component {
    state = {
        task: {}
    };


    getData = () => {
        const clubId = this.props.match.params.id;
        console.log('that is idddddddddddddddddd' +clubId)
        marathonDay.marathonDay.find(value => value.id === clubId);
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(preProps) {
        if (preProps.match.params.id !== this.props.match.params.id) {
            this.getData();
        }
    }

    render() {
        return (

            <Layout className="club-page" style={{padding: 30, background: 'white'}}>
                <MarathonTaskContent task={this.state.task}/>
            </Layout>

        )
    }
}

export default withRouter(MarathonTaskPage);