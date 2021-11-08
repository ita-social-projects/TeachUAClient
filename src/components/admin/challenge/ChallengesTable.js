import React, {useEffect, useState} from "react";
import {Button, Form, Space, Popconfirm, Table, message} from "antd";
import EditableTable from "../../EditableTable";
import {
    deleteChallenge,
    getAllChallenges,
    getChallengeById,
    updateChallenge,
    updateChallengePreview
} from "../../../service/ChallengeService";
import {Link} from "react-router-dom";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";


const ChallengesTable = () => {
    const [form] = Form.useForm();
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [challengeNotFound, setChallengeNotFound] = useState(false);

    const getData = () => {
        getAllChallenges().then(response => {
            setChallenges(response);
        });
        setLoading(false);
    };

    const remove = (record) => {
        console.log(record);
        deleteChallenge(record.id).then((response) => {
            if (response.status) {
                message.warning(response.message)
                return;
            }
            message.success('Челендж ' + record.name + ' успішно видалено!');

            setChallenges(deleteFromTable(challenges, record.id));
        });
    };

    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        editCellValue(form, challenges, record.id).then((editedData) => {
            updateChallengePreview(editedData.item, record.id).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                getData();
            });
        });
    }

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

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            render: (text, record) => <Link to={'/admin/challenge/' + record.id}>{record.id}</Link>
        },
        {
            title: 'sortNumber',
            dataIndex: 'sortNumber',
            width: '5%',
            editable: false,
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '35%',
            editable: true,
            render: (text, record) => <Link to={'/admin/challenge/' + record.id}>{record.name}</Link>
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            width: '35%',
            editable: true,
            render: (text, record) => <Link to={'/admin/challenge/' + record.id}>{record.title}</Link>
        },
    ];

    return (
        <div className="push-down">
            <Button className="flooded-button add-btn" >
                <Link to="/admin/addChallenge">
                    Додати челендж
                </Link>
            </Button>
            <EditableTable
                bordered
                className="city-table"
                columns={columns}
                data={challenges}
                form={form}
                onSave={save}
                actions={actions}
            />
        </div>
    )
}

export default ChallengesTable;
