import {
  getSimilarEmail,
  saveAllResults,
  getAllResults,
  deleteResultById,
  exportQuizToExcel,
  getAllExcelResults,
  getFilteredExcelResults,
} from "../../service/GoogleFormService";
import "./css/formstyle.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ExcelDownLoad from "./ExcelDownLoad";
import {
  Table,
  Button,
  Form,
  message,
  Popconfirm,
  Input,
  Slider,
  DatePicker,
  Typography,
} from "antd";
import EditableTable from "../EditableTable";
import { deleteFromTable, addToTable } from "../../util/TableUtil";
import { SearchOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx/xlsx.mjs";
import TestResultFooter from "./TestResultFooter";
import SearchInput from "./SearchInput";
const ResultTable = () => {
  const [form] = Form.useForm();
  const [excelForm] = Form.useForm();
  const [results, setResults] = useState([]);
  const [excelResults, setExcelResults] = useState([]);
  const { id } = useParams();
  const { Text, Link } = Typography;
  const columns = [
    {
      title: "Пошта виконавця",
      dataIndex: "respondentEmail",
      width: "15%",
      editable: false,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <SearchInput
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            placeholderValue={"Введіть пошту виконавця"}
            findingFunc = {getFilteredEmail}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter:(value,record)=>{
        return record.respondentEmail.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      title: "Дата",
      dataIndex: "responseDate",
      width: "20%",
      editable: false,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <SearchInput
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            placeholderValue={"Введіть дату виконання"}
            findingFunc = {getFilteredDate}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.responseDate.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Результат",
      dataIndex: "totalScore",
      width: "15%",
      editable: false,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <SearchInput
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            placeholderValue={"Введіть мінімальний рахунок виконавця"}
            findingFunc = {getFilteredScore}
          />
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.totalScore == value;
      },
    },
  ];

  const actions = (record) => [
    <Popconfirm
      title="Видалити результат??"
      cancelText="Ні"
      okText="Так"
      cancelButtonProps={{
        className: "popConfirm-cancel-button",
      }}
      okButtonProps={{
        className: "popConfirm-ok-button",
      }}
      onConfirm={() => remove(record)}
    >
      <span className="table-action">Видалити</span>
    </Popconfirm>,
  ];

  const getFilteredEmail = (respondentEmail) => {
    getSimilarEmail(id, respondentEmail).then((response) => {
      setResults(response);
    });
  };

  const getFilteredDate = (date) => {
    getSimilarEmail(id, date).then((response) => {
      setResults(response);
    });
  };

  const getFilteredScore = (score) => {
    getSimilarEmail(id, score).then((response) => {
      setResults(response);
    });
  };
  const getData = () => {
    getAllResults(id).then((response) => {
      setResults(response);
    });
    getAllExcelResults(id).then((response) => {
      setExcelResults(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const remove = (record) => {
    deleteResultById(record.id).then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }

      message.success(`Результат успішно видалений`);

      setResults(deleteFromTable(results, record.id));
    });
  };
  return (
    <div>
      <ExcelDownLoad form={excelForm} id={id} />
      <EditableTable
        className="city-table"
        bordered
        columns={columns}
        data={results}
        form={form}
        actions={actions}
        footer={
          <TestResultFooter id={id} results={results} setResults={setResults} />
        }
      />
    </div>
  );
};

export default ResultTable;
