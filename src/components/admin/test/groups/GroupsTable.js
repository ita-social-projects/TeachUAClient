import React, {useEffect, useState} from "react";

import {Form, message, Typography} from "antd";

import {getAllGroups, updateGroupById} from "../../../../service/test/GroupService";
import EditableTable from "../../../EditableTable";
import {editCellValue} from "../../../../util/TableUtil";

const {Title} = Typography;

const GroupsTable = () => {
    const [form] = Form.useForm();
    const [groups, setGroups] = useState([]);
    const [, setLoading] = useState(true);

    const getData = () => {
        getAllGroups()
            .then(response => setGroups(response));
        setLoading(false);
    };
    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        editCellValue(form, groups, record.id).then((editedData) => {
            updateGroupById(editedData.item, record.id).then(response => {
                if (response.status) {
                    message.warning(response['message']);
                    return;
                }
                getData();
            });
        });
    }


    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'Порядковий номер',
            dataIndex: 'orderId',
            width: '10%',
            editable: false,
            render: (text, record) => <span>{record['orderId']}</span>
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            render: (text, record) => <span>{record['id']}</span>
        },
        {
            title: 'Початок',
            dataIndex: 'startDate',
            width: '15%',
            editable: true,
            render: (text, record) => <span>{record['startDate']}</span>
        },
        {
            title: 'Реєстраційний ключ',
            dataIndex: 'enrollmentKey',
            width: '15%',
            editable: true,
            render: (text, record) => <span>{record['enrollmentKey']}</span>
        },
        {
            title: 'Закінчення',
            dataIndex: 'endDate',
            width: '15%',
            editable: true,
            render: (text, record) => <span>{record['endDate']}</span>
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            width: '20%',
            editable: true,
            render: (text, record) => <span>{record['title']}</span>
        },
    ];

    return (
        <div>
            <Title level={3}>Групи</Title>
            <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={groups}
                form={form}
                onSave={save}
                actions={() => {}}
            />
        </div>
    );
};

export default GroupsTable;