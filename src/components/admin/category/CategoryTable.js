import React, {useEffect, useState} from "react";
import {Form, Popconfirm, message, Image, Input} from "antd";
import {deleteCategoryById, getAllCategories, updateCategoryById} from "../../../service/CategoryService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import EditableTable from "../../EditableTable";
import AddCategory from "./AddCategory";

const CategoryTable = () => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    const getData = () => {
        getAllCategories().then(response => {
            const arr = [];
            response.map(category => {
                const item = category;
                item.name = {
                    text: category.name,
                    tagBackgroundColor: category.tagBackgroundColor,
                    tagTextColor: category.tagTextColor
                }
                arr.push(item);
            })
            setCategories(arr);
        });
    }

    useEffect(() => {
        getData()
    }, []);

    // function getBackgroundColor(thi) {
    //     let xx =  categories.find(x => x.backgroundColor).backgroundColor;
    //     console.log(thi + "`````````````````````````````````````````````````");
    //     return xx;
    // }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '4%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '15%',
            editable: false,
            render: name => <div
                style={{backgroundColor: name.tagBackgroundColor, color: name.tagTextColor}}
            >
            {name.text}
            </div>
        },
        {
            title: 'Опис',
            dataIndex: 'description',
            width: '25%',
            editable: true
        },
        {
            title: 'Логотип',
            dataIndex: 'urlLogo',
            width: '7%',
            inputType: 'upload',
            uploadFolder: 'categories',
            editable: true,
            render: urlLogo => <Image
                style={{backgroundColor: categories[0].backgroundColor}}
                width={50}
                height={50}
                src={`${process.env.PUBLIC_URL}` + urlLogo} />
        },
        {
            title: 'Background Color',
            dataIndex: 'backgroundColor',
            width: '10%',
            inputType: 'color',
            editable: true
        },
        {
            title: 'Tag Background Color',
            dataIndex: 'tagBackgroundColor',
            inputType: 'color',
            width: '10%',
            editable: true
        },
        {
            title: 'Tag Text Color',
            dataIndex: 'tagTextColor',
            inputType: 'color',
            width: '10%',
            editable: true
        }
    ];

    const actions = (record) => [
        <Popconfirm title="Видалити категорію?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    const remove = (record) => {
        deleteCategoryById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                message.success('Категорія ' + record.name + ' успішно видалена!');

                setCategories(deleteFromTable(categories, record.id));
            });
    };

    const save = async (record) => {
        editCellValue(form, categories, record.id).then((editedData) => {
            updateCategoryById(editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                setCategories(editedData.data);
            });
        });
    };

    return (
        <EditableTable
            bordered
            className="city-table"
            columns={columns}
            data={categories}
            onSave={save}
            form={form}
            actions={actions}
            footer={<AddCategory categories={categories} setCategories={setCategories}/>}
        />
    )
}

export default CategoryTable;