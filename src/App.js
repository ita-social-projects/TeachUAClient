import React, { useMemo, useState } from "react";
import './App.less';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubListComponent from "./components/clubList/ClubListComponent";
import FooterComponent from "./components/footer/FooterComponent";
import { SearchContext } from "./context/SearchContext";
import ClubPage from "./components/clubPage/ClubPage";
import MainComponent from "./components/mainPage/MainComponent";
import UserPage from "./components/userPage/UserPage";
import CityTable from "./components/admin/city/CityTable";
import UsersTable from "./components/admin/users/UsersTable";
import DistrictTable from "./components/admin/district/DistrictTable";
import OAuth2RedirectHandler from "./components/registration/OAuth2RedirectHandler";
import ServiceInUkr from "./components/serviceInUkr/ServiceInUkr";
import ContactTypeTable from "./components/admin/contactType/ContactTypeTable";
import AboutProject from "./components/AboutProject/AboutProject";


const { Sider, Content } = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });


    const clubProvider = useMemo(() => ({ clubs, setClubs }), [clubs, setClubs]);

    return (
        <Layout className="layout">
            <div className="behind-header" />
            <Router basename={process.env.PUBLIC_URL}>
                <SearchContext.Provider value={clubProvider}>
                    <HeaderComponent />
                    <Layout>
                        <Content className="global-content">
                            <Switch>
                                <Route path="/admin/districts" exact component={DistrictTable}/>
                                <Route path="/admin/users" exact component={UsersTable}/>
                                <Route path="/admin/contact-types" exact component={ContactTypeTable}/>
                                <Route path="/admin/cities" exact component={CityTable}/>
                                <Route path="/club/:id" exact component={ClubPage}/>
                                <Route path="/clubs" exact component={ClubListComponent}/>
                                <Route path="/user/:id" exact component={UserPage}/>
                                <Route path="/oauth2/redirect" exact component={OAuth2RedirectHandler} />
                                <Route path="/service" exact component={ServiceInUkr} />
                                <Route path="/about" exact component={AboutProject} />
                                <Route path="/" component={MainComponent} />
                            </Switch>
                        </Content>
                    </Layout>
                </SearchContext.Provider>
                <FooterComponent />
            </Router>
        </Layout>
    );
}

export default App;
