import React from "react";
import moment from "moment";
import "./css/RegistrationUsersTable.less";
import {Popconfirm, Table} from "antd";
import {Sorter} from "../utils/Sorter";
import {GetColumnSearchProps} from "../utils/ColumnSerchProps";
import {GetColumnFilterDateProps} from "../utils/ColumnFilterDateProps";
import {deleteUserChallengeByUserIdDurationId} from "../../../../../service/UserChallengeService";

const RegisteredUsersTable = ({challengeId, users, durationId, handleDeleteClick}) => {
    const formatDateForColumn = async (value) => {
        if (value == null){
            return moment().format("DD-MM-YYYY");
        }
        await console.log("format ", value)
        return moment(value[0] + "-" + value[1] + "-" + value[2])
            .format("DD-MM-YYYY");

    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            width: '6%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.userId, b.userId),
                multiple: 3
            },
            render: (_, record) => <p>{record.userId}</p>
        },
        {
            title: 'Імя',
            dataIndex: 'firstName',
            width: '12%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.firstName, b.firstName),
                multiple: 3
            },
            ...GetColumnSearchProps('firstName'),
            render: (_, record) => <p>{record.firstName}</p>
        },
        {
            title: 'Прізвище',
            dataIndex: 'lastName',
            width: '15%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.lastName, b.lastName),
                multiple: 3
            },
            ...GetColumnSearchProps('lastName'),
            render: (_, record) => <p>{record.lastName}</p>
        },
        {
            title: 'Пошта',
            dataIndex: 'email',
            width: '15%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.email, b.email),
                multiple: 3
            },
            ...GetColumnSearchProps('email'),
            render: (_, record) => <p>{record.email}</p>
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            width: '15%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.phone, b.phone),
            },
            ...GetColumnSearchProps('phone'),
            render: (_, record) => <p>{record.phone}</p>

        },
        {
            title: 'Роль',
            dataIndex: 'roleName',
            width: '15%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.roleName, b.roleName),
            },
            filters: [
                {
                    text: 'Admin',
                    value: 'ROLE_ADMIN',
                },
                {
                    text: 'User',
                    value: 'ROLE_USER',
                }
            ],

            onFilter: (value, record) => record.roleName.indexOf(value) === 0,
            render: (_, record) => <p>{record.roleName}</p>

        },
        {
            title: 'Статус',
            dataIndex: 'userChallengeStatus',
            width: '15%',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.userChallengeStatus, b.userChallengeStatus),
            },
            filters: [
                {
                    text: 'Added',
                    value: 'ADDED',
                },
                {
                    text: 'Active',
                    value: 'ACTIVE',
                },
                {
                    text: 'Check if passed',
                    value: 'CHECK_IF_PASSED',
                },
                {
                    text: 'Finished',
                    value: 'FINISHED',
                }
            ],

            onFilter: (value, record) => record.userChallengeStatus.indexOf(value) === 0,
            render: (_, record) => <p>{record.userChallengeStatus}</p>

        },
        {
            title: 'Дата реєстрації',
            dataIndex: 'registrationChallengeDate',
            width: '15%',
            sorter: {
                compare: (a, b) => Sorter.DATE(a.registrationChallengeDate, b.registrationChallengeDate),
                multiple: 3
            },
            ...GetColumnFilterDateProps('registrationChallengeDate'),
            render: (_, record) =>
                <p>{formatDateForColumn(record.registrationChallengeDate)}</p>
        },
        {
            title: 'Управління',
            dataIndex: 'operation',
            width: '11%',
            render: (_, record) =>
                <Popconfirm
                    title="Ви хочете видалити?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => {
                        deleteUserChallengeByUserIdDurationId(record.userId, challengeId, durationId);
                        handleDeleteClick(record);
                    }
                    }
                >
                    <a>Видалити</a>
                </Popconfirm>
        }
    ];

    return (

        <Table
            className="registeredUsersTable"
            tableLayout="fixed"
            dataSource={users}
            columns={columns}
        />
    );
}

export default RegisteredUsersTable;