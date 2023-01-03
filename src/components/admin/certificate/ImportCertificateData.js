import {Button, DatePicker, Form, Input, InputNumber, Layout, List, Upload, message, Radio, Space, Select} from "antd";
import React, {useEffect, useState} from "react";
import './css/ImportData.css';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {getNumberOfUnsentCertificates, loadDataToDatabase, sendCertificatesScheduler} from "../../../service/CertificateService";
import {tokenToHeader} from "../../../service/UploadService";
import moment from "moment";
import {useForm} from "antd/es/form/Form";

const ImportCertificateData = () => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataToLoad, setDataToLoad] = useState({});
    const [mistakes, setMistakes] = useState([]);
    const [databaseResponse, setDatabaseResponse] = useState([]);
    const [unsentCertificates, setUnsentCertificates] = useState();

    const [datesForm] = useForm();

    // commented code will be used in the future
    //
    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();
    // const [hours, setHours] = useState();
    // const [type, setType] = useState();
    // const [courseNumber, setCourseNumber] = useState();
    const dateFormat = 'YYYY-MM-DD';
    const [formFilled, setFormFilled] = useState(false);

    const studyTypes = [
        {label: "очна", value: "очна"},
        {label: "дистанційна", value: "дистанційна"},
        {label: "змішана", value: "змішана"}
    ];

    // const [dataToDB, setDataToDB] = useState({
    //     type: 3,
    //     hours: 40,
    //     startDate: "2022-08-01",
    //     endDate: "2022-08-28",
    //     courseNumber: 4,
    //     excelList: dataToLoad
    // });

    const [dataToDB, setDataToDB] = useState({
        type: null,
        startDate: '',
        endDate: '',
        hours: 40,
        courseNumber: null,
        studyType: "дистанційна",
        excelList: {}
    });

    const onTypeChange = (value) => {
        setDataToDB({...dataToDB, type: value.target.value})
        isFilled();
        console.log(dataToDB)
    }

    const onStartDateChange = (value) => {
        dataToDB.startDate = moment(value).format(dateFormat)
        isFilled()
        console.log(dataToDB)
    }

    const onEndDateChange = (value) => {
        dataToDB.endDate = moment(value).format(dateFormat)
        isFilled()
        console.log(dataToDB)
    }

    const onHoursChange = (value) => {
        setDataToDB({...dataToDB, hours: value})
        isFilled()
        console.log(dataToDB)
    }

    const onCourseNumberChange = (value) => {
        dataToDB.courseNumber = value
        isFilled()
        console.log(dataToDB)
    }

    const isFilled = () => {
        setFormFilled(false);
        if (dataToDB.type === '3') {
            if (dataToDB.type !== null &&
                dataToDB.startDate !== '' && dataToDB.startDate !== 'Invalid date' &&
                dataToDB.endDate !== '' && dataToDB.endDate !== 'Invalid date' &&
                dataToDB.hours != null &&
                dataToDB.courseNumber != null) {
                setFormFilled(true)
            }
        } else if (dataToDB.type === '1' || dataToDB.type === '2' || dataToDB.type === "4") {
            if (dataToDB.type !== null &&
                dataToDB.hours != null &&
                dataToDB.courseNumber != null &&
                dataToDB.studyType !== null) {
                setFormFilled(true)
            }
        }
        console.log(formFilled)
    }

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

    const onFill = () => {
        datesForm.setFieldsValue(dataToDB);
    }


    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setDataLoaded(value.file.response.parsingMistakes.length === 0)
            setMistakes(value.file.response.parsingMistakes)
            setDataToLoad(value.file.response.certificatesInfo)
            setExcelList(value.file.response.certificatesInfo)
        }
        console.log(dataToDB);
    }

    const setExcelList = (value) => {

        setDataToDB({... dataToDB, excelList: value})
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

    const sendCertificates = () => {
        sendCertificatesScheduler().then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            console.log(response);
            message.success('Процес надсилання сертифікатів розпочато');
        })
    }

    return (
        <Layout className="" style={{paddingTop: 40, background: 'white'}}>
            <Content className="certificate-page">
                <div className="import-excel">
                    <Form
                        form={datesForm}
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

                        <span className="buttons">
                        <Form.Item
                            name="excel-file"
                            rules={[{
                                required: true,
                                message: "Завантажте Excel-файл"
                            }]}>
                            <Upload
                                name="excel-file"
                                accept={".xlsx"}
                                action={BASE_URL + "/api/certificate/excel"}
                                maxCount={1}
                                icon={<UploadOutlined/>}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                                onChange={uploadExcel}
                            >
                                <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>Завантажити excel-файл</Button>
                            </Upload>
                        </Form.Item>
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

                    </Form>
                </div>

                {/*commented code will be used in the future*/}

                <div className="send-to-db">
                    <Form
                        className="load-excel-form"
                        name="basic"
                        requiredMark={false}
                        initialValues={{remember: true}}
                        onChange={isFilled}>
                        <Text
                            className="text-hint">
                            Згенерувати сертифікати для:
                        </Text>
                        <Form.Item
                            name="type"
                            value={dataToDB.type}>
                            <div className="radio-group">
                                <div>
                                    <input type="radio"
                                           value="1"
                                           id="trainer"
                                           name="type"
                                           className="radio-button"
                                           onChange={onTypeChange}/>
                                    <label htmlFor="trainer">тренера</label>
                                </div>
                                <div>
                                    <input type="radio"
                                           value="2"
                                           id="moderator"
                                           name="type"
                                           className="radio-button"
                                           onChange={onTypeChange}/>
                                    <label htmlFor="moderator">модератора</label>
                                </div>
                                <div>
                                    <input type="radio"
                                           value="3"
                                           id="participant"
                                           name="type"
                                           className="radio-button"
                                           onChange={onTypeChange}/>
                                    <label htmlFor="participant">учасника</label>
                                </div>
                                <div>
                                    <input type="radio"
                                           value="4"
                                           id="basic_participant"
                                           name="type"
                                           className="radio-button"
                                           onChange={onTypeChange}/>
                                    <label htmlFor="basic_participant">учасника базового рівня</label>
                                </div>
                            </div>
                        </Form.Item>

                        <Text
                            className="text-hint">
                            Інформація про курс:
                        </Text>

                        <div style={{display: "flex", marginTop: 10}}>
                            <Form.Item
                                style={{marginRight: 5}}
                                name="startDate"
                                label="Період навчання з"
                            >
                                <DatePicker
                                    onChange={onStartDateChange}
                                    format={dateFormat}
                                    name="startDate"
                                    id = "startDate"
                                    value={dataToDB.startDate}
                                    disabled={(dataToDB.type === "1" || dataToDB.type === "2") || dataToDB.type === "4"}
                                    // value={moment(dataToDB.startDate,"YYYY-MM-DD")}
                                />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="по"
                            >
                                <DatePicker
                                    onChange={onEndDateChange}
                                    format={dateFormat}
                                    name="endDate"
                                    value={dataToDB.endDate}
                                    disabled={(dataToDB.type === "1" || dataToDB.type === "2") || dataToDB.type === "4"}
                                />
                            </Form.Item>
                        </div>


                        <Form.Item
                            name="studyType"
                            label="Форма навчання"
                            initialValue="дистанційна"
                        >
                            <Select
                                options={studyTypes}
                                disabled={(dataToDB.type === "3")}
                                name="studyType"
                                className="dropdown"
                            />
                        </Form.Item>


                        <Form.Item
                            name="hours"
                            label="Тривалість навчання "
                        >
                            <InputNumber
                                min={1}
                                name="hours"
                                value={dataToDB.hours}
                                onChange={onHoursChange}
                            /> годин
                        </Form.Item>

                        <Form.Item
                            name="courseNumber"
                            label="Номер курсу "
                        >
                            <InputNumber
                                name="courseNumber"
                                value={dataToDB.courseNumber}
                                onChange={onCourseNumberChange}
                            />
                        </Form.Item>
                        {/*<div className="send-to-db">*/}
                            <span className="buttons">
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="flooded-button send-data-button"
                                        disabled={!(formFilled && dataLoaded)}
                                        headers={{Authorization: tokenToHeader()}}
                                        onClick={() => loadToDatabase()}
                                    >
                                        Відправити всі дані у БД
                                    </Button>

                                </Form.Item>
                                <Button
                                    className="flooded-button send-data-button"
                                    disabled={unsentCertificates === 0}
                                    headers={{Authorization: tokenToHeader()}}
                                    onClick={() => sendCertificates()}
                                >
                                    Надіслати сертифікати
                                </Button>
                            </span>
                            <div style={databaseResponse.length !== 0 ? {} : {display: 'none'}}>
                                <Paragraph>
                                    <Text
                                        className="text-hint">
                                        Під час збереження даних відбулись такі зміни:
                                    </Text>
                                </Paragraph>
                                {databaseResponseList()}
                            </div>
                        {/*</div>*/}
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default ImportCertificateData;