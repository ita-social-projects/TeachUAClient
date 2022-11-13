import React, { useEffect, useState } from "react";
import { getAllLogs, getLogByName, deleteLogByName } from "../../service/LogService";
import { Button, Divider, List, Modal, Space, Table } from "antd";
import "./css/LogComponent.css"

const LogComponent = () => {

    const [logs, setLogs] = useState([]);
    const [log, setLog] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getData = () => {
        getAllLogs().then(response => setLogs(response.data));
    };

    const deleteLog = (fileName) => {
        deleteLogByName(fileName).then(() => getData());
    }

    const showModal = (fileName) => {
        setIsModalOpen(true);
        getLogByName(fileName).then(response => setLog(response.data));
    };

    const setShowing = () => {
        setIsModalOpen(false);
    };

    const dataSource = logs.map((log, index) => ({ number: index + 1, fileName: log }));

    const columns = [
        {
            title: '#',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'File name',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record.fileName)}>
                        View
                    </Button>
                    <Button onClick={() => deleteLog(record.fileName)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Divider />
            <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ hideOnSinglePage: true }}
                    title={() => 'List of logs'}
                />
                <Modal
                    open={isModalOpen}
                    title="Log"
                    onOk={() => setShowing(false)}
                    onCancel={() => setShowing(false)}
                    width={1100}
                >
                    <List
                        size="small"
                        bordered
                        dataSource={log}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Modal>
            </Space>
        </>
    )
};

export default LogComponent;
