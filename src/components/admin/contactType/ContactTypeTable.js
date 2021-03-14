import {Form, Image, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import EditableTable from "../../EditableTable";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import {deleteContactTypeById, getAllContactTypes, updateContactTypeById} from "../../../service/ContactTypeService";
import AddContactType from "./AddContactType";

const ContactTypeTable = () => {
    const [form] = Form.useForm();
    const [contactTypes, setContactTypes] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '10%',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Url Logo',
            dataIndex: 'urlLogo',
            width: '30%',
            editable: false,
        },
        {
            title: 'Image',
            dataIndex: 'urlLogo',
            width: '10%',
            editable: false,
            render: urlLogo => <Image
                width={100}
                height={100}
                src={`${process.env.PUBLIC_URL}` + urlLogo}
            />
        },
    ];

    const actions = (record) => [
        <Popconfirm title="Видалити цей Тип Контакту?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{
                        className: "popConfirm-cancel-button"
                    }}
                    okButtonProps={{
                        className: "popConfirm-ok-button"
                    }}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>,
    ];

    const getData = () => {
        getAllContactTypes().then(response => setContactTypes(response));
    };

    useEffect(() => {
        getData();
    }, []);

    const remove = (record) => {
        deleteContactTypeById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`Тип ${record.name} успішно видалений`);

                setContactTypes(deleteFromTable(contactTypes, record.id));
            });
    };

    const save = async (record) => {
        editCellValue(form, contactTypes, record.id).then((editedData) => {
            updateContactTypeById(editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                setContactTypes(editedData.data);
            });
        });
    };

    return (
        <EditableTable
            bordered
            className="city-table"
            columns={columns}
            data={contactTypes}
            onSave={save}
            form={form}
            actions={actions}
            footer={<AddContactType contactTypes={contactTypes} setContactTypes={setContactTypes}/>}
        />
    );
};

export default ContactTypeTable;