import {Button, DatePicker, Form, Input, InputNumber, Layout, List, Upload, message} from "antd";
import React, {useEffect, useState} from "react";
import './css/ImportData.css';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {getNumberOfUnsentCertificates, loadDataToDatabase} from "../../../service/CertificateService";
import {tokenToHeader} from "../../../service/UploadService";

const ImportCertificateData = () => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataToLoad, setDataToLoad] = useState({});
    const [mistakes, setMistakes] = useState([]);
    const [databaseResponse, setDatabaseResponse] = useState([]);
    const [unsentCertificates, setUnsentCertificates] = useState();


    // commented code will be used in the future

    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();
    // const [hours, setHours] = useState();
    // const [type, setType] = useState();
    // const [challengeNumber, setChallengeNumber] = useState();

    // const onTypeChange = (value) => {
    //     setType(value);
    // }
    //
    // const onStartDateChange = (value) => {
    //     setStartDate(value);
    // }
    //
    // const onEndDateChange = (value) => {
    //     setEndDate(value);
    // }
    //
    // const onHoursChange = (value) => {
    //     setHours(value);
    // }


    const getData = () => {
        getNumberOfUnsentCertificates().then(response => {
           setUnsentCertificates(response);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const onFinish = () => {

    };


    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setDataLoaded(value.file.response.parsingMistakes.length === 0)
            setMistakes(value.file.response.parsingMistakes)
            setDataToLoad(value.file.response.certificatesInfo)
        }
    }

    const ICON_WARNING = 1;
    const ICON_ERROR = 2;
    const ICON_OK = 3;

    const renderIcon = (type) =>{
        switch (type){
            case ICON_WARNING:
                return (<ExclamationCircleOutlined className="site-result-demo-error-icon icon warn-icon"/>)
            case ICON_ERROR:
                return (<CloseCircleOutlined className="site-result-demo-error-icon icon error-icon"/>)
            case ICON_OK:
                return (<CheckCircleOutlined className="icon ok-icon"/>)
        }
    }

    const mistakesList = () => {
        return (
            <List
                size="small"
                dataSource={mistakes}
                renderItem={item =>
                    <List.Item className="import-db-list-item">
                        {renderIcon(ICON_ERROR)}
                        {`
                            Рядок ${item.rowIndex}. 
                            ${item.errorDetails}: 
                            ${item.cellValue.length !== 0 ? `зі значенням "${item.cellValue} "` : " немає даних"}  
                        `}
                    </List.Item>}
            />
        )
    }

    const databaseResponseList = () => {
        return (
            <List
                size="small"
                dataSource={databaseResponse}
                renderItem={item =>
                    <List.Item className="import-db-list-item">
                        {renderIcon(ICON_WARNING)}
                        {`
                            ${item.message}  
                        `}
                    </List.Item>}
            />
        )
    }

    const loadToDatabase = () => {
        if (dataLoaded) {
            let dataToDB = {
                type: 3,
                hours: 40,
                startDate: "2022-08-01",
                endDate: "2022-08-28",
                courseNumber: "4",
                excelList: dataToLoad
            };
            console.log(dataToDB);
            loadDataToDatabase(dataToDB).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                console.log(response);
                setDatabaseResponse(response);
                message.success('Дані успішно додані');
                getData();
            })
        }
    }

    return (
        <Layout className="" style={{paddingTop: 40, background: 'white'}}>
            <Content className="certificate-page">
                <div className="import-excel">
                    <Form
                        className="load-excel-form"
                        name="basic"
                        requiredMark={false}
                        onFinish={onFinish}>

                        <Text
                            className="text-hint">
                            Завантажте excel-файл для імпорту інформації про сертифікати:
                        </Text>

                        <div
                            style={ dataLoaded ? {} : {display: 'none'}}
                            className="import-report">
                        <span>
                            {renderIcon(ICON_OK)}
                            Знайдено інформацію для генерації {dataLoaded ? dataToLoad.length : 0} сертифікатів
                        </span>
                        </div>


                        {/*<span className="button">*/}
                        <span className="buttons">
                        <Form.Item
                            name="excel-file"
                            rules={[{
                                required: true,
                                message: "Завантажте Excel-файл"
                            }]}>
                            <Upload
                                name="excel-file"
                                action={BASE_URL + "/api/certificate/excel"}
                                maxCount={1}
                                icon={<UploadOutlined/>}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                                onChange={uploadExcel}
                            >
                                <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>Завантажити excel-файл</Button>
                            </Upload>
                        </Form.Item>
                        {/*</span>*/}
                        {/*<span className="button">*/}
                        <Button
                            className="flooded-button send-data-button"
                            disabled={!dataLoaded}
                            onClick={() => loadToDatabase()}>
                            Відправити всі дані у БД
                        </Button>
                        <Button
                                className="flooded-button send-data-button"
                                disabled={unsentCertificates === 0}
                                // onClick={() => loadToDatabase()}
                        >
                            Надіслати сертифікати
                        </Button>

                        </span>
                        <div style={mistakes.length !== 0 ? {} : {display: 'none'}}>
                            <Paragraph>
                                <Text
                                    className="text-hint">
                                    При зчитуванні excel-файлу не вдалось розпізнати наступні дані:
                                </Text>
                            </Paragraph>
                            {mistakesList()}
                        </div>
                        <div style={databaseResponse.length !== 0 ? {} : {display: 'none'}}>
                            <Paragraph>
                                <Text
                                    className="text-hint">
                                    Під час збереження даних відбулись такі зміни:
                                </Text>
                            </Paragraph>
                            {databaseResponseList()}
                        </div>

                    </Form>
                </div>

                {/*commented code will be used in the future*/}

                {/*<div className="send-to-db">*/}
                    {/*<Form*/}
                    {/*    className="load-excel-form"*/}
                    {/*    name="basic"*/}
                    {/*    requiredMark={false}*/}
                    {/*    onFinish={loadToDatabase}>*/}
                    {/*    <Text*/}
                    {/*        className="text-hint">*/}
                    {/*        Згенерувати сертифікати для:*/}
                    {/*    </Text>*/}

                    {/*    <div className="radio-group">*/}
                    {/*        <input type="radio" value="trainer" id="trainer"*/}
                    {/*               onChange={onTypeChange}*/}
                    {/*               name="type"/>*/}
                    {/*        <label for="trainer">тренера</label>*/}

                    {/*        <input type="radio" value="moderator" id="moderator"*/}
                    {/*               onChange={onTypeChange}*/}
                    {/*               name="type"/>*/}
                    {/*        <label for="moderator">модератора</label>*/}

                    {/*        <input type="radio" value="participant" id="participant"*/}
                    {/*               onChange={onTypeChange}*/}
                    {/*               name="type"/>*/}
                    {/*        <label for="participant">учасника</label>*/}
                    {/*    </div>*/}

                    {/*    <Text*/}
                    {/*        className="text-hint">*/}
                    {/*        Інформація про челендж:*/}
                    {/*    </Text>*/}

                    {/*    <div style={{display: "flex", marginTop: 10}}>*/}
                    {/*        <Form.Item*/}
                    {/*            style={{marginRight: 5}}*/}
                    {/*            name="startDate"*/}
                    {/*            label="Період навчання з"*/}
                    {/*        >*/}
                    {/*            <DatePicker*/}
                    {/*                onChange={onStartDateChange}*/}
                    {/*                format={dateFormat}*/}
                    {/*                value={startDate}*/}
                    {/*            />*/}
                    {/*        </Form.Item>*/}

                    {/*        <Form.Item*/}
                    {/*            name="endDate"*/}
                    {/*            label="по"*/}
                    {/*        >*/}
                    {/*            <DatePicker*/}
                    {/*                onChange={onEndDateChange}*/}
                    {/*                format={dateFormat}*/}
                    {/*                value={endDate}*/}
                    {/*            />*/}
                    {/*        </Form.Item>*/}
                    {/*    </div>*/}


                    {/*    <Form.Item*/}
                    {/*        name="hours"*/}
                    {/*        label="Тривалість навчання "*/}
                    {/*        value={hours}*/}
                    {/*        onChange={onHoursChange}*/}
                    {/*    >*/}
                    {/*        <InputNumber min={1}/>*/}
                    {/*    </Form.Item>*/}

                    {/*</Form>*/}
                    {/*<span className="button">*/}
                    {/*    <Button*/}
                    {/*        className="flooded-button send-data-button"*/}
                    {/*        disabled={!dataLoaded}*/}
                    {/*        onClick={() => loadToDatabase()}>*/}
                    {/*        Відправити всі дані у БД*/}
                    {/*    </Button>*/}
                    {/*</span>*/}
                {/*</div>*/}
            </Content>
        </Layout>
    );
};

export default ImportCertificateData;