import React from 'react';
import { Radio } from 'antd';

const Title = ({ setIsAll }) => (
    <div className="contentTitle">
        <div className="titleText">Заявки на розгляді</div>
        <Radio.Group className="radioGroup" onChange={e => setIsAll(e.target.value)} defaultValue={false}>
            <Radio className="radioItem" value={true}>Всі</Radio>
            <Radio className="radioItem" value={false}>Не підтверджені</Radio>
        </Radio.Group>
    </div>
);

export default Title;