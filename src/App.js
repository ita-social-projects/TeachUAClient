import React, {useMemo, useState, useEffect} from "react";
import './App.less';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubComponent from "./components/clubs/ClubComponent";
import FooterComponent from "./components/footer/FooterComponent";
import {SearchContext, searchParameters} from "./context/SearchContext";
import ClubPage from "./components/clubPage/ClubPage";
import {getCityById} from "./service/CityService";
import {MapSearchContext} from "./context/SearchContext";

const {Sider, Content} = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        totalElements: 0
    });

    const [mapClubs, setMapClubs] = useState({
        content: [],
        pageable: {},
        totalElements: 0
    });

    const clubProvider = useMemo(() => ({clubs, setClubs}), [clubs, setClubs]);
    const mapClubProvider = useMemo(() => ({mapClubs, setMapClubs}), [mapClubs, setMapClubs]);

    return (
        <Router>
            <Layout className="layout">
                <div className="behind-header"/>
                <SearchContext.Provider value={clubProvider}>
                    <MapSearchContext.Provider value={mapClubProvider}>
                        <HeaderComponent/>
                        <Layout>
                            {false && (<Sider>Sider</Sider>)}
                            <Content className="global-content">
                                <Switch>
                                    <Route path="/clubs" exact component={ClubComponent}/>
                                    <Route path="/club/:id" exact component={ClubPage}/>
                                    <Route path="/" component={ClubComponent}/>
                                </Switch>
                            </Content>
                        </Layout>
                    </MapSearchContext.Provider>
                </SearchContext.Provider>
                <FooterComponent/>
            </Layout>
        </Router>
    );
}

export default App;
