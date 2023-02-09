import React from 'react';
import "./css/AddDuration.less";
import {Button, DatePicker, Form, Space} from 'antd';
import {CloseOutlined, DeleteOutlined, PlusCircleOutlined, UploadOutlined} from '@ant-design/icons';

const AddDuration = ({visibleBlock, onAddDuration}) => {
    let newArray = [];

    const onFinish = (values) => {
        newArray = [];
        values['users'].forEach(element => {
            const rangeValue = element['rangeValue'];
            const dataMid = {
                ...element,
                'rangeValue': {
                    'startDate': rangeValue[0].format('YYYY-MM-DD'),
                    'endDate': rangeValue[1].format('YYYY-MM-DD')
                }
            }
            newArray.push(dataMid.rangeValue)
        });
        onAddDuration(newArray);
    };

    return (
        <>
            <div className="addDurationContainer">
                <CloseOutlined className="addDurationCloseOutlined" onClick={() => visibleBlock(false)}/>
                <Form className="addDurationFrom" onFinish={onFinish} autoComplete="off">
                    <Form.List name="users" disabled={'false'}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}) => (
                                    <Space className="addDurationSpace" key={key} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, "rangeValue"]}
                                            style={{color: 'black'}}
                                            rules={[{required: true, message: 'Введіть дату'}]}
                                        >
                                            <DatePicker.RangePicker
                                                format="DD-MM-YYYY"
                                                placeholder={["Дата початку", "Дата кінця"]}
                                                size='large'
                                            />

                                        </Form.Item>
                                        <DeleteOutlined className="addDurationDeleteOutlined"
                                                        onClick={() => remove(name)}/>
                                    </Space>
                                ))}
                                <div className="buttons">
                                    <Button type='primary' style={{color: 'black', margin: "15px"}}
                                            onClick={() => add()} block icon={<PlusCircleOutlined/>}>
                                        Додати дати
                                    </Button>
                                    <Button htmlType="submit" style={{color: 'black', margin: "15px"}} block
                                            icon={<UploadOutlined/>} disabled={false}>
                                        Додати в таблицю
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </>
    );
};

export default AddDuration;