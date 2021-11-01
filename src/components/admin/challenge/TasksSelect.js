import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {getTasks} from "../../../service/TaskService";
import {useForm} from "antd/es/form/Form";
const { Option } = Select;

const TasksSelect = ({selectedTasks, setSelectedTasks}) => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState( [{
        id: 0,
        name: "",
        startDate: ""
    }]);

    const getData = () => {
        getTasks().then(response => {
            setTasks(response);
        });
        setLoading(false);
    };

    const onChange = (value) => {
        setSelectedTasks(value);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
        <Select
            mode="multiple"
            allowClear
            placeholder="Оберіть завдання"
            value={selectedTasks}
            onChange={onChange}
            name="tasks"
        >
            {tasks.map((option, index) => (
                <Option
                    value={option.id}
                    key={option.id}
                >
                    {option.name + option.id}
                </Option>
            ))}
        </Select>
        </div>
    )
}

export default TasksSelect;