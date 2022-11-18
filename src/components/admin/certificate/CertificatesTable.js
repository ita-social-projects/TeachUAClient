import React, {useEffect, useState} from "react";

import {getSentCertificates, updateCertificateProfile} from "../../../service/CertificateService";
import {editCellValue} from "../../../util/TableUtil";
import './css/CertificatesTable.css';
import {Button, Form, message, Popconfirm, Typography} from "antd";
import {Link} from "react-router-dom";
import EditableTable from "../../EditableTable";
import moment from "moment";

const {Title} = Typography;

const CertificatesTable = () => {

    const [form] = Form.useForm();
    const [certificates, setCertificates] = useState([]);

    const getData = () => {
        getSentCertificates().then(response => {
            setCertificates(response);
            console.log(response);
        });
        console.log(certificates);
    };

    useEffect(() => {
        getData();
    }, []);

    const actions = () => [
    ];

    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        editCellValue(form, certificates, record.id)
            .then((editedData) => {
                updateCertificateProfile(record.id, editedData.item)
                    .then(response => {
                        if (response.status) {
                            message.warning(response.message)
                            return;
                        }
                        getData();
                    })
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '3%',
            editable: false,
            render: (id) => id
            // render: (text, record) => <Link to={'/admin/challenge/' + record.id}>{record.id}</Link>
        },
        {
            title: 'Учасник',
            dataIndex: 'userName',
            width: '18%',
            editable: true,
            render: (userName) => userName
        },
        {
            title: 'Електронна пошта',
            dataIndex: 'sendToEmail',
            width: '15%',
            editable: true,
            render: (sendToEmail) => sendToEmail
        },
        {
            title: 'Серійний номер',
            dataIndex: 'serialNumber',
            width: '10%',
            editable: false,
            render: (serialNumber) => serialNumber != null ? serialNumber : "-"
        },
        {
            title: 'Дата відправки',
            dataIndex: 'updateStatus',
            width: '9%',
            editable: false,
            render: (date) => date != null ? moment(date.toString()).format('DD.MM.YYYY') : "-"
        },
        {
            title: 'Дата видачі',
            dataIndex: 'date',
            width: '7%',
            editable: false,
            render: (text, record) => record.dates.date
        },
        {
            title: 'Тривалість челенджу',
            dataIndex: 'duration',
            width: '18%',
            editable: false,
            render: (text, record) => record.dates.duration
        },
        {
            title: 'Статус видачі',
            dataIndex: 'sendStatus',
            inputType: 'select',
            selectData: ["не видано"],
            width: '8%',
            editable: true,
            render: (sendStatus) => sendStatus ? "видано" : sendStatus == null ? "не видано" : "помилка відправки"
        }
    ];

    return (
        <div className="certificatesContent">
            <Title level={3}>Сертифікати</Title>
            <EditableTable bordered
                           columns={columns}
                           data={certificates}
                           form={form}
                           onSave={save}
                           actions={actions}
            >
            </EditableTable>
        </div>
    )

}

export default CertificatesTable;