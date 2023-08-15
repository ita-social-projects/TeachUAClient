import React, {useEffect, useState} from "react";
import {getTasksByChallenge} from "../../../service/TaskService";
import {useParams} from "react-router-dom";
import {Table, Tooltip} from "antd";
import dayjs from 'dayjs';

const TasksInChallenge = () => {
    const [taskPreview, setTaskPreview] = useState();
    const [loading, setLoading] = useState(true);
    const [challengeNotFound, setChallengeNotFound] = useState(false);
    const challengeId  = useParams();

    const getTasksInChallenge = (challengeId) => {
        getTasksByChallenge(challengeId.id).then(response => {
            console.log(response);
            setTaskPreview(response);
        }).catch(response => {
            if(response.status === 404){
                setChallengeNotFound(true);
            }
        });
        setLoading(false);
    };

    useEffect(() => {
        getTasksInChallenge(challengeId);
    }, [challengeId]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix()
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '35%',
        },
        {
            title: 'Заголовок',
            dataIndex: 'headerText',
            width: '35%',
            onCell: () => {
                return {
                    style: {
                        whiteSpace: 'nowrap',
                        maxWidth: 150,
                    }
                }
            },
            render: (text) => (
                <Tooltip title={text}>
                    <div style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>{text}</div>
                </Tooltip>
            )
        },
        {
            title: 'Дата початку',
            dataIndex: 'startDate',
            width: '35%',
            render: (text)=>dayjs(text.toString()).format('YYYY-MM-DD'),
        }
    ];

    return (
        <div>
            <Table columns={columns} dataSource={taskPreview} />
        </div>
    )
}
export default TasksInChallenge;