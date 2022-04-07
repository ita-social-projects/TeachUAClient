import React, {useEffect, useState} from "react";
import {Redirect, Route, useRouteMatch} from "react-router-dom";
import SiderComponent from "./sider/UserSider";
import UserPageContent from "./content/UserPageContent";
import '../userPage/css/User.less'
import {getUserById} from "../../service/UserService";
import Layout, {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {deleteToken, deleteUserId, getToken, getUserId} from "../../service/StorageService";
import UserMessagesPage from "./content/messages/UserMessagesPage";

const UserPage = () => {

    const [user, setUser] = useState({});
    const [userPageActive, setUserPageActive] = useState(true);
    const [messagePageActive, setMessagePageActive] = useState(false);

    const routeMatch = useRouteMatch();

    useEffect(() => {
            getData();
        },
        [userPageActive, messagePageActive]
    );

    const getData = () => {
        getUserById(getUserId()).then(response => {
            setUser(response)
        }).catch(() => {
            window.location.assign(process.env.PUBLIC_URL)
            deleteToken();
            deleteUserId();
        });
    };

    if (!getToken()) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <Layout className="user-page">
            <Sider>
                <SiderComponent url={routeMatch.url} />
            </Sider>

            <Route exact path={`${routeMatch.path}/page`} >
                <UserPageContent user={user} id={user.id}/>
            </Route>

            <Route exact path={`${routeMatch.path}/messages`} component={UserMessagesPage} />
        </Layout>
    )
}

export default UserPage;

// Попередній варіант компонента
// class UserPage extends React.Component {
//     state = {
//         user: {},
//     };
//
//     getData = () => {
//         let userId = this.props.match.params.id;
//
//         getUserById(userId).then(response => {
//             this.setState({ user: response });
//         }).catch((error) => {
//             window.location.assign(process.env.PUBLIC_URL)
//             deleteToken();
//             deleteUserId();
//         });
//     };
//
//     componentDidMount() {
//         this.getData();
//     }
//
//     componentDidUpdate(preProps) {
//         if (preProps.match.params.id !== this.props.match.params.id) {
//             this.getData();
//         }
//     }
//
//     render() {
//         if (!getToken()) {
//             return (
//                 <Redirect to="/" />
//             )
//         }
//         return (
//             <Layout className="user-page">
//                 <Sider><SiderComponent user={this.state.user} /></Sider>
//                 <Content><UserPageContent user={this.state.user} id={this.props.match.params.id} /></Content>
//             </Layout>
//         )
//     }
// }
//
// export default withRouter(UserPage);
