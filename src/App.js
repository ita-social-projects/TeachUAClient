import React, {useMemo, useState} from "react";
import './App.less';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubListComponent from "./components/clubList/ClubListComponent";
import FooterComponent from "./components/footer/FooterComponent";
import {SearchContext} from "./context/SearchContext";
import ClubPage from "./components/clubPage/ClubPage";
import CenterPage from "./components/centerPage/CenterPage";
import MainComponent from "./components/mainPage/MainComponent";
import UserPage from "./components/userPage/UserPage";
import CityTable from "./components/admin/city/CityTable";
import UsersTable from "./components/admin/users/UsersTable";
import DistrictTable from "./components/admin/district/DistrictTable";
import OAuth2RedirectHandler from "./components/registration/OAuth2RedirectHandler";
import ServiceInUkr from "./components/serviceInUkr/ServiceInUkr";
import ContactTypeTable from "./components/admin/contactType/ContactTypeTable";
import AboutProject from "./components/AboutProject/AboutProject";
import VerifyPage from "./components/verifyPage/VerifyPage";
import ApproveClubTable from "./components/admin/club/approveClub/ApproveClubTable";
import QuestionTable from "./components/admin/question/QuestionTable";
import ImportDatabase from "./components/admin/databaseTransfer/ImportDatabase";
import ChangeOwnerTable from "./components/admin/club/changeOwner/ChangeOwnerTable";
import StationTable from "./components/admin/station/StationTable";
import CategoryTable from "./components/admin/category/CategoryTable";
import LogComponent from "./components/log/LogComponent";
import LogByNameComponent from "./components/log/LogByNameComponent";
import ChallengePage from "./components/challenges/ChallengePage";
import MarathonRegistrationPage from "./components/marathonPage/MarathonRegistrationPage";
import {PageContext} from "./context/PageContext";
import MarathonPage from "./components/marathonPage/MarathonPage";
import RegistrationPage from "./components/challenges/RegistrationPage";
import TaskPage from "./components/challenges/tasks/TaskPage";
import AddChallenge from "./components/admin/challenge/AddChallenge";
import EditChallenge from "./components/admin/challenge/EditChallenge";
import CloneChallenge from "./components/admin/challenge/CloneChallenge";
import AddTask from "./components/admin/task/AddTask";
import TasksTable from "./components/admin/task/TasksTable";
import ChallengesTable from "./components/admin/challenge/ChallengesTable";
import EditTask from "./components/admin/task/EditTask";
import ResetPasswordModal from "./components/restorePassword/passwordResetModal";
import MarathonTaskPage from "./components/marathonPage/marathonTaskPage/MarathonTaskPage";
import ScrollToTop from "./components/ScrollToTop";
import BannerItemsTable from "./components/admin/banner/BannerItemsTable";
import AboutUsEdit from "./components/AboutProject/AboutUsEdit";
import PreviousAboutProject from "./components/AboutProject/PreviousAboutProject";
import NotFoundPage from "./components/NotFoundPage";
import HardChallengePage from "./components/challengePage/ChallengePage";
import TeachUAChallenge from "./components/challengeTeachUkrainian/TeachUAChallenge";
import HardRegistrationPage from "./components/challengeTeachUkrainian/RegistrationPage";
import HardTaskPage from "./components/challengeTeachUkrainian/TaskPage/TaskPage";
import SpeakingClubPage from "./components/speakingClubPage/SpeakingClubPage";
import SpeakingClubRegistrationPage from "./components/speakingClubPage/SpeakingClubRegistrationPage";
import NewsListComponent from "./components/news/NewsListComponent";
import NewsPage from "./components/newsPage/NewsPage";
import NewsTable from "./components/admin/news/NewsTable";
import EditNews from "./components/admin/news/EditNews";


import FormTable from "./components/GoogleForms/FormTable";
import AddForm from "./components/GoogleForms/AddForm";
import ResultTable from "./components/GoogleForms/ResultTable";
import ArchiveTable from "./components/GoogleForms/ArchivedResults";
import QuestionFormTable from "./components/GoogleForms/QuestionsFormTable";
import OptionFormTable from "./components/GoogleForms/OptionFormTable";
import DontPush from "./components/GoogleForms/DontPush";

