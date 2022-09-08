import {
  getSimilarEmail,
  saveAllResults,
  getAllResults,
  deleteResultById,
  exportQuizToExcel,
  getAllExcelResults,
  getFilteredExcelResults
} from "../../service/GoogleFormService";
import "./css/formstyle.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, message, Popconfirm, Input } from "antd";
import EditableTable from "../EditableTable";
import { deleteFromTable, addToTable } from "../../util/TableUtil";
import { SearchOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx/xlsx.mjs";
import TestResultFooter from "./TestResultFooter";
const ResultTable = () => {
  const [form] = Form.useForm();
  const [excelForm] = Form.useForm();
  const [results, setResults] = useState([]);
  const [excelResults, setExcelResults] = useState([]);
  const { id } = useParams();
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
          <>
            <Input
              autoFocus
              placeholder="Введіть пошту виконавця"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(
                  e.target.value
                    ? //   [e.target.value]
                      [getFilteredEmail(e.target.value)]
                    : []
                );
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      // onFilter:(value,record)=>{
      //   return record.respondentEmail.toLowerCase().includes(value.toLowerCase())
      // }
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
          <>
            <Input
              autoFocus
              placeholder="Введіть дату виконання"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(
                  e.target.value
                    ? [e.target.value]
                    : // [getFilteredDate(e.target.value)]
                      []
                );
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
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
          <>
            <Input
              autoFocus
              placeholder="Введіть мінімальний рахунок виконавця"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(
                  e.target.value
                    ? [e.target.value]
                    : // [getFilteredScore(e.target.value)]
                      []
                );
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
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

  const loadDataToExcel = () => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(excelResults);
    ws.A1.v = "Result ID";
    ws.B1.v = "Дата";
    ws.C1.v = "Бали";
    ws.D1.v = "Пошта";
    ws.E1.v = "Ім'я";
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    let fileName = Date.now() + "_results.xlsx";
    XLSX.writeFile(wb, fileName);
  };

  const loadDataToFile = () => {
    exportQuizToExcel(id);
  };
  const onFinish = (values) => {
    getFilteredExcelResults(id, values).then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }

      message.success("Успіх");

      setExcelResults(response);
      loadDataToExcel();
    });
  };
  return (
    <div>
      <div className="add-category-type">
        <Form
          className="add-category-type"
          name="basic"
          requiredMark={false}
          onFinish={onFinish}
          form={excelForm}
        >
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Введіть посилання",
              },
            ]}
          >
            <Input
              className="add-category-type-input"
              placeholder="Дата"
            ></Input>
          </Form.Item>
          <Form.Item
            name="score"
            rules={[
              {
                required: true,
                message: "Введіть групу",
              },
            ]}
          >
            <Input
              className="add-category-type-input"
              placeholder="Бали"
            ></Input>
          </Form.Item>
          <Button
            htmlType="submit"
            className="flooded-button add-contact-type-button"
          >
            Завантажити в Ексель тест
          </Button>
        </Form>
      </div>
      <div className="upper-class-result">
        <Button
          onClick={loadDataToExcel}
          className="flooded-button send-data-button"
        >
          Завантажити всі дані в ексель
        </Button>
        <Button
          onClick={loadDataToFile}
          className="flooded-button send-data-button"
        >
          Завантажити всі дані в файл
        </Button>
      </div>
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
