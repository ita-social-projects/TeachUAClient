import {Button, DatePicker, Form, InputNumber, Layout, List, message, Select, Upload} from "antd";
import React, {useEffect, useState} from "react";
import './css/ImportCertificateDataStyles.less';
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {Content} from "antd/es/layout/layout";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {tokenToHeader} from "../../../service/UploadService";
import {useForm} from "antd/es/form/Form";
import {
    loadDataCertificatesByTemplateToDB,
    loadTemplateName,
    validateCertificateExcelData
} from "../../../service/CertificateByTemplateService";
import {getAllTemplates} from "../../../service/TemplateService";
import {getNumberOfUnsentCertificates, sendCertificatesScheduler} from "../../../service/CertificateService";
import DraggableList from "../../../util/DraggableList";
import {ICON_OK, renderIcon} from "../../constants/CertificateConstants";

const ImportCertificateByTemplateData = () => {
    const [templates, setTemplates] = useState([]);
    const [unsentCertificates, setUnsentCertificates] = useState();
    const [validationResult, setValidationResult] = useState([]);
    const [inputtedValues, setInputtedValues] = useState({});
    const [sendButtonState, setSendButtonState] = useState(true);

    const dateFormat = 'DD.MM.YYYY';

    const [dataToPdfCreating, setDataToPdfCreating] = useState({
        fieldsList: [],
        fieldPropertiesList: [],
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

    const onTemplateChange = (value) => {
        loadTemplateName(value).then(response => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            setDataToPdfCreating({
                ...dataToPdfCreating,
                fieldsList: response.fieldsList,
                fieldPropertiesList: response.fieldPropertiesList,
                templateName: response.templateName
            })

            const form = document.getElementById('importCertificateByTemplateDataFieldsForm');
            form.reset();

            Object.keys(inputtedValues).forEach(key => delete inputtedValues[key]);
            for (const element of response.fieldsList) {
                inputtedValues[element] = "";
            }
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
            setDataToPdfCreating({
                ...dataToPdfCreating,
                excelContent: value.file.response.excelContent,
                columnHeadersList: value.file.response.columnHeadersList,
                excelColumnsOrder: columnHeadersList
            })
            setSendButtonState(true);
        }
    };

    const validationResultList = () => {
        return (<List
            size="small"
            className={"validation-result-list"}
            dataSource={validationResult}
            renderItem={item =>
                <List.Item className="validation-result-wrapper">
                    {renderIcon(item[1])}
                    <span>{item[0]}</span>
                </List.Item>}
        />)
    }

    const columnsList = () => {
        let items = [];
        for (let i = 0; i < dataToPdfCreating.fieldsList.length; i++) {
            const element = dataToPdfCreating.fieldsList[i];
            const property = dataToPdfCreating.fieldPropertiesList[i];
            switch (property) {
                case "int":
                    items.push(
                        <Form.Item
                            className=" form-item form-item-int"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <div className="inputNumber-wrapper">
                                <InputNumber
                                    id="input-int"
                                    name={element}
                                    key={element}
                                    min={1}
                                    max={999}
                                    onChange={e => {
                                        saveValue(element, e ? e.toString() : "");
                                        checkButtonState();
                                    }}
                                />
                            </div>
                        </Form.Item>
                    );
                    break;
                case "date":
                    items.push(
                        <Form.Item
                            className="form-item form-item-int"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <div className="inputNumber-wrapper">
                                <DatePicker
                                    onChange={(date, dateString) => {
                                        saveValue(element, dateString);
                                        checkButtonState();
                                    }}
                                    format={dateFormat}

                                    name="startDate"
                                    id="input-date"
                                />
                            </div>
                        </Form.Item>
                    );
                    break;
                default:
                    items.push(
                        <Form.Item
                            className="form-item form-item-text"
                            name={element}
                        >
                            <span className={"field-name"}>{element + ': '}</span>
                            <input
                                id="input-text"
                                name={element}
                                key={element}
                                onChange={e => {
                                    saveValue(element, e.target.value);
                                    checkButtonState();
                                }}
                            />
                        </Form.Item>
                    );
            }
        }

        return (
            <Form
                className="form"
                id="importCertificateByTemplateDataFieldsForm"
                name="basic"
                requiredMark={false}
                initialValues={{remember: true}}>
                {items}
            </Form>
        )
    }

    const saveValue = (fieldName, value) => {
        inputtedValues[fieldName] = value;
        setInputtedValues(inputtedValues)
    };

    const checkButtonState = () => {
        for (const field of Object.values(inputtedValues)) {
            if (field.toString().trim().length === 0) {
                setSendButtonState(true);
                return;
            }
        }

        setSendButtonState(false);
    };

    const getData = () => {
        getNumberOfUnsentCertificates().then(response => {
            setUnsentCertificates(response);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const loadCertificatesByTemplateToDB = () => {
        dataToPdfCreating.values = JSON.stringify(inputtedValues);
        console.log(dataToPdfCreating)

        loadDataCertificatesByTemplateToDB(dataToPdfCreating)
            .then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }
                console.log(response);
                getData();
                setSendButtonState(true);
                setValidationResult([]);
                setExcelColumnHeadersList([])
                setDataToPdfCreating({
                    ...dataToPdfCreating,
                    values: "",
                    columnHeadersList: [],
                    excelContent: [],
                    excelColumnsOrder: []
                })
                document.getElementById('importCertificateByTemplateDataFieldsForm').reset();
                document.getElementById('load-excel-form').reset();
                Object.keys(inputtedValues).forEach(key => delete inputtedValues[key]);
                for (const element of dataToPdfCreating.fieldsList) {
                    inputtedValues[element] = "";
                }

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
            array.push(element.key.slice(element.key.indexOf("_") + 1));
        })
        setSendButtonState(true);
        setDataToPdfCreating({...dataToPdfCreating, excelColumnsOrder: array});
    }

    const validateExcel = () => {
        dataToPdfCreating.values = JSON.stringify(inputtedValues);

        validateCertificateExcelData(dataToPdfCreating).then((response) => {
            if (response.status) {
                console.log(dataToPdfCreating)
                message.warning(response.message);
                return;
            }
            setValidationResult(response);
            for (const message of response) {
                if (message[1] === "2") {
                    setSendButtonState(true);
                    return;
                }
            }
            setSendButtonState(false);
        });
    }

    return (<Layout className="certificate-by-template">
        <Content className="certificate-page">
            <div className="import-file">
                <Form
                    form={datesForm}
                    className="load-excel-form"
                    name="basic"
                    requiredMark={false}>

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
                    id="load-excel-form"
                    name="basic"
                    requiredMark={false}>

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
            <div className={"import-file"}
                 style={validationResult.length !== 0 ? {} : {display: 'none'}}
            >
                <Paragraph>
                    <Text
                        className="text-hint">
                        Результати валідації:
                    </Text>
                </Paragraph>
                {validationResultList()}
            </div>
            <span className="buttons">
                    <div className={"certificate-data-control-wrapper"}>
                        <Button
                            style={dataToPdfCreating.fieldsList.length !== 0 && dataToPdfCreating.excelContent.length !== 0 ? {} : {display: 'none'}}
                            className="flooded-button send-data-button"
                            disabled={!sendButtonState}
                            headers={{Authorization: tokenToHeader()}}
                            onClick={() => validateExcel()}
                        >
                            Валідувати дані
                        </Button>
                        <Button
                            style={dataToPdfCreating.fieldsList.length !== 0 ? {} : {display: 'none'}}
                            className="flooded-button send-data-button"
                            disabled={sendButtonState}
                            headers={{Authorization: tokenToHeader()}}
                            onClick={() => loadCertificatesByTemplateToDB()}
                        >
                            Відправити всі дані у БД
                        </Button>
                    </div>
                    <Button
                        className="flooded-button send-data-button"
                        disabled={unsentCertificates === 0}
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