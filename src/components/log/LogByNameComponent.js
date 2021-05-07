import React, {useEffect, useState} from 'react';
import {Divider, List} from 'antd';
import {getLogByName} from "../../service/LogService";
import { useParams } from 'react-router-dom';

const LogByNameComponent = () => {

    const [log, setLog] = useState([]);

    const params = useParams();

    const getData = () => {
        getLogByName(params.id).then(response => setLog(response.data));
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Divider orientation="left">Logs</Divider>
            <List
                bordered
                dataSource={log}
                renderItem={item => (
                    <List.Item>
                        <p>{item}</p>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default LogByNameComponent;