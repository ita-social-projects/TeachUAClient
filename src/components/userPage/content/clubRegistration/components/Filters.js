import {Input, Select} from "antd";

const { Option } = Select;

const Filters = ({ isAll, onClubChange, onStatusChange, setSearchTerm, clubNames }) => (
    <div className="searchAndFilter">
        <Input
            className="searchBox"
            placeholder="Пошук..."
            onChange={e => setSearchTerm(e.target.value)}
        />
        {isAll ? (
            <Select
                defaultValue="default"
                className="filterSelectStatuses"
                onChange={onStatusChange}
                dropdownMatchSelectWidth={false}
            >
                <Option value="default">Всі статуси</Option>
                <Option value="Схвалено">Схвалено</Option>
                <Option value="Скасовано">Скасовано</Option>
                <Option value="На розгляді">На розгляді</Option>
            </Select>
        ) : null}
        <Select
            defaultValue="default"
            className="filterSelectRight"
            onChange={onClubChange}
            dropdownMatchSelectWidth={false}
        >
            <Option value="default">Всі гуртки</Option>
            {clubNames.map((name) => (
                <Option value={name} key={name}>{name}</Option>
            ))}
        </Select>
    </div>
);

export default Filters;