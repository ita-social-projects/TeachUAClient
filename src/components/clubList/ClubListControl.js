import React, {useEffect, useState} from "react";
import "./css/ClubListControl.css";
import ArrowDownOutlined from "@ant-design/icons/lib/icons/ArrowDownOutlined";
import ArrowUpOutlined from "@ant-design/icons/lib/icons/ArrowUpOutlined";
import {Form, Radio, Select} from "antd";
import {mapSearchParameters, searchParameters} from "../../context/SearchContext";
import Sider from "antd/es/layout/Sider";

const ClubListControl = ({view, setSortBy, setSortDirection, sortBy, sortDirection, setView, centerIsChecked}) => {
    const [isMobile, setIsMobile] = useState(false);

    const onSortChange = (value) => {
        console.log(value);
        setSortBy(value);
    };

    useEffect(() => {
        if (window.outerWidth <= 850) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [])

    if (!isMobile) {
        return (
            <div className="club-list-control">
                <div className="club-control-sort">
                    <span className="control-sort-label">Сортувати:</span>
                    <span className="control-sort-option"
                          onClick={() => setSortBy('name')}
                          style={{color: sortBy === 'name' && '#FA8C16'}}>за алфавітом</span>
                    <span className="control-sort-option"
                          onClick={() => setSortBy('rating')}
                          style={{color: sortBy === 'rating' && '#FA8C16'}}>за рейтингом</span>
                    <div className="control-sort-arrows">
                        <ArrowUpOutlined className="control-sort-arrow"
                                         style={{color: sortDirection === 'desc' && '#FFC069'}}
                                         onClick={() => setSortDirection('desc')}/>
                        <ArrowDownOutlined className="control-sort-arrow"
                                           style={{color: sortDirection === 'asc' && '#FFC069'}}
                                           onClick={() => setSortDirection('asc')}/>
                    </div>
                </div>
                <Radio.Group className="club-control-view"
                             optionType="button"
                             defaultValue={view}
                             onChange={(value) => {
                                 setView(value.target.value);
                                 console.log(value.target.value);
                             }}
                             buttonStyle="solid">
                    <Radio.Button value="LIST"
                                  className="club-view-button">
                        <img src={`${process.env.PUBLIC_URL}/static/images/clubs/control/list.svg`}/>
                    </Radio.Button>
                    <Radio.Button value="BLOCK"
                                  className="club-view-button">
                        <img src={`${process.env.PUBLIC_URL}/static/images/clubs/control/block.svg`}/>
                    </Radio.Button>
                </Radio.Group>
            </div>
        );
    } else {
        return (
            <Form.Item
                name="sortOption">
                <Select onChange={onSortChange}
                        className="club-list-select"
                        defaultValue="name">
                    <option selected="selected" value="name">
                        <span>за алфавітом</span>
                    </option>
                    <option value="rating">
                        <span>за рейтингом</span>
                    </option>
                </Select>
            </Form.Item>
        );
    }
};

export default ClubListControl;