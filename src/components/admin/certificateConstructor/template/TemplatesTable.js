import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Button, Form, Popconfirm, Typography} from "antd";

import EditableTable from "../../../EditableTable";
import {getAllTemplates} from "../../../../service/TemplateService";

const {Title} = Typography;


const TemplatesTable = () => {
    const [form] = Form.useForm();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        getAllTemplates().then(response => {
            setTemplates(response);
        });
        setLoading(false);
    };

    const remove = (record) => {
        console.log(record);
        // deleteChallenge(record.id).then((response) => {
        //     if (response.status) {
        //         message.warning(response.message)
        //         return;
        //     }
        //     message.success('Шаблон ' + record.name + ' успішно видалено!');
        //
        //     setTemplates(deleteFromTable(templates, record.id));
        // });
    };

    const save = async (record) => {
        // form.setFieldsValue({
        //     ...form.getFieldsValue()
        // });
        // editCellValue(form, templates, record.id).then((editedData) => {
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
        <Popconfirm title="Видалити шаблон?"
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
            render: (text, record) => <Link to={'/admin/template/' + record.id}>{record.id}</Link>
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '20%',
            editable: false,
            render: (text, record) => <Link to={'/admin/template/' + record.id}>{record.name}</Link>
        },
        {
            title: 'Опис курсу',
            dataIndex: 'courseDescription',
            width: '32%',
            editable: false,
            render: (text, record) => <Link to={'/admin/template/' + record.id}>{record.courseDescription}</Link>
        },
        {
            title: 'Опис проекту',
            dataIndex: 'projectDescription',
            width: '30%',
            editable: false,
            render: (text, record) => <Link to={'/admin/template/' + record.id}>{record.projectDescription}</Link>
        }
    ];

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn">
                <Link to="/admin/add-template">
                    Додати шаблон
                </Link>
            </Button>
            <Title level={3}>Шаблони</Title>
            <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={templates}
                form={form}
                onSave={save}
                actions={actions}
            />
        </div>
    )
}

export default TemplatesTable;