const {Content} = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [currentPage, setCurrentPage] = useState(0);

    const clubProvider = useMemo(() => ({clubs, setClubs}), [clubs, setClubs]);
    const pageProvider = useMemo(() => ({currentPage, setCurrentPage}), [currentPage, setCurrentPage]);

    return (
        <Layout className="layout">
            <div className="behind-header"/>
            <Router basename={process.env.PUBLIC_URL}>
                <ScrollToTop/>
                <PageContext.Provider value={pageProvider}>
                    <SearchContext.Provider value={clubProvider}>
                        <HeaderComponent/>
                        <Layout>
                            <Content className="global-content">
                                <Switch>
                                    <Route path="/admin/banners" exact component={BannerItemsTable}/>
                                    <Route path="/admin/challenge/task/:id" exact component={EditTask}/>
                                    <Route path="/admin/challenge/:id" exact component={EditChallenge}/>
                                    <Route path="/admin/challenge/:id/clone" exact component={CloneChallenge}/>
                                    <Route path="/admin/addTask" exact component={AddTask}/>
                                    <Route path="/admin/tasks" exact component={TasksTable}/>
                                    <Route path="/admin/addChallenge" exact component={AddChallenge}/>
                                    <Route path="/admin/challenges" exact component={ChallengesTable}/>
                                    <Route path="/admin/news" exact component={NewsTable}/>
                                    <Route path="/admin/news/:id" exact component={EditNews}/>
                                    <Route path="/admin/categories" exact component={CategoryTable}/>
                                    <Route path="/admin/districts" exact component={DistrictTable}/>
                                    <Route path="/admin/questions" exact component={QuestionTable}/>
                                    <Route path="/admin/users" exact component={UsersTable}/>
                                    <Route path="/admin/contact-types" exact component={ContactTypeTable}/>
                                    <Route path="/admin/import-database" exact component={ImportDatabase}/>
                                    <Route path="/admin/cities" exact component={CityTable}/>
                                    <Route path="/admin/questions" exact component={QuestionTable}/>
                                    <Route path="/admin/club-approve" exact component={ApproveClubTable}/>
                                    <Route path="/admin/change-club-owner" exact component={ChangeOwnerTable}/>
                                    <Route path="/admin/stations" exact component={StationTable}/>
                                    <Route path="/admin/about" exact component={AboutUsEdit}/>
                                    <Route path="/club/:id" exact component={ClubPage}/>
                                    <Route path="/center/:id" exact component={CenterPage}/>
                                    
                                    <Route path="/addForm" exact component={AddForm}/>
                                    <Route path="/clubs" exact component={ClubListComponent}/>
                                    <Route path="/forms" exact component={FormTable}/>
                                    <Route path="/result/:id" exact component={ResultTable}/>
                                    <Route path="/result_archived" exact component={ArchiveTable}/>
                                    <Route path="/question/:id" exact component={QuestionFormTable}/>
                                    <Route path="/option/:id" exact component={OptionFormTable}/>
                                    <Route path="/dont_push" exact component={DontPush}/>
                                    


                                    {/* Comment next 2 lines for prod version */}
                                    <Route path="/news" exact component={NewsListComponent}/>
                                    <Route path="/news/:id" exact component={NewsPage}/>
                                    {/*The previous version of this route*/}
                                    {/*<Route path="/user/:id" exact component={UserPage}/>*/}
                                    <Route path="/user/:id" component={UserPage} />
                                    <Route path="/verify" exact component={VerifyPage}/>
                                    <Route path="/verifyreset" exact component={ResetPasswordModal}/>
                                    <Route path="/oauth2/redirect" exact component={OAuth2RedirectHandler}/>
                                    <Route path="/service" exact component={ServiceInUkr}/>
                                    {/*<Route path="/about" exact component={PreviousAboutProject}/>*/}
                                    <Route path="/about" exact component={AboutProject}/>
                                    <Route path="/logs" exact component={LogComponent}/>
                                    <Route path="/log/:id" exact component={LogByNameComponent}/>
                                    <Route path="/challenges/registration/:challengeId" exact
                                           component={RegistrationPage}/>
                                    <Route path="/challenges/:challengeId" exact component={ChallengePage}/>
                                    <Route path="/challenges/task/:taskId" exact component={TaskPage}/>
                                    <Route path="/marathon" exact component={MarathonPage}/>
                                    <Route path="/marathon/registration" exact component={MarathonRegistrationPage}/>
                                    <Route path="/marathon/task/:pathUrl" exact component={MarathonTaskPage}/>
                                    <Route path="/challenge" exact component={HardChallengePage}/>
                                    <Route path="/challengeUA" exact component={TeachUAChallenge}/>
                                    <Route path="/challengeUA/registration" exact component={HardRegistrationPage}/>
                                    <Route path="/challengeUA/task/:pathUrl" exact component={HardTaskPage}/>
                                    <Route path="/marathon" exact component={MarathonPage}/>
                                    <Route path="/speakingclub" exact component={SpeakingClubPage}/>
                                    <Route path="/speakingclub/registration" exact component={SpeakingClubRegistrationPage}/>
                                    <Route path="/" exact component={MainComponent}/>
                                    <Route path="*" exact component={NotFoundPage}/>
                                    
                                </Switch>
                            </Content>
                        </Layout>
                    </SearchContext.Provider>
                </PageContext.Provider>
                <FooterComponent/>
            </Router>
        </Layout>
    );
}

export default App;