import {
  exportQuizToExcel,
  getFilteredExcelResults,
} from "../../service/GoogleFormService";
import "./css/formstyle.css";
import React, { useEffect, useState } from "react";
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
import * as XLSX from "xlsx/xlsx.mjs";
const { Text, Link } = Typography;
const ExcelDownLoad = ({ excelForm, id }) => {
  const loadDataToExcel = (values) => {
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(values);

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
      // console.log(values);
      message.success("Успіх");

      loadDataToExcel(response);
    });
  };
  const { RangePicker } = DatePicker;
  const [score, setScore] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onChangeSlider = (newValue) => {
    setScore(newValue);
  };
  const onChangeStartDate = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(dateString);
  };

  const onChangeEndDate = (date, dateString) => {
    console.log(date, dateString);
    setEndDate(dateString);
  };

  return (
    <div className="excel-format">
      <Form
        className="add-category-type"
        name="basic"
        requiredMark={false}
        onFinish={onFinish}
        form={excelForm}
      >
        <div className="excel-format">
          <Text className="excel-attribute">Дата Початку</Text>
          <Form.Item
            name="dateStart"
            rules={[
              {
                required: true,
                message: "Введіть посилання",
              },
            ]}
          >
            <DatePicker onChange={onChangeStartDate} />
          </Form.Item>
        </div>
        <div className="excel-format">
          <Text className="excel-attribute">Дата Кінця</Text>
          <Form.Item
            name="dateEnd"
            rules={[
              {
                required: true,
                message: "Введіть посилання",
              },
            ]}
          >
            <DatePicker onChange={onChangeEndDate} />
          </Form.Item>
        </div>
        <div className="excel-format">
          <Text className="excel-attribute">Бали</Text>
          <Form.Item
            name="score"
            rules={[
              {
                required: true,
                message: "Введіть бал",
              },
            ]}
          >
            <Slider
              min={0}
              max={20}
              style={{
                width: "200px",
              }}
              defaultValue={10}
              onChange={onChangeSlider}
              value={typeof score === "number" ? score : 0}
            />
          </Form.Item>
        </div>
        <div className="excel-format">
          <Text className="excel-attribute">Підтвердити</Text>
          <Button
            htmlType="submit"
            className="flooded-button add-contact-type-button"
          >
            Завантажити в Ексель тест
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default ExcelDownLoad;
