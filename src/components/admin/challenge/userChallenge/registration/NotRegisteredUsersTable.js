import React from "react";
import "./css/NotRegisteredUsersTable.less";
import {Popconfirm, Table} from "antd";
import {Sorter} from "../utils/Sorter";
import {GetColumnSearchProps} from "../utils/ColumnSerchProps";
import {registrationByUserIdDurationId} from "../../../../../service/UserChallengeService";


const NotRegisteredUsersTable = ({users, handleAddClick, handleDeleteClickNotReg}) => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            width: 80,
            fixed: 'left',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.userId, b.userId),
                multiple: 3
            },
            render: (_, record) => <p>{record.userId}</p>
        },
        {
            title: 'Імя',
            dataIndex: 'firstName',
            width: 130,
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
            width: 130,
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
            width: 150,
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
            width: 130,
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.phone, b.phone),
            },
            ...GetColumnSearchProps('phone'),
            render: (_, record) => <p>{record.phone}</p>

        },
        {
            title: 'Роль',
            dataIndex: 'roleName',
            width: 140,
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
            render: (_, record) => <p>{record.roleName}</p>,

        },
        {
            title: 'Управління',
            dataIndex: 'operation',
            width: 110,
            fixed: 'right',
            render: (_, record) =>
                <Popconfirm
                    title="Ви хочете додати?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => {
                        handleAddClick(record);
                    }}>
                    <a>Додати</a>
                </Popconfirm>
        }
    ];

    return (
        <><div className="registrationPageContentTitle">Незареєстровані користувачі</div>

        <Table
            className="notRegisteredUsersTable"
            tableLayout="fixed"
            dataSource={users}
            columns={columns}
            scroll={{
                x: true
            }}
        />
            </>
    );
}

export default NotRegisteredUsersTable;