import React, {useState, useMemo} from "react";
import './App.less';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubComponent from "./components/club/ClubComponent";
import FooterComponent from "./components/footer/FooterComponent";
import ProjectComponent from "./components/ProjectComponent";
import {SearchContext} from "./context/SearchContext";

const { Sider, Content } = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        totalElements: 0
    });

    const clubProvider = useMemo(() => ({clubs, setClubs}), [clubs, setClubs]);

    return (
        <Router>
            <Layout className="layout">
                <div className="behind-header"/>
                <SearchContext.Provider value={clubProvider}>
                    <HeaderComponent/>
                    <Layout>
                        {false && (<Sider>Sider</Sider>)}
                        <Content className="content" style={{padding: '20px 50px', minHeight: 500}}>
                            <Switch>
                                <Route path="/clubs" component={ClubComponent}/>
                                <Route path="/projects" component={ProjectComponent}/>
                                <Route path="/" component={ClubComponent}/>
                            </Switch>
                        </Content>
                    </Layout>
                </SearchContext.Provider>
                <FooterComponent/>
            </Layout>
        </Router>
    );
}

export default App;
