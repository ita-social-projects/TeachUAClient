import React, {useEffect, useState} from "react";
import {deleteAllLogs, getAllLogs} from "../../service/LogService";
import {Divider, List, Button} from "antd";
import "./css/LogComponent.css"

const LogComponent = () => {

    const [logs, setLogs] = useState([]);
    const [deleteLogs, setDeleteLogs] = useState([]);

    const getData = () => {
        getAllLogs().then(response => setLogs(response.data));
    };

    const deleteLog = () => {
        deleteAllLogs().then(response => setDeleteLogs(response.data));
    }

    useEffect(() => {
        getData();
    }, [deleteLogs])

    return (
        <div>
            <Divider>List of Logs</Divider>
            <div className="delete-button">
                <Button onClick={deleteLog}>Delete All Logs</Button>
            </div>
            <List className="box"
                  bordered
                  dataSource={logs}
                  renderItem={item => (
                      <List.Item onClick={() => {window.location.assign(`/dev/log/${item}`)}}>
                          <Button>{item}</Button>
                      </List.Item>
                  )}
            />
        </div>
    )
};

export default LogComponent;