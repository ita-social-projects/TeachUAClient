import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {getTasks} from "../../../service/TaskService";
import {useForm} from "antd/es/form/Form";
import {getAllChallenges} from "../../../service/ChallengeService";
const { Option } = Select;

const ChallengeSelect = ({selectedChallenges, setSelectedChallenges}) => {
    const [loading, setLoading] = useState(true);
    const [challengeList, setChallengeList] = useState([
        {
            'id' : 0,
            'name' : '',
            'title' : '',
            'sortNumber' : 0
        }
    ]);

    const getData = () => {
        getAllChallenges().then(response => {
            setChallengeList(response);
        });
        setLoading(false);
    };

    const onChange = (value) => {
        setSelectedChallenges(value);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Select
                placeholder="Оберіть челендж"
                allowClear
                name="challengeId"
                onChange={onChange}
            >
                {challengeList.map((option, index) => (
                    <Option
                        value={option.id}
                        key={option.id}
                    >
                        {option.name}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

export default ChallengeSelect;