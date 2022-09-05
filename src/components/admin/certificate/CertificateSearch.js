import { Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/SearchCertificate.css"
import { getCertificatesByUserName } from "../../../service/CertificateService";
import EditableTable from "../../EditableTable";

const {Title} = Typography;

const CertificateSearch = () => {
    const [form] = Form.useForm();
    const [certificates, setCertificates] = useState([]);

    const {Search} = Input;

    const getData = () => {
        // TODO 
    }

    useEffect(() => {
        getData();
    })

    const onSearch = (value) => {
        if(!value){
            getData();
            return;
        }
        getCertificatesByUserName({userName:value}).then((response) => {
            setCertificates(response);
        })
    }

    const change = (value) => {
        if(!value.target.defaultValue){
            getData();
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: '3%',
            editable: false,
            render: (text, record) => {
                
                    <Link to={'certificate/' + record.serialNumber}>{record.id}</Link>
                
            }
        }
    ]
    return (  
        <div className="certificatesContent">
            <Title level={3}>Пошук сертифікатів</Title>
            <div className="search-certificates">
                <Search
                    placeholder="Введіть дані людини для пошуку сертифікату"
                    onSearch={onSearch}
                    onChange={change}
                    allowClear
                    style={{
                        width: 250,
                    }}
                />
            </div>
            <EditableTable bordered
                           columns={columns}
                           data={certificates}
                           form={form}
            >
            </EditableTable>
        </div>
    );
}
 
export default CertificateSearch;