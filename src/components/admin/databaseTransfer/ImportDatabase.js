import {Button, Form, Layout, List, Upload} from "antd";
import React, {useEffect, useState} from "react";
import './css/DatabaseTransfer.css';
import {UPLOAD_EXCEL} from "../../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {loadExcelToDatabase} from "../../../service/DataTransferService";


const ImportDatabase = () => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataToLoad, setDataToLoad] = useState({});
    const [mistakes, setMistakes] = useState([]);
    const [report, setReport] = useState([]);

    useEffect(() => {

    }, []);

    const onFinish = () => {

    };

    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response.data)
            setMistakes(value.file.response.parsingMistakes)
            setReport(value.file.response.sheetRowsCount)
            setDataToLoad(value.file.response.data)
        }
        setDataLoaded(value.file.response !== undefined)
    }

    const shortString = (string) => {
        if (string.length > 22) {

            let dotIndex = string.indexOf('.');
            if (dotIndex > 0)
                return string.substring(0, dotIndex)
            return string.substring(0, 22) + "... ";
        }
        return string;
    }

    const mistakesList = () => {
        return (
            <List
                size="small"
                dataSource={mistakes}
                renderItem={item =>
                    <List.Item className="import-db-list-item">
                        <CloseCircleOutlined className="site-result-demo-error-icon icon error-icon"/>
                        {`
                            ${item.sheetName}.  
                            ${shortString(item.columnName)}: 
                            Рядок ${item.rowIndex} 
                            ${item.cellValue.length !== 0 ? `зі значенням "${item.cellValue} "` : " "}  
                            (${item.errorDetails} )
                        `}
                    </List.Item>}
            />
        )
    }

    const loadDataToDatabase = () =>{
        if(dataLoaded)
            loadExcelToDatabase(dataToLoad)
    }

    return (
        <Layout className="import-page" style={{padding: 40, background: 'white'}}>
            <Content className="import-db">
                <Form
                    className="load-excel-form"
                    name="basic"
                    requiredMark={false}
                    onFinish={onFinish}>

                    <Text
                        strong
                        style={{fontSize: 16}}
                        className="import-text-hint">
                        Завантежте excel-файл для імпорту даних у БД:
                    </Text>


                    <div
                        style={dataLoaded ? {} : {display: 'none'}}
                        className="import-report">

                        <span>
                             <CheckCircleOutlined className="icon ok-icon"/>
                            Гуртки: {report["Гурток"]} з {dataLoaded ? dataToLoad.clubs.length : 0}  рядків  </span>
                        <span>
                             <CheckCircleOutlined className="icon ok-icon"/>
                            Центри: {report["Центр"]} з {dataLoaded ? dataToLoad.centers.length : 0}  рядків  </span>
                        <span>
                             <CheckCircleOutlined className="icon ok-icon"/>
                            Райони: {report["Райони"]} з {dataLoaded ? dataToLoad.districts.length : 0} рядків   </span>
                        <span>
                             <CheckCircleOutlined className="icon ok-icon"/>
                            Метро: {report["Метро"]} з {dataLoaded ? dataToLoad.stations.length : 0}  рядків  </span>
                        <span>
                             <CheckCircleOutlined className="icon ok-icon"/>
                            Категорії: {report["Категорії"]} з {dataLoaded ? dataToLoad.categories.length : 0}  рядків  </span>

                    </div>

                    <span className="import-db-buttons">
                        <Form.Item
                                   name="excel-file"
                                   rules={[{
                                       required: true,
                                       message: "Завантажте Excel-файл"
                                   }]}>
                            <Upload
                                name="excel-file"
                                action={UPLOAD_EXCEL}
                                maxCount={1}
                                icon={<UploadOutlined/>}
                                headers={{contentType: 'multipart/form-data'}}

                                onChange={uploadExcel}
                            >
                                <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>Завантажити excel-файл</Button>
                            </Upload>
                        </Form.Item>
                        <Button onClick={() => loadDataToDatabase()} className="flooded-button send-data-button">Відправити всі дані у БД</Button>
                    </span>
                    <div className="import-warning">
                        *При співпадінні імен, існучі гуртки чи клуби будуть перезаписані
                    </div>
                    <div style={mistakes.length !== 0 ? {} : {display: 'none'}}>
                        <Paragraph>
                            <Text
                                strong
                                style={{fontSize: 16}}
                                className="import-text-hint">
                                При зчитуванні excel-файлу не вдалось розпізнати наступні дані:
                            </Text>
                        </Paragraph>
                        {mistakesList()}
                    </div>

                </Form>
            </Content>
        </Layout>
    );
};

export default ImportDatabase;