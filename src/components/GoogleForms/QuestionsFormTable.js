import {
  getQuestionsByForm,
  saveAllQuestions,
  updateQuestionById,
  deleteQuestionById,
  restoreArchivedQuestions,
  saveAllResults,
  deleteResultById,
} from "../../service/GoogleFormService";
import "./css/formstyle.css";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, message, Popconfirm, Input } from "antd";
import EditableTable from "../EditableTable";
import { SearchOutlined } from "@ant-design/icons";
import {
  deleteFromTable,
  editCellValue,
  addToTable,
} from "../../util/TableUtil";
import QuestionFooter from "./QuestionFooter";
const QuestionFormTable = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const columns = [
    {
      title: "Назва",
      dataIndex: "title",
      width: "15%",
      editable: true,
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
              placeholder="Введіть назву питання"
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
        return record.title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Тип",
      dataIndex: "questionType",
      width: "20%",
      editable: false,
    },
    {
      title: "Опції питання",
      dataIndex: "options",
      width: "15%",
      editable: false,
      render: (text, record) => (
        <Link to={"/option/" + record.id}>Переглянути Опції</Link>
      ),
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

  const getData = () => {
    getQuestionsByForm(id).then((response) => {
      setQuestions(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const onRestore = () => {
    restoreArchivedQuestions().then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }
      message.success("Питання  успішно відновлені!");
    });
  };

  const remove = (record) => {
    deleteQuestionById(record.id).then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }

      message.success(`Питання успішно видалено`);

      setQuestions(deleteFromTable(questions, record.id));
    });
  };
  const save = async (record) => {
    editCellValue(form, questions, record.id).then((editedData) => {
      updateQuestionById(editedData.item).then((response) => {
        const st = response.status;
        const badStatuses = ["500", "401", "400", "403"];

        if (badStatuses.includes(st)) {
          message.warning("Response status: " + st);
          return;
        }

        setQuestions(editedData.data);
      });
    });
  };
  return (
    <div>
      <div className="upper-class-result">
        <Button className="flooded-button send-data-button" onClick={onRestore}>
          Відновити питання
        </Button>
      </div>
      <EditableTable
        className="city-table"
        bordered
        columns={columns}
        data={questions}
        form={form}
        onSave={save}
        actions={actions}
        footer={
          <QuestionFooter id = {id} questions={questions} setQuestions={setQuestions} />
        }
      />
    </div>
  );
};
export default QuestionFormTable;
