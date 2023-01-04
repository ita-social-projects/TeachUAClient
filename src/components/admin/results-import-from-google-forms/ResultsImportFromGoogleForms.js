import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
    Table,
    Typography
} from 'antd';
import { useEffect, useState } from 'react';
import {
    createResponsesFromGoogleForms,
    createTest,
    getAllTests,
    getResponsesFromGoogleForms
} from '../../../service/ImportGoogleFormsService';
import columns from './columns';
import CreateTestForm from './CreateTestForm';
import styles from './ResultsImportFromGoogleForms.module.css';

const { Title } = Typography;

const ResultsImportFromGoogleForms = () => {
    const [data, setData] = useState([]);
    const [test, setTest] = useState('');
    const [formInfo, setFormInfo] = useState({});
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);

    const googleFormsUrlHandler = (value) => {
        const formId = value.url.split('/').find((el) => el.length === 44);

        getResponsesFromGoogleForms(formId)
            .then((data) => {
                console.log(data);
                setData(
                    data.quizResults.map((el) => ({
                        ...el,
                        key: el.respondentEmail,
                    }))
                );
                setFormInfo(data.information);
            })
            .catch((e) => {
                errorMessage(
                    `Виникла помилка при спробі отримати  результати з форм Google: ${e.message}`
                );
            });
    };

    const onCreate = (values) => {
        createTest(values)
            .then((data) => console.log(data))
            .catch((error) => console.error(error.message));
        setOptions([]);
        setOpen(false);
    };

    const handleChangeTest = (value) => {
        setTest(value);
    };

    const successMessage = (text) => {
        message.success(text);
    };
    const errorMessage = (text) => {
        message.error(text);
    };

    const onSubmitData = () => {
        createResponsesFromGoogleForms(
            test,
            data.map((el) => ({
                respondentEmail: el.respondentEmail,
                lastSubmittedTime: el.lastSubmittedTime,
                totalScore: el.totalScore,
            }))
        )
            .then(() => {
                successMessage('Дані з форм Google успішно збережено');
                setData([]);
            })
            .catch(() =>
                errorMessage(
                    'Виникла помилка при збереженні результатів з форм Google'
                )
            );
    };

    useEffect(() => {
        getAllTests().then((data) =>
            setOptions(data.map((el) => ({ value: el.title, label: el.title })))
        );
    }, [options]);

    return (
        <>
            <Divider />
            <Row className={styles.resultContainer}>
                <Col span={6}></Col>
                <Col span={12}>
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Title level={5}>
                            Введіть посилання на Google Forms для отримання
                            результатів теста
                        </Title>
                        <Form onFinish={googleFormsUrlHandler}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Це поле не може бути пустим',
                                    },
                                    {
                                        pattern: /[-\w]{25,}/,
                                        message:
                                            'У посиланні відсутній Google Forms ID',
                                        warningOnly: true,
                                    },
                                ]}
                                name="url"
                            >
                                <Input
                                    placeholder="посилання на Google Forms"
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    className={styles.orangeButton}
                                    htmlType="submit"
                                >
                                    Отримати результати тестів
                                </Button>
                            </Form.Item>
                        </Form>
                        {data.length > 0 && (
                            <>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{ hideOnSinglePage: true }}
                                    title={() => formInfo.title}
                                />
                                <Title level={5}>Виберіть назву тесту</Title>
                                <Space>
                                    <Select
                                        onChange={handleChangeTest}
                                        allowClear
                                        defaultValue={
                                            options.some(
                                                (e) =>
                                                    e.value === formInfo.title
                                            )
                                                ? formInfo.title
                                                : null
                                        }
                                        options={options}
                                        style={{ width: '565px' }}
                                    />
                                    <Button
                                        className={styles.orangeButton}
                                        onClick={() => {
                                            setOpen(true);
                                        }}
                                    >
                                        Додати новий тест
                                    </Button>
                                    <CreateTestForm
                                        open={open}
                                        onCreate={onCreate}
                                        onCancel={() => {
                                            setOpen(false);
                                        }}
                                        formInfo={formInfo}
                                    />
                                </Space>
                                <Button
                                    className={styles.orangeButton}
                                    onClick={() => onSubmitData()}
                                >
                                    Зберегти результати тестів у базу
                                </Button>
                            </>
                        )}
                    </Space>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Divider />
        </>
    );
};

export default ResultsImportFromGoogleForms;
