import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {getTaskProfile} from "../../../service/ChallengeService";
import {BrowserRouter} from "react-router-dom";
import TaskContent from "./TaskContent";
import {Layout, Result} from "antd";
import "../css/ChallengeTaskPage.css"

const TaskPage = () => {
    const {taskId} = useParams();
    const [task, setTask] = useState({
        id: 0,
        name: "",
        headerText: "",
        description: "",
        picture: ""
    });

    useEffect(() => {
        getTaskProfile(taskId).then((response) => {
            if (response.status > 400) {
                setTask(undefined);
            } else {
                setTask(response)
            }
        });
    }, []);


    return (
        <Layout className="challenge-task-page">
            {task ?
                <BrowserRouter>
                    <ScrollToTop>
                        <TaskContent task={task}/>
                    </ScrollToTop>
                </BrowserRouter>
                :
                <Result
                    className="task-not-found"
                    status="404"
                    title="404"
                    subTitle="Завдання яке ви намагаєтесь відкрити не існує або у вас немає до нього доступу"
                />}

        </Layout>
    );
}

const ScrollToTop = ({children}) => {
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return children || null;
};

export default TaskPage;