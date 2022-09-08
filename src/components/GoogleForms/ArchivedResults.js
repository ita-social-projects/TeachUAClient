import {
  getArchivedResults,
  restoreArchivedResults,
  restoreArchivedResultById,
} from "../../service/GoogleFormService";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, message, Popconfirm, Input } from "antd";
import { deleteFromTable, addToTable } from "../../util/TableUtil";
import { SearchOutlined } from "@ant-design/icons";
import './css/formstyle.css';
import EditableTable from "../EditableTable";

const ArchiveTable = () => {
  const [form] = Form.useForm();
  const [archivedResults, setArchivedResults] = useState([]);
  const archColumns = [
    //     {
    //   title: "ID",
    //   dataIndex: "id",
    //   width: "5%",
    //   editable: false,
    // },
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
                setSelectedKeys(e.target.value ? [e.target.value] : []);
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
        return record.respondentEmail
          .toLowerCase()
          .includes(value.toLowerCase());
      },
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
                setSelectedKeys(e.target.value ? [e.target.value] : []);
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
                setSelectedKeys(e.target.value ? [e.target.value] : []);
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
      title="Відновити результат?"
      cancelText="Ні"
      okText="Так"
      cancelButtonProps={{
        className: "popConfirm-cancel-button",
      }}
      okButtonProps={{
        className: "popConfirm-ok-button",
      }}
      onConfirm={() => restore(record)}
    >
      <span className="table-action">Відновити</span>
    </Popconfirm>,
  ];
  const getArchData = () => {
    getArchivedResults().then((response) => {
      setArchivedResults(response);
    });
  };
  
  useEffect(() => {
    getArchData();
  }, []);
  const restore = (record) => {
    restoreArchivedResultById(record.id).then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }

      message.success(`Результат успішно відновлений`);

      setArchivedResults(deleteFromTable(archivedResults, record.id));
    });
  };
  const onFinish = () => {
    if (archivedResults.length == 0) {
      message.warning("Немає результатів для відновлення!");
    } else {
      restoreArchivedResults().then((response) => {
        if (response.status) {
          message.warning(response.message);
          return;
        }
        message.success("Результати  успішно відновлені!");
        setArchivedResults(deleteFromTable(archivedResults, response));
        form.resetFields();
      });
    }
  };
  return (
    <div>
      <div className="container-archive-button">
        <Button className="flooded-button send-data-button" onClick={onFinish}>
          Відновити результати
        </Button>
      </div>
      {/* <Table
        bordered
        form={form}
        columns={archColumns}
        dataSource={archivedResults}
        actions={actions}
      /> */}
      <EditableTable
        className="city-table"
        bordered
        columns={archColumns}
        data={archivedResults}
        form={form}
        actions={actions}
      />
    </div>
  );
};

export default ArchiveTable;
