import React from "react";
import Tag from "antd/lib/tag";
import moment, { isMoment } from "moment";
// import "antd/lib/tag/style/css";

const now = moment().toArray();

const statusMap = {
  1: <Tag color="red">Звершений</Tag>,
  2: <Tag color="green">Активний</Tag>,
  3: <Tag color="yellow">Запланований</Tag>,
};

export const DurationColumnStatusTag = ({ startDate, endDate }) => {
  if(moment().isAfter(moment([endDate[0],endDate[1]-1,endDate[2]-1]))){
    return statusMap[1]
  }else if( moment().isBetween(moment([startDate[0],startDate[1]-1,startDate[2]-1]),moment([endDate[0],endDate[1]-1,endDate[2]-1]))){
    return statusMap[2]
  }else if(moment().isBefore(moment([startDate[0],startDate[1]-1,startDate[2]-1]))){
    return statusMap[3]
  }
}
