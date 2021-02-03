import React, {useState, useMemo} from "react";
import './App.less';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent";
import Club from "./components/club/Club";
import FooterComponent from "./components/FooterComponent";
import ProjectComponent from "./components/ProjectComponent";
import {SearchContext} from "./context/SearchContext";

const {Content} = Layout;

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
                    <Content className="content" style={{padding: '20px 50px', 'min-height': '83vh'}}>
                        <Switch>
                            <Route path="/clubs" component={Club}/>
                            <Route path="/projects" component={ProjectComponent}/>
                            <Route path="/" component={Club}/>
                        </Switch>
                    </Content>
                </SearchContext.Provider>
                <FooterComponent/>
            </Layout>
        </Router>
    );
}

export default App;
