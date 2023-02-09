import React from "react";
import {Table} from "antd";
import "./css/ChallengeTable.less";
import {ChallengeColumnStatusTag} from "../utils/ChallengeColumnStatusTag";

const ChallengeTable = ({challenge}) => {

    const challengeColumns = [
        {
            title: 'ID',
            dataIndex: 'challengeId',
            width: '17%',
            fixed:'left',
            render: (_, record) => <p>{record.challengeId}</p>
        },
        {
            title: 'Назва',
            dataIndex: 'challengeName',
            width: '50%',
            render: (_, record) => <p>{record.challengeName}</p>
        },
        {
            title : 'Статус',
            dataIndex : 'isActive',
            width : '33%',
            fixed:'right',
            render: (_, record) => <ChallengeColumnStatusTag status={record.isActive}/>
        }
    ];

    return (
        <>
            <div className="challengeTableContentTitle">Челендж</div>
            <Table className="challengeTable"
                   tableLayout="fixed"
                   dataSource={challenge}
                   pagination={false}
                   columns={challengeColumns}
                   scroll={{x: true}}
            />
        </>
    );
}

export default ChallengeTable;






