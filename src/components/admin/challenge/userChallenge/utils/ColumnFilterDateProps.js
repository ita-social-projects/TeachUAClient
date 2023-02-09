import { FilterFilled } from "@ant-design/icons";
import { Button, DatePicker} from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
const { RangePicker } = DatePicker;

export const GetColumnFilterDateProps = (dataIndex) => {

const [searchDate, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys);
  setSearchedColumn(dataIndex);
  
};

const filtrationOfDate=(record)=>{
  return moment(record[0]+"-"+record[1]+"-"+record[2]).isBetween(searchDate[0],searchDate[1],'days','[]');
}

const handleReset = clearFilters => {
  clearFilters();
  setSearchText("");
};


return ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
        <RangePicker
        value={selectedKeys}
        placeholder={["Початкова дата","Кінцева дата"]}
        onChange={(values) => {
          console.log("onChange "+values);
          setSelectedKeys(values !== null ? values : [])
          setSearchText(values !== null ? values : [])
        }
        }
      
      />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8,background:'#FFFFFF',color:'#338CFF' }}
        >
          Пошук
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90, background:'#FF9A00',color:'#FFFFFF'}}
        >
          Скинути
        </Button>
      </div>
  ),
  filterIcon: (filtered) => (
    <FilterFilled
    style={{
      color: filtered ? '#1890ff' : undefined
    }}
  />
  ),
    onFilter: (value, record) => filtrationOfDate(record[dataIndex]),
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  
});
}
