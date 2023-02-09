import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./css/DurationTable.less";
import {Button, message, Popconfirm, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import moment from "moment/moment";
import AddDuration from "./AddDuration";
import {Sorter} from "../utils/Sorter";
import {StatusFilterDate} from "../utils/StatusFilterDate";
import {GetColumnFilterDateProps} from "../utils/ColumnFilterDateProps";
import {DurationColumnStatusTag} from "../utils/DurationColumnStatusTag";
import {createDuration, deleteChallengeDuration, existUsers} from "../../../../../service/ChallengeDurationService";
import {getAllForChallengeDurationTable} from "../../../../../service/UserChallengeService";
import {waitFor} from "@testing-library/react";

const DurationTable = ({challengeId, challengeDurations, setChallengeDurations}) => {

    const [visibleBlock, setVisibleBlock] = useState(false);
    const visibility = () => { setVisibleBlock(true); }

    const formatDateForColumn = (value) => {
        if (value == null){
            return moment().format("DD-MM-YYYY");
        }
        return moment(value[0] + "-" + value[1] + "-" + value[2])
            .format("DD-MM-YYYY");

    }

    const getTitle = (data) => {
        if (data.userExist === true){
            return ("Містить користувачів видалити?");
        }else {
            return("Ви хочете видалити?");
        }
    }


    const challengeDurationColumns = [
        {
            title: 'Старт',
            dataIndex: 'startDate',
            fixed:'left',
            width:'30%',
            sorter: {compare: (a, b) => Sorter.DATE(a.startDate, b.startDate)},
            ...GetColumnFilterDateProps('startDate'),
            render: (_, record) => <
                Link to={{
                    pathname: "/admin/user-challenge/" + record.challengeId + "/duration/" + record.durationId,
                    state: {
                        challengeId: record.challengeId,
                        durationId: record.durationId
                    }
                }}>
                {
                    <p>{formatDateForColumn(record.startDate)}</p>}
                </Link>,
        },
        {
            title: 'Кінець',
            dataIndex: 'endDate',
            width:'30%',
            sorter: { compare: (a, b) => Sorter.DATE(a.endDate, b.endDate) },
            ...GetColumnFilterDateProps('endDate'),
            render: (_, record) =>
                <Link to={{
                    pathname: "/admin/user-challenge/" + record.challengeId + "/duration/" + record.durationId,
                    state: {
                        challengeId: record.challengeId,
                        durationId: record.durationId
                    }
                }}>
                {
                    <p>{formatDateForColumn(record.endDate)}</p>}
                </Link>
        },
        {
            title: 'Статус',
            dataIndex: 'statusName',
            width:'20%',
            ...StatusFilterDate(['startDate', 'endDate']),
            render: (_, record) =>
                <Link to={{
                    pathname: "/admin/user-challenge/" + record.challengeId + "/duration/" + record.durationId,
                    state: {
                        challengeId: record.challengeId,
                        durationId: record.durationId
                    }
                }}>
                <DurationColumnStatusTag startDate={record.startDate} endDate={record.endDate}/>
                </Link>,
        },
        {
            title: 'Управління',
            dataIndex: 'operation',
            width:'20%',
            fixed:'right',
            render: (_, record) =>
                <Popconfirm
                    title={getTitle(record)}
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => {
                        handleDeleteClick(record);
                    }}
                >
                    <a>Видалити</a>
                </Popconfirm>
        }
    ];

    const onAddDuration = async (values) => {
        console.log("addon click ",values)
        let uniqueDuration = unique(values, ['startDate', 'endDate']);
        message.success(await createDuration(uniqueDuration, challengeId));
        getAllForChallengeDurationTable(challengeId).then(response => {
            setChallengeDurations(response);
        });
    }

    const unique = (arr, props = []) => [...new Map(arr.map(entry => [props.map(k => entry[k]).join('|'), entry])).values()];

    const handleDeleteClick = (value) => {
        deleteChallengeDuration(challengeId, value).then(response => {
            if (response.status) {
                message.warning(response.message);
            } else {
                const newDurations = [...challengeDurations];
                const index = challengeDurations.findIndex((data) => (data.startDate === value.startDate) && (data.endDate === value.endDate));
                newDurations.splice(index, 1);
                setChallengeDurations(newDurations);
                message.success(`Ви видалили проміжок  - ${formatDateForColumn(value.startDate)} / ${formatDateForColumn(value.endDate)}`);
            }
        })
    }

    return (
        <>
            <div className="durationTableContentTitle">
                Тривалості
                <Button style={{color: "black", marginLeft: "15px"}} onClick={visibility} icon={<PlusOutlined/>}>
                    Додати тривалості
                </Button>
            </div>
            {
                visibleBlock ? (
                    <AddDuration visibleBlock={setVisibleBlock} onAddDuration={onAddDuration}/>
                ) : null
            }
            {
                challengeDurations.length > 0 ?
                    (
                        <Table
                            className="durationTable"
                            tableLayout="fixed"
                            dataSource={challengeDurations}
                            columns={challengeDurationColumns}
                            scroll={{x: true}}
                        />
                    ) : null
            }
        </>
    );
}

export default DurationTable;