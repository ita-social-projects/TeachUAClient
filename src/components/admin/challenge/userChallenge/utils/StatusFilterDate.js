import { FilterFilled } from "@ant-design/icons";
import { Button, Checkbox, DatePicker} from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
const { RangePicker } = DatePicker;

export const StatusFilterDate = (dataIndex) => {

const [searchDate, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys);
  setSearchedColumn(dataIndex);
};

const filtrationOfDate=(selectedKeys,startDate, endDate)=>{
  if(selectedKeys === 1){
    return moment().isAfter(moment([endDate[0],endDate[1]-1,endDate[2]-1]))
  }else if(selectedKeys === 2){
    return moment().isBetween(moment([startDate[0],startDate[1]-1,startDate[2]-1]),moment([endDate[0],endDate[1]-1,endDate[2]-1]))
  }else if(selectedKeys === 3){
    return moment().isBefore(moment([startDate[0],startDate[1]-1,startDate[2]-1]))
  }
}

const handleReset = clearFilters => {
  clearFilters();
  setSearchText("");
};

const options = [
  { label: 'Звершений', value: 1 },
  { label: 'Активний', value: 2 },
  { label: 'Запланований', value: 3 },
];
return ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Checkbox.Group 
      value={selectedKeys}
      options={options} 
      style={{display:"grid", padding:"10px"}}
      defaultValue={[2,3]} 
      onChange={(values) => {
          setSelectedKeys(values !== null ? values : [])
          setSearchText(values !== null ? values : [])
        } 
      }
        />
      <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90, background:'#FF9A00',color:'#FFFFFF'}}
        >
          Скинути
        </Button>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8,background:'#FFFFFF',color:'#338CFF' }}
        >
          Пошук
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
  defaultFilteredValue:[2,3],
  onFilter: (value, record) => filtrationOfDate(value,record[dataIndex[0]],record[dataIndex[1]]),
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  
});
}
