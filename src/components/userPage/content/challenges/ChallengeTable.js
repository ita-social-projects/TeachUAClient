import React from 'react';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./css/ChallengeTable.less";
import { deleteUserChallengeByUserIdChallengeId } from '../../../../service/UserChallengeService';
import { getUserId } from '../../../../service/StorageService';

const ChallengesTable = ({userChallenges, handleDeleteClick}) => {    
    
    const columns = [
        {
            title: 'Назва челенджу',
            dataIndex: 'challengeName',
            width: '20%',
            fixed:'left',
            render: (_,record) => <Link to={'/challenges/' + record.challengeId }>{record.challengeName}</Link>
        },
        { 
            title: 'Стутус користувача',
            dataIndex: 'userChallengeStatus',
            width: '10%',
            render: (_,record) => <Link to={'/challenges/' +record.challengeId}>{record.userChallengeStatus}</Link>
        },
        {
            title: 'Дата реєстрації',
            dataIndex: 'dateOfAdding',
            width: '10%',
            render: (_,record) => <Link to={'/challenges/' + record.challengeId}>{moment(record.dateOfAdding).format("YYYY-MM-DD")}</Link>
        },{
            title: 'Дата старту',
            dataIndex: 'startChallengeDate',
            width: '10%',
            render: (_,record) => <Link to={'/challenges/' + record.challengeId}>{moment(record.startChallengeDate[0]+"-"+record.startChallengeDate[1]+"-"+record.startChallengeDate[2]).format("YYYY-MM-DD")}</Link>
        },{
            title: 'Дата кінця',
            dataIndex: 'endChallengeDate',
            width: '10%',
            render: (_,record) => <Link to={'/challenges/' + record.challengeId}>{moment(record.endChallengeDate[0]+"-"+record.endChallengeDate[1]+"-"+record.endChallengeDate[2]).format("YYYY-MM-DD")}</Link>
        },
        {
            title: 'Управління',
            dataIndex: 'operation',
            width: '10%',
            fixed:'right',
            render: (_, record) =>
                <Popconfirm 
                title="Ви хочете відписатися?"
                cancelText="Ні"
                okText="Так"
                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                okButtonProps={{className: "popConfirm-ok-button"}}
                onConfirm={() => {
                    deleteUserChallengeByUserIdChallengeId(getUserId(),record);
                    handleDeleteClick(record);
                    }
                }>
                <a>Відписатись</a>
                </Popconfirm>
        }
    ];

    return( 
        <Table 
        className='profileChallengeTable'
        tableLayout="fixed" 
        dataSource={userChallenges} 
        columns={columns}
        scroll={{x:true}}
        />
    );
    
}

export default ChallengesTable;