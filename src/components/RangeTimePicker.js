import React, {useEffect, useState} from "react";
import {TimePicker} from "antd";



const RangeTimePicker = ({visible,onOk,initialValue}) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [showResult,setShowResult]=React.useState(false)

    const { RangePicker } = TimePicker;

    useEffect(() => {
        setShowResult(visible)
        if(initialValue) {
            setStart(initialValue[0])
            setEnd(initialValue[1])
        }
    }, );

    const handleRange = (timeRangeUTC, timeRangeLocal) => {
        if(timeRangeUTC) {
            setStart(timeRangeUTC[0]);
            setEnd(timeRangeUTC[1]);
        }
    };
    return (showResult ? <RangePicker style={{width: "13em", margin:"0 1rem"}}
        showTime={{ format: "HH:mm" }}
        format="HH:mm"
        value={[start, end]}
        onChange={handleRange}
        placeholder={["HH:mm", "HH:mm"]}
        onOk={onOk}/> : null
    )
};

export default RangeTimePicker;