import {
  saveAllOptions,
  updateQuestionById,
  deleteOptionById,
  getOptionsByQuestion,
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
import FormOptionFooter from "./OptionFooter";
const OptionFormTable = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const columns = [
    {
      title: "Назва",
      dataIndex: "optionValue",
      width: "55%",
      editable: false,
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
    getOptionsByQuestion(id).then((response) => {
      setQuestions(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const remove = (record) => {
    deleteOptionById(record.id).then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }

      message.success(`Опцію успішно видалено`);

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
      <EditableTable
        footer={
          <FormOptionFooter
            id={id}
            options={questions}
            setOptions={setQuestions}
          />
        }
        className="city-table"
        bordered
        columns={columns}
        data={questions}
        form={form}
        onSave={save}
        actions={actions}
      />
    </div>
  );
};
export default OptionFormTable;
