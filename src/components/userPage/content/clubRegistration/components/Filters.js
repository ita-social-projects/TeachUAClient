import {Input, Select} from "antd";

const { Option } = Select;

const Filters = ({ isAll, onClubChange, onStatusChange, setSearchTerm, clubNames, selectedStatus, selectedClub }) => (
    <div className="searchAndFilter">
        <Input
            className="searchBox"
            placeholder="Пошук..."
            onChange={e => setSearchTerm(e.target.value)}
        />
        {isAll ? (
            <Select
                value={selectedStatus}
                className="filterSelectStatuses"
                onChange={onStatusChange}
                dropdownMatchSelectWidth={false}
            >
                <Option value="all">Всі статуси</Option>
                <Option value="approved">Схвалено</Option>
                <Option value="rejected">Скасовано</Option>
                <Option value="under_review">На розгляді</Option>
            </Select>
        ) : null}
        <Select
            value={selectedClub}
            className="filterSelectRight"
            onChange={onClubChange}
            dropdownMatchSelectWidth={false}
        >
            <Option value="all">Всі гуртки</Option>
            {clubNames.map((name) => (
                <Option value={name} key={name}>{name}</Option>
            ))}
        </Select>
    </div>
);

export default Filters;