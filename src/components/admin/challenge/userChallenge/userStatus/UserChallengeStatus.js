import React, {useState, useEffect} from 'react';
import "./css/UserChallengeStatus.less";
import {Button, Form, Input, message, Popconfirm, Table, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {
    addUserChallengeStatus,
    checkIfUserChallengeStatusIdExist,
    deleteUserChallengeStatus,
    getAllUserChallengeStatus,
    updateUserChallengeStatus
} from '../../../../../service/UserChallengeStatusService';

const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {

    const inputNode = <Input/>;

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
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const UserChallengeStatus = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getAllUserChallengeStatus().then(response => {
            if (!response.status) {
                setData(response);
            }
        });
    };

    const isEditing = (record) => record.id === editingId;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingId(record.id);
    };

    const save = async (id) => {
        const filterRegex = /^[A-Z]+$/;
        try {
            const row = await form.validateFields();
            if (row.statusName.match(filterRegex)) {
                const newData = [...data];
                const index = newData.findIndex((item) => id === item.id);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    const resultCheckIfExist = await checkIfUserChallengeStatusIdExist(id);
                    if (resultCheckIfExist === true) {
                        await updateUserChallengeStatus(id, row.statusName);
                    } else {
                        await addUserChallengeStatus(row.statusName);

                    }
                    setData(newData);
                    setEditingId(0);
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingId(0);
                }
            } else {
                message.error("Статус може складатись лише з великих букв");
            }
        } catch (errInfo) {
            message.error('Помилка не вдалось зберегти данні');
        }
    };

    const cancel = () => {
        const id = form.getFieldValue("id");
        const filterRegex = /^[A-Z]+$/;
        const statusNameFromData = data.find(val => val.id === id);
        if (!statusNameFromData.statusName.match(filterRegex) || statusNameFromData.statusName === '') {
            handleDelete(id);
        }
        setEditingId(0);
    };

    function findMaxIdFromData(inputData) {
        return Math.max(...inputData.map(val => val.id));
    }

    const handleAdd = () => {
        if (editingId !== 0) {
            return message.error("Ви не зберегли нове поле");
        } else {
            const newData = {
                id: findMaxIdFromData(data) + 1,
                statusName: ``,
            };
            setData([...data, newData]);
            edit(newData)
            setEditingId(newData.id);
        }
    };

    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: '25%',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Статус',
            dataIndex: 'statusName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Керування',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Зберегти
                        </Typography.Link>
                        <Popconfirm
                            title="Ви хочете скасувати?"
                            cancelText="Ні"
                            okText="Так"
                            onConfirm={cancel}
                            cancelButtonProps={{className: "popConfirm-cancel-button"}}
                            okButtonProps={{className: "popConfirm-ok-button"}}>
                          <a>Скасувати</a>
                        </Popconfirm>
                    </span>
                ) : (
                    data.length >= 1 ? (
                        <>
                            <Typography.Link disabled={editingId !== 0} onClick={() => edit(record)}
                                             style={{
                                                 marginRight: 8,
                                             }}>
                                Редагувати
                            </Typography.Link>
                            <Popconfirm
                                title="Ви хочете видалити?"
                                cancelText="Ні"
                                okText="Так"
                                disabled={editingId !== 0}
                                cancelButtonProps={{className: "popConfirm-cancel-button"}}
                                okButtonProps={{className: "popConfirm-ok-button"}}
                                onConfirm={() => {
                                    handleDelete(record.id);
                                    deleteUserChallengeStatus(record.id);
                                }
                                }>
                                <Button type='link'
                                        className='userChallengeStatusDeleteButton'
                                        disabled={editingId !== 0}>
                                    Видалити
                                </Button>
                            </Popconfirm>
                        </>
                    ) : null
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
            }),
        };
    });

    return (data.length > 0 ?
            (
                <div className="registrationPageContainer">
                    <div className="registrationPageContentBox">
                        <div className="registrationPageContentTitle">
                            Статуси учасника
                            <Button className="userChallengeStatusAddStatusButton"
                                    style={{color: "black", marginLeft: "15px"}}
                                    onClick={handleAdd}
                                    icon={<PlusOutlined/>}>
                                Додати статус
                            </Button>
                        </div>
                        <div>
                            <Form form={form} component={false}>
                                <Table style={{padding: '2%', backgroundColor: 'white', borderRadius: '16px'}}
                                       components={{body: {cell: EditableCell}}}
                                       dataSource={data}
                                       columns={mergedColumns}
                                       rowClassName="editable-row"
                                       pagination={{onChange: cancel}}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="registrationPageContainer">
                    <div className="registrationPageContentBox">
                        <div className="registrationPageContentTitle">
                            Статусів учасника немає
                        </div>
                    </div>
                </div>
            )
    );
};

export default UserChallengeStatus;