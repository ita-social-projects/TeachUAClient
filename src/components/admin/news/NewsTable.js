import React, {useEffect, useState} from 'react';
import "./css/NewsTable.less";
import {Button, Form, Input, message, Popconfirm, Typography} from "antd";
import EditableTable from "../../EditableTable";
import {createNews, deleteNewsById, getAllNews, updateNewsById} from "../../../service/NewsService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import moment from "moment";
import CreateNewsModal from "./CreateNewsModal";

const {Title} = Typography;

const NewsTable = () => {

    const [form] = Form.useForm();
    const [news, setNews] = useState([{
        id: 1,
        title: '',
        date: ''
    }]);
    const [showModalCreateNews, setShowModalCreateNews] = useState(false);

    const getData = () => {
        getAllNews().then((response) => {
            setNews(response);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const onFinish = (value) => {
        console.log(value);
    };

    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        editCellValue(form, news, record.id).then((editedData) => {
            updateNewsById(record.id, editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                getData();
            });
        });
    }

    const remove = (record) => {
        console.log(record);
        deleteNewsById(record.id).then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success('Новину ' + record.title + ' успішно видалено!');

            setNews(deleteFromTable(news, record.id));
        });
    };

    const actions = (record) => [
        <Popconfirm title="Видалити челендж?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    const columns = [
        {
            title: 'Заголовок',
            dataIndex: 'title',
            width: '60%',
            editable: true,
        },
        {
            title: 'Дата новини',
            dataIndex: 'date',
            width: '15%',
            editable: true,
            render: (date) => moment(date).format('DD.MM.YYYY')
        },
    ];

    return (
        <div className="newsContent">
            <Title level={3}>Новини</Title>
            <div className="search-and-add-news">
                <Form
                    name="news-table-from"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Новина"
                        name="title"
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <Button className="flooded-button add-btn"
                        onClick={() => setShowModalCreateNews(true)}
                >
                    Додати новину
                </Button>
            </div>
            <EditableTable bordered
                           columns={columns}
                           data={news}
                           form={form}
                           onSave={save}
                           actions={actions}
            >
            </EditableTable>
            <CreateNewsModal visible={showModalCreateNews}
                             setVisible={setShowModalCreateNews}
                             getData={getData}
            />
        </div>
    );
};

export default NewsTable;