import React from "react";
import Layout, {Content} from "antd/es/layout/layout";
import {withRouter} from "react-router";
import SiderComponent from "./sider/UserSider";
import UserPageContent from "./content/UserPageContent";
import Sider from "antd/es/layout/Sider";
import '../userPage/css/User.less'
import {getUserById} from "../../service/UserService";
import UserInformationComponent from "./content/UserInformationComponent";



class UserPage extends React.Component {
    state = {
        user: {},
    };

    getData = () => {
        let userId = this.props.match.params.id;

        getUserById(userId).then(response => {
            this.setState({user: response});
        });
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
            <Layout className ="user-page">
                <Sider><SiderComponent user={this.state.user}/></Sider>
                <Content><UserPageContent user={this.state.user}/></Content>
            </Layout>
    )
    }
}


export default withRouter(UserPage);