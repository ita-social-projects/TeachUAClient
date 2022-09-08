import {
  getAllFormsResponse,
  updateFormById,
  deleteFormById,
  updateFormGoogleById
} from "../../service/GoogleFormService";
import './css/formstyle.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, message, Popconfirm, Button, Layout, List, Upload } from "antd";
import EditableTable from "../EditableTable";
import AddForm from "./AddForm";
import { deleteFromTable, editCellValue } from "../../util/TableUtil";
import { BugOutlined } from "@ant-design/icons";
import { UPLOAD_EXCEL } from "../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const FormTable = () => {
  const [form] = Form.useForm();
  const [googleForms, setGoogleForms] = useState([]);

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   width: "5%",
    //   editable: false,
    // },
    {
      title: "Назва",
      dataIndex: "title",
      width: "15%",
      editable: true,
    },
    {
      title: "Опис",
      dataIndex: "description",
      width: "20%",
      editable: true,
    },
    {
      title: "Посилання",
      render: (text, record) => <a href={record.link}>Перейти до форми</a>,
      width: "15%",
      editable: false,
    },
    {
      title: "Результати",
      dataIndex: "results",
      width: "15%",
      editable: false,
      render: (text, record) => (
        <Link to={"/result/" + record.id}>Подивитись Результати</Link>
      ),
    },
    {
      title: "Питання форми",
      dataIndex: "results",
      width: "15%",
      editable: false,
      render: (text, record) => (
        <Link to={"/question/" + record.id}>Переглянути Питання</Link>
      ),
    },
  ];
  const actions = (record) => [
    <Popconfirm
      title="Видалити форму??"
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
     <Popconfirm
     title="Оновити форму??"
     cancelText="Ні"
     okText="Так"
     cancelButtonProps={{
       className: "popConfirm-cancel-button",
     }}
     okButtonProps={{
       className: "popConfirm-ok-button",
     }}
     onConfirm={() => update(record)}
   >
     <span className="table-action">Оновити</span>
   </Popconfirm>,
  ];
  const getData = () => {
    getAllFormsResponse().then((response) => {
      setGoogleForms(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const remove = (record) => {
    deleteFormById(record.id).then((response) => {
      if (response.status) {
        message.warning(response.message);
        return;
      }

      message.success(`Форма успішно видалена`);

      setGoogleForms(deleteFromTable(googleForms, record.id));
    });
  };

  const update = async (record) => {
    editCellValue(form, googleForms, record.id).then((editedData) => {
      updateFormGoogleById(editedData.item).then((response) => {
        const st = response.status;
        const badStatuses = ["500", "401", "400", "403"];

        if (badStatuses.includes(st)) {
          message.warning("Response status: " + st);
          return;
        }

        setGoogleForms(editedData.data);
      });
    });
  };
  const save = async (record) => {
    editCellValue(form, googleForms, record.id).then((editedData) => {
      updateFormById(editedData.item).then((response) => {
        const st = response.status;
        const badStatuses = ["500", "401", "400", "403"];

        if (badStatuses.includes(st)) {
          message.warning("Response status: " + st);
          return;
        }

        setGoogleForms(editedData.data);
      });
    });
  };


  return (
    <div>
      <span className="import-db-buttons">
      </span>
      <EditableTable
        className="city-table"
        bordered
        columns={columns}
        data={googleForms}
        onSave={save}
        form={form}
        actions={actions}
        footer={
          <AddForm googleForms={googleForms} setGoogleForms={setGoogleForms} />
        }
      />
    </div>
  );
};

export default FormTable;
