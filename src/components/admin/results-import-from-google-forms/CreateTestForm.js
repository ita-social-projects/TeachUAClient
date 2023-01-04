import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Divider,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Space,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
    createTopic,
    getAllTopics,
} from '../../../service/ImportGoogleFormsService';

const { TextArea } = Input;

const CreateTestForm = ({ open, onCreate, onCancel, formInfo }) => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [topicOptions, setTopicOptions] = useState([]);
    const inputRef = useRef(null);

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        createTopic(name);
        setName('');
    };

    useEffect(() => {
        getAllTopics().then((data) =>
            setTopicOptions(
                data.map((item) => ({
                    label: item.title,
                    value: item.title,
                }))
            )
        );
    }, [name]);

    return (
        <Modal
            open={open}
            title="Додати новий тест"
            okText="Зберегти"
            cancelText="Cкасувати"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    title: formInfo.title,
                    description: formInfo.description,
                }}
            >
                <Form.Item name="title" label="Назва тесту">
                    <TextArea allowClear autoSize />
                </Form.Item>
                <Form.Item name="description" label="Опис тесту">
                    <TextArea allowClear autoSize />
                </Form.Item>
                <Form.Item
                    name="difficulty"
                    label="Значення складності від 1 до 10"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Значення тривалості проходження"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="topicTitle" label="Теми вікторин">
                    <Select
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space
                                    style={{
                                        padding: '0 8px 4px auto',
                                    }}
                                >
                                    <Input
                                        placeholder="Введіть назву"
                                        ref={inputRef}
                                        value={name}
                                        onChange={onNameChange}
                                        style={{ width: '300px' }}
                                    />
                                    <Button
                                        type="text"
                                        icon={<PlusOutlined />}
                                        onClick={addItem}
                                        // style={{ width: '70px' }}
                                    >
                                        Додати
                                    </Button>
                                </Space>
                            </>
                        )}
                        options={topicOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTestForm;
