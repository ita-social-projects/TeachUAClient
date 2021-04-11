import {getAllCities} from "../../../service/CityService";
import {Form, message, Popconfirm} from "antd";
import React, {useEffect, useState} from "react";
import EditableTable from "../../EditableTable";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import {getAllStations, updateStationById, deleteStationById} from "../../../service/StationService";
import {getAllDistrict} from "../../../service/DisctrictService";
import AddStation from "../station/AddStation";

const StationTable = () => {
    const [form] = Form.useForm();
    const [cities, setCities] = useState([]);
    const [stations, setStations] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Станція',
            dataIndex: 'name',
            width: '15%',
            editable: true,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Місто',
            dataIndex: 'cityName',
            width: '15%',
            editable: true,
            inputType: 'select',
            selectData: cities.map(city => city.name),
            defaultSortOrder: 'ascend',
            filters: cities.map(city => ({text: city.name, value: city.name})),
            onFilter: (value, record) => record.cityName.indexOf(value) === 0,
            sorter: (a, b) => a.cityName.length - b.cityName.length,
        }
    ];

    const actions = (record) => [
        <Popconfirm title="Видалити станцію?"
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
        getAllCities().then(response => setCities(response));
        getAllStations().then(response => setStations(response));
        console.log('Getting data')
    };

    useEffect(() => {
        getData();
    }, []);

    const remove = (record) => {
        deleteStationById(record.id)
            .then((response) => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`Станція ${record.name} успішно видалена`);

                setStations(deleteFromTable(stations, record.id));
            });
    };

    const save = async (record) => {
        editCellValue(form, stations, record.id).then((editedData) => {
            updateStationById(editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                setStations(editedData.data);
            });
        });
    };

    return (
        <EditableTable
            bordered
            className="city-table"
            columns={columns}
            data={stations}
            onSave={save}
            form={form}
            actions={actions}
            footer={<AddStation cities={cities} stations={stations} setStations={setStations}/>}
        />);
}

export default StationTable;