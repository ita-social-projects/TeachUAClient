import {Button, Layout, Result} from "antd";
import {Router, withRouter} from 'react-router';
import React from "react";
import MarathonTaskContent from "./MarathonTaskContent";


class MarathonTaskPage extends React.Component {
    state = {
        task: {}
    };
    render() {
        return (

            <Layout className="marathon-task-page" style={{padding: 70, background: '#f7e0d3' }}>
                <MarathonTaskContent task={this.state.task}/>
            </Layout>

        )
    }
}

export default withRouter(MarathonTaskPage);