import React from "react";
import "./css/ClubListControl.css";
import ArrowDownOutlined from "@ant-design/icons/lib/icons/ArrowDownOutlined";
import ArrowUpOutlined from "@ant-design/icons/lib/icons/ArrowUpOutlined";
import {Radio} from "antd";

const ClubListControl = ({setSortBy, setSortDirection, sortBy, sortDirection, setView}) => {
    return (
        <div className="club-list-control">
            <div className="club-control-sort">
                <span className="control-sort-label">Сортувати за:</span>
                <span className="control-sort-option"
                      onClick={() => setSortBy('name')}
                      style={{color: sortBy === 'name' && '#FA8C16'}}>за алфавітом</span>
                <span className="control-sort-option"
                      style={{color: sortBy === 'popular' && '#FA8C16'}}>за популярністю</span>
                <span className="control-sort-option"
                      onClick={() => setSortBy('rating')}
                      style={{color: sortBy === 'rating' && '#FA8C16'}}>за рейтингом</span>
                <div className="control-sort-arrows">
                    <ArrowUpOutlined className="control-sort-arrow"
                                     style={{color: sortDirection === 'asc' && '#FFC069'}}
                                     onClick={() => setSortDirection('asc')}/>
                    <ArrowDownOutlined className="control-sort-arrow"
                                       style={{color: sortDirection === 'desc' && '#FFC069'}}
                                       onClick={() => setSortDirection('desc')}/>
                </div>
            </div>
            <Radio.Group className="club-control-view"
                         optionType="button"
                         defaultValue="BLOCK"
                         onChange={(value) => {
                             setView(value.target.value)
                             console.log(value)
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
};

export default ClubListControl;