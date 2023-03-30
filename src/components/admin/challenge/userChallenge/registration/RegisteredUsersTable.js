import {
    Button, Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Popconfirm,
    Select,
    Space,
    Table,
    Typography
} from 'antd';
import React, {useEffect, useState} from 'react';
import {Sorter} from "../utils/Sorter";
import {GetColumnSearchProps} from "../utils/ColumnSerchProps";
import {GetColumnFilterDateProps} from "../utils/ColumnFilterDateProps";
import moment from "moment/moment";
import "./css/RegistrationUsersTable.less";
import {
    deleteUserChallengeByUserIdDurationId,
    getAllNotRegisteredUsersByDurationId,
    getAllUsersByDurationId, updateUserChallengeFromAdmin
} from "../../../../../service/UserChallengeService";
import {
    deleteUserChallengeStatus,
    getAllUserChallengeStatusOptions
} from "../../../../../service/UserChallengeStatusService";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          challengeStatuses,
                          ...restProps
                      }) => {
    const inputNode = (inputType, dataIndex) => {
        if (dataIndex === "userChallengeStatus") {
            return <Select
                style={{width: 120}}
                options={challengeStatuses}
            />
        } else {
            return inputType === 'number' ? <InputNumber/> : <Input/>
        }
    }
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Заповніть поле ${title}!`,
                        },
                    ]}
                >
                    {inputNode(inputType, dataIndex)}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const RegisteredUsersTable = ({registeredUsers, setRegisteredUsers, handleDeleteClick}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [challengeStatuses, setChallengeStatuses] = useState([]);
    const [editingUserChallengeId, setEditingUserChallengeId] = useState('');

    const isEditing = (record) => record.userChallengeId === editingUserChallengeId;

    useEffect(() => {
            getData()
        }, []
    );
    const getData = () => {
        getAllUserChallengeStatusOptions().then(response => {
            setChallengeStatuses(response);
        });

    }


    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingUserChallengeId(record.userChallengeId);
    };
    const cancel = () => {
        setEditingUserChallengeId('');
    };
    const save = async (userChallengeId, userId) => {
        try {
            const row = await form.validateFields();
            const newRegisteredUsers = [...registeredUsers];
            const index = newRegisteredUsers.findIndex((item) => userChallengeId === item.userChallengeId);
            if (index > -1) {
                const item = newRegisteredUsers[index];
                newRegisteredUsers.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const updateInfo = await updateUserChallengeFromAdmin(userChallengeId, userId, row);
                message.success(`Ви успішно оновили челендж ${updateInfo}!`);
                setRegisteredUsers(newRegisteredUsers);
                setEditingUserChallengeId('');
            } else {
                newRegisteredUsers.push(row);
                setRegisteredUsers(newRegisteredUsers);
                setEditingUserChallengeId('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'userChallengeId',
            width: '60px',
            fixed: 'left',
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.userChallengeId, b.userChallengeId),
                multiple: 3
            },
            render: (_, record) => <p>{record.userChallengeId}</p>
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            width: 80,
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
            editable: true,
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
            editable: true,
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
            editable: true,
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
            editable: true,
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

            onFilter: (value, record) => record.roleName.indexOf(value) === '',
            render: (_, record) => <p>{record.roleName}</p>

        },
        {
            title: 'Статус',
            dataIndex: 'userChallengeStatus',
            width: 120,
            editable: true,
            sorter: {
                compare: (a, b) => Sorter.DEFAULT(a.userChallengeStatus, b.userChallengeStatus),
            },
            filters: [
                {
                    text: 'Added',
                    value: 'ADDED',
                },
                {
                    text: 'In progress',
                    value: 'IN_PROGRESS',
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

            onFilter: (value, record) => record.userChallengeStatus.indexOf(value) === '',
            render: (_, record) => <p>{record.userChallengeStatus}</p>

        },
        {
            title: 'Дата реєстрації',
            dataIndex: 'registrationChallengeDate',
            width: 170,
            sorter: {
                compare: (a, b) => Sorter.DATE(a.registrationChallengeDate, b.registrationChallengeDate),
                multiple: 3
            },
            ...GetColumnFilterDateProps('registrationChallengeDate'),
            render: (_, record) =>
                <p>{moment(record.registrationChallengeDate).format("YYYY-MM-DD")}</p>
        },
        {
            title: 'Управління',
            width: 110,
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button type='link'
                                    style={{color:'black'}}
                                    onClick={() => save(record.userChallengeId, record.userId)}

                            >
                                Зберегти
                            </Button>
                            <Popconfirm
                                title="Ви хочете скасувати?"
                                cancelText="Ні"
                                okText="Так"
                                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                                okButtonProps={{className: "popConfirm-ok-button"}}
                                onConfirm={cancel}>
                                <Button type='link'
                                        className='userChallengeStatusDeleteButton'
                                >
                                    Скасувати
                                </Button>
                            </Popconfirm>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{display: 'flex', flexDirection: 'column'}}>

                            <Button type='link' style={{color:'black'}} disabled={editingUserChallengeId !== ''} onClick={() => edit(record)}>
                                Редагувати
                            </Button>
                            <Popconfirm
                                title="Ви хочете видалити?"
                                cancelText="Ні"
                                okText="Так"
                                disabled={editingUserChallengeId !== ''}
                                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                                okButtonProps={{className: "popConfirm-ok-button"}}
                                onConfirm={() => {
                                    handleDeleteClick(record);
                                }
                                }>
                                <Button type='link'
                                        className='userChallengeStatusDeleteButton'
                                        disabled={editingUserChallengeId !== ''}>
                                    Видалити
                                </Button>
                            </Popconfirm>
                        </div>
                    </>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                challengeStatuses: challengeStatuses
            }),
        };
    });
    return (
        <>
        <div className="registrationPageContentTitle">Зареєстровані користувачі</div>

        <Form form={form} component={false}>
            <Table
                className="registeredUsersTable"
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                tableLayout="fixed"
                dataSource={registeredUsers}
                columns={mergedColumns}
                scroll={{
                    x: true
                }}
            />
        </Form>
        </>
    );
};
export default RegisteredUsersTable;