import React, {useEffect, useState} from "react";

import {getSentCertificates, updateCertificateProfile} from "../../../service/CertificateService";
import {editCellValue} from "../../../util/TableUtil";
import './css/CertificatesTable.css';
import {Button, Form, message, Popconfirm, Typography, Input} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";
import EditableTable from "../../EditableTable";
import moment from "moment";

const {Title} = Typography;

const CertificatesTable = () => {

    const [form] = Form.useForm();
    const [certificates, setCertificates] = useState([]);
    const [searchedText, setSearchedText] = useState("");

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
            render: (id) => id,
            filteredValue:[searchedText],
            onFilter: (value, record) =>{
                return (
                    String(record.id)
                .toLowerCase()
                .includes(value.toLowerCase()) ||
                
                String(record.userName)
                .toLowerCase()
                .includes(value.toLowerCase()) ||

                String(record.sendToEmail)
                .toLowerCase()
                .includes(value.toLowerCase()) ||

                String(record.serialNumber)
                .toLowerCase()
                .includes(value.toLowerCase()) ||

                // (record.date != null ? moment(record.date.toString()).format('DD.MM.YYYY') : "-")
                // .includes(value) ||

                String(record.dates.date)
                .toLowerCase()
                .includes(value.toLowerCase()) ||

                String(record.dates.duration)
                .toLowerCase()
                .includes(value.toLowerCase()) ||

                (value.toLowerCase() === "видано" && record.sendStatus === true) ||
                (value.toLowerCase() === "не видано" && record.sendStatus === null) ||
                ("помилка відправки".includes(value.toLowerCase()) && record.sendStatus === false) 
                )
            }
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
            <Input.Search 
            placeholder="Пошук по сертифікатах"
            onSearch={(value)=>{
                setSearchedText(value);
            }}
            // onChange={(e)=>{
            //     setSearchedText(e.target.value);
            // }}
            style={{
                width: 500,
            }}
            />
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