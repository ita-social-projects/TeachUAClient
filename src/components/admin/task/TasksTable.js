import React, {useEffect, useState} from "react";
import {Button, Form, message, Popconfirm} from "antd";
import {Link} from "react-router-dom";
import EditableTable from "../../EditableTable";
import {deleteTask, getTasks, getTasksByChallenge, updateTask} from "../../../service/TaskService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";

const TasksTable = () => {

    const [form] = Form.useForm();
    const [tasks, setTasks] = useState([{
        id: 0,
        name: '',
        picture: '',
        startDate: ''
    }]);
    const [loading, setLoading] = useState(true);
    const [taskNotFound, setTaskNotFound] = useState(false);

    const getData = () => {
        getTasks().then(response => {
            console.log(response);
            setTasks(response);
        });
        setLoading(false);
    };

    const remove = (record) => {
        console.log(record);
        deleteTask(record.id).then((response) => {
            if (response.status) {
                message.warning(response.message)
                return;
            }
            message.success('Завдання ' + record.name + ' успішно видалено!');

            setTasks(deleteFromTable(tasks, record.id));
        });
    };

    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        console.log(record);
        editCellValue(form, tasks, record.id).then((editedData) => {
            updateTask(editedData.item, record.id).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                getData();
            });
        });
    }

    const actions = (record) => [
        <Popconfirm title="Видалити челендж?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            render: (text, record) => <Link to={'/admin/tasks/' + record.id}>{record.id}</Link>
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '35%',
            editable: true,
            render: (text, record) => <Link to={'/admin/task/' + record.id}>{record.name}</Link>
        },
        {
            title: 'startDate',
            dataIndex: 'startDate',
            width: '35%',
            editable: true,
            render: (text, record) => <Link to={'/admin/task/' + record.id}>{record.startDate}</Link>
        },
    ];

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn" >
                <Link to="/admin/addTask">
                    Додати завдання
                </Link>
            </Button>
            <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={tasks}
                form={form}
                 onSave={save}
                 actions={actions}
            />
        </div>
    )
}

export default TasksTable;