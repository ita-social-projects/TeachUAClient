import {
    Button, DatePicker, Form, Input, InputNumber, Layout, List, Upload, message, Radio, Space, Select, Checkbox
} from "antd";
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
    loadDataCertificatesByTemplateToDB, loadTemplateName
} from "../../../service/CertificateByTemplateService";
import * as CertificateByTemplateService from "../../../service/CertificateByTemplateService";
import {getAllTemplates} from "../../../service/TemplateService";
import {sendCertificatesScheduler} from "../../../service/CertificateService";
import DraggableList from "../../../util/DraggableList";
import Icon from 'antd/lib/icon';

const ImportCertificateByTemplateData = () => {
    const [templates, setTemplates] = useState([]);
    const [mistakes, setMistakes] = useState([]);
    const [inputtedValues, setInputtedValues] = useState({});
    const [sendButtonState, setSendButtonState] = useState(true);
    const [dataToPdfCreating, setDataToPdfCreating] = useState({
        fieldsList: [],
        templateName: "",
        values: "",
        columnHeadersList: [],
        excelContent: [],
        excelColumnsOrder: []
    })
    const [excelColumnHeadersList, setExcelColumnHeadersList] = useState([]);

    const [datesForm] = useForm();

    const getTemplates = () => {
        getAllTemplates().then(response => {
            let list = [];
            response.forEach(value => {
                list.push({
                    label: value.name,
                    value: value.filePath
                })
            })
            setTemplates(list);
        });
    }

    useEffect(() => {
        getTemplates();
    }, []);

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

    const onTemplateChange = (value) => {
        loadTemplateName(value).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            setDataToPdfCreating({
                ...dataToPdfCreating,
                fieldsList: response.fieldsList,
                templateName: response.templateName
            })

            const form = document.getElementById('importCertificateByTemplateDataFieldsForm');
            form.reset();

            Object.keys(inputtedValues).forEach(key => delete inputtedValues[key]);
            for (const element of response.fieldsList) {
                inputtedValues[element] = "";
            }
            console.log(inputtedValues);
        })
    }

    const uploadExcel = (value) => {
        if (value.file.response !== undefined) {
            console.log(value.file.response)
            setExcelColumnHeadersList([])

            let columnHeadersList = value.file.response.columnHeadersList
            if (dataToPdfCreating.fieldsList.length > columnHeadersList.length) {
                let count = dataToPdfCreating.fieldsList.length - columnHeadersList.length;
                for (let i = 0; i < count; i++) {
                    columnHeadersList.push("");
                }
            }

            setExcelColumnHeadersList(columnHeadersList)
            setSendButtonState(false);
            setDataToPdfCreating({
                ...dataToPdfCreating,
                excelContent: value.file.response.excelContent,
                columnHeadersList: value.file.response.columnHeadersList,
                excelColumnsOrder: columnHeadersList
            })
        }
    };

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
                className="form-item"
                name={element}
            >
                <span>{element + ': '}</span>
                <input
                    id="input"
                    name={element}
                    key={element}
                    onChange={e => {
                        saveValue(e);
                        checkButtonState()
                    }}
                />
            </Form.Item>
        )

        return (<Form
            className="form"
            id="importCertificateByTemplateDataFieldsForm"
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
        dataToPdfCreating.values = JSON.stringify(inputtedValues);
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

    const sendCertificates = () => {
        sendCertificatesScheduler().then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            console.log(response);
            message.success('Процес надсилання сертифікатів розпочато');
        })

    };

    const childrenToRender = excelColumnHeadersList.map((item, i) => {
        return (
            <div key={i + "_" + item} className={`draggable-list-element`}>
                <div className="draggable-list-element-content-wrapper"
                     style={item.length === 0 ? {opacity: .4} : {}}
                >
                    <div className={`draggable-list-text`}>
                        <p>{item}</p>
                    </div>
                </div>
            </div>
        );
    });

    const onDraggableListChange = (elements) => {
        let array = [];
        elements.forEach(element => {
            array.push(element.key.slice(element.key.indexOf("_")+1));
        })
        setDataToPdfCreating({...dataToPdfCreating, excelColumnsOrder: array})
    }

    return (<Layout className="certificate-by-template">
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
                        Оберіть pdf-файл для імпорту інформації про шаблон:
                    </Text>

                    <span style={{textAlign: "center", marginTop: '15px'}}>
                        <Form.Item>
                        <Select
                            name="template"
                            className="dropdown"
                            placeholder="Оберіть шаблон"
                            options={templates}
                            key={templates}
                            onChange={onTemplateChange}
                        />
                        </Form.Item>
                    </span>

                    <div
                        style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                        className="">
                        <span>
                            {renderIcon(ICON_OK)}
                            Знайдено {dataToPdfCreating.fieldsList ? dataToPdfCreating.fieldsList.length : 0} полів
                        </span>
                    </div>

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
                    <div
                        style={dataToPdfCreating.excelContent.length !== 0 ? {} : {display: 'none'}}
                        className="">
                        <span>
                            {renderIcon(ICON_OK)}
                            Знайдено інформацію для генерації {dataToPdfCreating.excelContent ? dataToPdfCreating.excelContent.length : 0} сертифікатів
                        </span>
                    </div>
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
                className={"configuration"}
                style={dataToPdfCreating.fieldsList.length > 0 ? {} : {display: 'none'}}
            >
                {columnsList()}
                <div className={"draggable-list-wrapper"}>
                    <div className={"draggable-list"}>
                        <DraggableList
                            dragClassName="list-drag-selected"
                            onChange={onDraggableListChange}
                        >
                            {childrenToRender}
                        </DraggableList>
                    </div>
                </div>
            </div>

            <span className="buttons">
            <Button
                style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                className="flooded-button send-data-button"
                disabled={sendButtonState}
                headers={{Authorization: tokenToHeader()}}
                onClick={() => loadCertificatesByTemplateToDB()}
            >
                Відправити всі дані у БД
            </Button>
            <Button
                className="flooded-button send-data-button"
                disabled={sendButtonState}
                headers={{Authorization: tokenToHeader()}}
                onClick={() => sendCertificates()}
            >
                Надіслати сертифікати
            </Button>
            </span>
        </Content>
    </Layout>);
}

export default ImportCertificateByTemplateData;