import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Button, Form, message, Popconfirm, Typography, Table, Pagination} from "antd";

import { getAllMetrics } from "../../../service/MetricsService";
import { deleteFromTable, editCellValue } from "../../../util/TableUtil";
import EditableTable from "../../EditableTable";
import { renderIntoDocument } from "react-dom/test-utils";

const {Title} = Typography;


const MetricsTable = () => {
    const [form] = Form.useForm();
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        getAllMetrics().then(response => {
            setMetrics(response);
        });
        setLoading(false);
    };

    const remove = (record) => {
        // console.log(record);
        // deleteChallenge(record.id).then((response) => {
        //     if (response.status) {
        //         message.warning(response.message)
        //         return;
        //     }
        //     message.success('Челендж ' + record.name + ' успішно видалено!');

        //     setChallenges(deleteFromTable(challenges, record.id));
        // });
    };

    const save = async (record) => {
        // form.setFieldsValue({
        //     ...form.getFieldsValue()
        // });
        // editCellValue(form, challenges, record.id).then((editedData) => {
        //     updateChallengePreview(editedData.item, record.id).then(response => {
        //         if (response.status) {
        //             message.warning(response.message)
        //             return;
        //         }
        //         getData();
        //     });
        // });
    }

    const actions = (record) => [
        // <Popconfirm title="Видалити челендж?"
        //             cancelText="Ні"
        //             okText="Так"
        //             cancelButtonProps={{className: "popConfirm-cancel-button"}}
        //             okButtonProps={{className: "popConfirm-ok-button"}}
        //             onConfirm={() => remove(record)}>
        //     <span className="table-action">Видалити</span>
        // </Popconfirm>
    ];

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'Назва',
            dataIndex: 'name',
            editable: false,
            width: '70%',
            filters:[
                {text:'Requests count',value:'http_server_requests_seconds_count'},
                {text:'Requests max time',value:'http_server_requests_seconds_max'},
                {text:'Requests sum of time',value:'http_server_requests_seconds_sum'},
                {text:'POST',value:'POST'},
                {text:'GET',value:'GET'},
                {text:'PUT',value:'PUT'},
                {text:'CPU usage',value:'system_cpu_usage'},
                {text:'TomCat metrics',value:'tomcat'},
            ],
            onFilter:(value, record)=>{
                return record.name.includes(value);
            },
            sorter: (a, b) => a.value - b.value,


        },
        {
            title: 'Значення',
            dataIndex: 'value',
            editable: false,
            defaultSortOrder: 'descend',
            width: '30%',
            sorter: (a, b) => parseFloat(a.value) - parseFloat(b.value),
        },
    ];

    return (
        <div className="push-down">
            <Title level={3}>Метрики</Title>
            <Table bordered
                columns={columns}
                dataSource={metrics} 
                pagination={{defaultPageSize:25}}
                />
            {/* <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={metrics}
                form={form}
                onSave={save}
                actions={actions}
            /> */}
        </div>
    )
}

export default MetricsTable;
