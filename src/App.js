import React, {useMemo, useState} from "react";
import './App.less';
import {Layout} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./components/header/HeaderComponent";
import ClubListComponent from "./components/clubList/ClubListComponent";
import FooterComponent from "./components/footer/FooterComponent";
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
import ValidateCertificatePage from "./components/certificate/validation/ValidateCertificatePage";

import QuestionsTable  from "./components/admin/quiz/QuestionsTable";
import ImportQuestionsData from "./components/admin/quiz/ImportQuestionsData"
import ImportQuestionExcelData from "./components/admin/quiz/ImportQuestionExcelData"
import ImportCertificateData from "./components/admin/certificate/ImportCertificateData";
import CertificatesTable from "./components/admin/certificate/CertificatesTable";
import CertificatesSearch from "./components/certificate/CertificatesSearch";
import BrokenClubContent from "./components/admin/fix-clubs-categories/BrokenClubContent";

import {AllFileList} from "./components/admin/files/AllFileList";
import {UnusedFileList} from "./components/admin/files/UnusedFileList";

import {PageContext} from "./context/PageContext";
import {SearchContext} from "./context/SearchContext";
import {AuthContext} from "./context/AuthContext";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";

const {Content} = Layout;

function App() {
    const [clubs, setClubs] = useState({
        content: [],
        pageable: {},
        size: 0,
        totalElements: 0
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState({});

    const clubProvider = useMemo(() => ({clubs, setClubs}), [clubs, setClubs]);
    const pageProvider = useMemo(() => ({currentPage, setCurrentPage}), [currentPage, setCurrentPage]);

    return (
        <Layout className="layout">
            <div className="behind-header"/>
            <Router basename={process.env.PUBLIC_URL}>
                <ScrollToTop/>
                <AuthContext.Provider value={{showLogin, setShowLogin, user, setUser}}>
                <PageContext.Provider value={pageProvider}>
                <SearchContext.Provider value={clubProvider}>
                    <HeaderComponent/>
                    <Layout>
                        <Content className="global-content">
                            <Switch>
                                <AdminRoute path="/admin/banners" exact component={BannerItemsTable}/>
                                <AdminRoute path="/admin/challenge/task/:id" exact component={EditTask}/>
                                <AdminRoute path="/admin/challenge/:id" exact component={EditChallenge}/>
                                <AdminRoute path="/admin/challenge/:id/clone" exact component={CloneChallenge}/>
                                <AdminRoute path="/admin/addTask" exact component={AddTask}/>
                                <AdminRoute path="/admin/tasks" exact component={TasksTable}/>
                                <AdminRoute path="/admin/addChallenge" exact component={AddChallenge}/>
                                <AdminRoute path="/admin/challenges" exact component={ChallengesTable}/>
                                <AdminRoute path="/admin/news" exact component={NewsTable}/>
                                <AdminRoute path="/admin/news/:id" exact component={EditNews}/>
                                <AdminRoute path="/admin/categories" exact component={CategoryTable}/>
                                <AdminRoute path="/admin/districts" exact component={DistrictTable}/>
                                <AdminRoute path="/admin/fix-clubs-categories" exact component={BrokenClubContent}/>
                                <AdminRoute path="/admin/questions" exact component={QuestionTable}/>
                                <AdminRoute path="/admin/users" exact component={UsersTable}/>
                                <AdminRoute path="/admin/contact-types" exact component={ContactTypeTable}/>
                                <AdminRoute path="/admin/import-database" exact component={ImportDatabase}/>
                                <AdminRoute path="/admin/cities" exact component={CityTable}/>
                                <AdminRoute path="/admin/questions" exact component={QuestionTable}/>
                                <AdminRoute path="/admin/club-approve" exact component={ApproveClubTable}/>
                                <AdminRoute path="/admin/change-club-owner" exact component={ChangeOwnerTable}/>
                                <AdminRoute path="/admin/stations" exact component={StationTable}/>
                                <AdminRoute path="/admin/about" exact component={AboutUsEdit}/>
                                <AdminRoute path="/admin/questions/generate" exact component={ImportQuestionExcelData}/>
                                <AdminRoute path="/admin/certificate/generate" exact component={ImportCertificateData}/>
                                <AdminRoute path="/admin/questions-import" exact component={ImportQuestionsData}/>
                                <AdminRoute path="/admin/quiz/questions"  exact component={QuestionsTable}/>
                                <AdminRoute path="/admin/certificates" exact component={CertificatesTable}/>
                                <AdminRoute path="/admin/files" exact component={AllFileList}/>
                                <AdminRoute path="/admin/files/:path+" exact component={AllFileList}/>
                                <AdminRoute path="/admin/unused-files" exact component={UnusedFileList}/>
                                <AdminRoute path="/logs" exact component={LogComponent}/>
                                <AdminRoute path="/log/:id" exact component={LogByNameComponent}/>
                                <UserRoute path="/user/:id" component={UserPage} />
                                <Route path="/club/:id" exact component={ClubPage}/>
                                <Route path="/center/:id" exact component={CenterPage}/>
                                <Route path="/clubs" exact component={ClubListComponent}/>
                                {/* Comment next 2 lines for prod version */}
                                <Route path="/news" exact component={NewsListComponent}/>
                                <Route path="/news/:id" exact component={NewsPage}/>
                                {/*The previous version of this route*/}
                                {/*<Route path="/user/:id" exact component={UserPage}/>*/}
                                <Route path="/verify" exact component={VerifyPage}/>
                                <Route path="/verifyreset" exact component={ResetPasswordModal}/>
                                <Route path="/oauth2/redirect" exact component={OAuth2RedirectHandler}/>
                                <Route path="/service" exact component={ServiceInUkr}/>
                                {/*<Route path="/about" exact component={PreviousAboutProject}/>*/}
                                <Route path="/about" exact component={AboutProject}/>
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
                                <Route path="/certificate/:serialNumber" exact component={ValidateCertificatePage}/>
                                <Route path="/certificate" exact component={CertificatesSearch}/>
                                <Route path="/" exact component={MainComponent}/>
                                <Route path="*" exact component={NotFoundPage}/>
                            </Switch>
                        </Content>
                    </Layout>
                </SearchContext.Provider>
                </PageContext.Provider>
                </AuthContext.Provider>
                <FooterComponent/>
            </Router>
        </Layout>
    );
}

export default App;