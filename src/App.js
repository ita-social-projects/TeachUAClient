import React, {useEffect, useMemo, useState} from "react";
import './App.less';
import {Button, Layout, Result, Spin} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubListComponent from "./components/clubList/ClubListComponent";
import FooterComponent from "./components/footer/FooterComponent";
import {SearchContext} from "./context/SearchContext";
import {UriContext} from "./context/UriContext";
import ClubPage from "./components/clubPage/ClubPage";
import MainComponent from "./components/main/MainComponent";
import {GetUri, ROOT_URI} from "./config/ApplicationConfig";
import UserPage from "./components/userPage/UserPage";
import EditorComponent from "./components/editor/EditorComponent";
import {getBaseUri} from "./service/ApplicationService";
import Loader from "./components/Loader";

const {Sider, Content} = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [loading, setLoading] = useState(true);
    const [uri, setUri] = useState(null);

    const clubProvider = useMemo(() => ({clubs, setClubs}), [clubs, setClubs]);

    useEffect(() => {
        getBaseUri().then(response => {
            setUri(response);
            setLoading(false);
        });
    }, []);

    return (
        <Layout className="layout">
            <div className="behind-header"/>
            {uri ? (<UriContext.Provider value={uri}>
                    <Router basename={uri}>
                        <SearchContext.Provider value={clubProvider}>
                            <HeaderComponent/>
                            <Layout>
                                <Content className="global-content">
                                    <Switch>
                                        <Route path="/test" exact component={EditorComponent}/>
                                        <Route path="/club/:id" exact component={ClubPage}/>
                                        <Route path="/clubs" exact component={ClubListComponent}/>
                                        <Route path="/user/:id" exact component={UserPage}/>
                                        <Route path="/" component={MainComponent}/>
                                    </Switch>
                                </Content>
                            </Layout>
                        </SearchContext.Provider>
                        <FooterComponent/>
                    </Router>
                </UriContext.Provider>)
                : !loading ? <Result status="500"
                                     title="500"
                                     subTitle="Сайт на канікулах :)"
                                     extra="No database connection"/> : <Loader/>}
        </Layout>
    );
}

export default App;
