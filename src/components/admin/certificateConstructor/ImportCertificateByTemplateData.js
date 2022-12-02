import {Button, DatePicker, Form, Input, InputNumber, Layout, List, Upload, message, Radio, Space, Select} from "antd";
import React, {useEffect, useState} from "react";
import './css/ImportCertificateDataStyles.less';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {tokenToHeader} from "../../../service/UploadService";
import {useForm} from "antd/es/form/Form";
import {
    loadDataCertificatesByTemplateToDB
} from "../../../service/CertificateByTemplateService";
import * as CertificateByTemplateService from "../../../service/CertificateByTemplateService";

const ImportCertificateByTemplateData = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataToLoad, setDataToLoad] = useState({});
    const [mistakes, setMistakes] = useState([]);
    const [inputtedValues, setInputtedValues] = useState({});
    const [sendButtonState, setSendButtonState] = useState(true);
    const [pdfUploadFormControl, setPdfUploadFormControl] = useState(0);
    const [dataToDB, setDataToDB] = useState({
        type: null, startDate: '', endDate: '', hours: 40, courseNumber: null, studyType: "дистанційна", excelList: {}
    });
    const [dataToPdfCreating, setDataToPdfCreating] = useState({
        fieldsList: [],
        inputtedValues: [],
        templateName: "",
        columnHeadersList: [],
        excelContent: [[]]
    })
    const [templateMetadata, setTemplateMetadata] = useState({
        templateName: "",
        templateLastModifiedDate: ""
    })
    const [datesForm] = useForm();

    const onFinish = () => {
    };

    const ICON_WARNING = 1;
    const ICON_ERROR = 2;
    const ICON_OK = 3;

    const renderIcon = (type) => {
        switch (type) {
            case ICON_WARNING:
                return (<ExclamationCircleOutlined className="site-result-demo-error-icon icon warn-icon"/>)
            case ICON_ERROR:
                return (<CloseCircleOutlined className="site-result-demo-error-icon icon error-icon"/>)
            case ICON_OK:
                return (<CheckCircleOutlined className="icon ok-icon"/>)
        }
    }

    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setDataLoaded(value.file.response[0].parsingMistakes.length === 0)
            setMistakes(value.file.response[0].parsingMistakes)
            setDataToLoad(value.file.response[0].certificatesInfo)
            setExcelList(value.file.response[0].certificatesInfo)
        }
        console.log(dataToDB);
    };

    const uploadPdf = (value) => {
        if (value.file.response !== undefined) {
            console.log(value);
            setPdfUploadFormControl(value.fileList.length);

            templateMetadata.templateName = value.file.response.templateName;
            templateMetadata.templateLastModifiedDate = value.file.lastModified;

            loadTemplateMetadata(templateMetadata)

            setDataToPdfCreating({
                ...dataToPdfCreating,
                fieldsList: value.file.response.fieldsList,
                templateName: value.file.response.templateName
            });
            Object.keys(inputtedValues).forEach(key => delete inputtedValues[key]);
            for (const element of value.file.response.fieldsList) {
                inputtedValues[element] = "";
            }
        }

    }

    const setExcelList = (value) => {
        setDataToDB({...dataToDB, excelList: value})
    }

    const mistakesList = () => {
        return (<List
            size="small"
            dataSource={mistakes}
            renderItem={item => <List.Item className="import-db-list-item">
                {renderIcon(ICON_ERROR)}
                {`
                            Рядок ${item.rowIndex}. 
                            ${item.errorDetails}: 
                            ${item.cellValue.length !== 0 ? `зі значенням "${item.cellValue} "` : " немає даних"}  
                        `}
            </List.Item>}
        />)
    }
    const columnsList = () => {
        let items = dataToPdfCreating.fieldsList.map(element =>
            <Form.Item
                name={element}
                label={element + ': '}
            >
                <Input
                    name={element}
                    value={inputtedValues[element]}
                    onChange={e => {
                        saveValue(e);
                        checkButtonState()
                    }}
                />
            </Form.Item>
        )

        return (<Form
            className="load-excel-form"
            name="basic"
            requiredMark={false}
            initialValues={{remember: true}}>
            {items}
        </Form>)
    }

    const saveValue = (element) => {
        inputtedValues[element.nativeEvent.srcElement.name] = element.target.value;
        setInputtedValues(inputtedValues)
        console.log(inputtedValues);
    };

    const checkButtonState = () => {
        for (const field of Object.values(inputtedValues)) {
            if (field.trim().length === 0) {
                return;
            }
        }

        setSendButtonState(false);
    };

    const loadCertificatesByTemplateToDB = () => {
        dataToPdfCreating.inputtedValues = Object.values(inputtedValues)
        console.log(dataToPdfCreating)
        setSendButtonState(true);
        setTimeout(function () {
            setSendButtonState(false);
        }, 2000)

        loadDataCertificatesByTemplateToDB(dataToPdfCreating)
            .then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                console.log(response);
                message.success('Дані успішно додані');
            })
    }
    const loadTemplateMetadata = (data) => {
        CertificateByTemplateService.loadTemplateMetadata(data)
            .then(response => {
                dataToPdfCreating.templateName = response;
            })
    }

    return (<Layout className="" style={{paddingTop: 40, background: 'white'}}>
        <Content className="certificate-page">
            <div className="import-file">
                <Form
                    form={datesForm}
                    className="load-excel-form"
                    name="basic"
                    requiredMark={false}
                    onFinish={onFinish}>

                    <Text
                        className="text-hint">
                        Завантажте pdf-файл для імпорту інформації про шаблон:
                    </Text>

                    <div
                        style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                        className="import-report">
                        <span>
                            {renderIcon(ICON_OK)}
                            Знайдено {dataToPdfCreating.fieldsList ? dataToPdfCreating.fieldsList.length : 0} полів
                        </span>
                    </div>

                    <span className="buttons">
                        <Form.Item
                            rules={[{
                                required: true, message: "Завантажте pdf-шаблон"
                            }]}
                        >
                            <Upload
                                name="pdf-file"
                                accept={".pdf"}
                                action={BASE_URL + "/api/certificate-by-template/pdf"}
                                maxCount={1}
                                icon={<UploadOutlined/>}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                                onChange={uploadPdf}
                            >
                                <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>
                                    Завантажити pdf-шаблон
                                </Button>
                            </Upload>
                        </Form.Item>
                        </span>
                </Form>
            </div>
            <div className="import-file">
                <Form
                    form={datesForm}
                    className="load-excel-form"
                    name="basic"
                    requiredMark={false}
                    onFinish={onFinish}>

                    <Text
                        className="text-hint">
                        Введіть або завантажте дані:
                    </Text>

                    <div
                        style={dataLoaded ? {} : {display: 'none'}}
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
                                required: false, message: "Завантажте Excel-файл"
                            }]}>
                            <Upload
                                name="excel-file"
                                accept={".xlsx"}
                                action={BASE_URL + "/api/certificate-by-template/excel"}
                                maxCount={1}
                                icon={<UploadOutlined/>}
                                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                                onChange={uploadExcel}
                            >
                                <Button className="flooded-button" htmlType="submit"><UploadOutlined className="icon"/>
                                    Завантажити excel-файл
                                </Button>
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
            <div
                style={pdfUploadFormControl > 0 ? {} : {display: 'none'}}
            >
                {columnsList()}
            </div>
            <Button
                style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                className="flooded-button send-data-button"
                disabled={sendButtonState}
                headers={{Authorization: tokenToHeader()}}
                onClick={() => loadCertificatesByTemplateToDB()}
            >
                Надіслати
            </Button>
        </Content>
    </Layout>)
}

export default ImportCertificateByTemplateData;