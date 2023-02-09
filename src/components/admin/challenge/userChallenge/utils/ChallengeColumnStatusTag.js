import React from "react";
import Tag from "antd/lib/tag";
// import "antd/lib/tag/style/css";

const statusMap = {
  true: <Tag color="green">Активний</Tag>,
  false: <Tag color="red">Неактивний</Tag>
};

export const ChallengeColumnStatusTag = ({ status }) => statusMap[status];
