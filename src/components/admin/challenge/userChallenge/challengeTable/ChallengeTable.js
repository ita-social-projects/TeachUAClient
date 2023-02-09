import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/ChallengeTable.less";
import { Button, Table } from "antd";
import { FilterFilled, PlusOutlined } from "@ant-design/icons";
import { Sorter } from "../utils/Sorter";
import { GetColumnSearchProps } from "../utils/ColumnSerchProps";
import { ChallengeColumnStatusTag } from "../utils/ChallengeColumnStatusTag";
import { getAllForChallengeTable } from "../../../../../service/UserChallengeService";

const ChallengeTable = () =>{

    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = () => {
        getAllForChallengeTable().then(response => {
                setChallenges(response);
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'challengeId',
            width: '18%',
            fixed:'left',
            sorter: (a, b) => Sorter.DEFAULT(a.challengeId , b.challengeId ),
            ...GetColumnSearchProps('challengeId'),
            render: (_, record) => 
            <Link to={{ pathname:"/admin/user-challenge/"+record.challengeId+"/duration",
                        state: {challengeId:record.challengeId}}}>
            <p>{record.challengeId}</p>
            </Link>
        },
        {
            title: 'Назва',
            dataIndex: 'challengeName',
            width: '50%',
            sorter : (a, b) => Sorter.DEFAULT(a.challengeName, b.challengeName),
            ...GetColumnSearchProps('challengeName'),
            render: (_, record) => 
            <Link to={{ pathname:"/admin/user-challenge/"+record.challengeId+"/duration",
                        state: {challengeId : record.challengeId,
                               challengeName : record.challengeName,
                               isActive : record.isActive }}}>
            <p>{record.challengeName}</p>
            </Link>
        },
        {
            title : 'Статус',
            dataIndex : 'isActive',
            width : '32%',
            fixed:'right',
             filters: [
                {
                  text: 'Активний',
                  value: true,
                },
                {
                  text: 'Неактивний',
                  value: false,
                }
              ],
            filterIcon: filtered => <FilterFilled style={{ color: filtered ? '#C7C7C7' : undefined }}/>,
            defaultFilteredValue : ['true'], 
            onFilter: (value, record) => record.isActive === value,
            render: (_, record) => 
            <Link to={{ pathname:"/admin/user-challenge/" + record.challengeId + "/duration",
                        state : { challengeId : record.challengeId,
                                  challengeName : record.challengeName,
                                  isActive : record.isActive }}}>
            <ChallengeColumnStatusTag status={record.isActive}/>
            </Link>
        }
    ];
        
    return (challenges.length > 0 ?
        (
        <div className="challengeTableContainer">
            <div className="challengeTableContentBox">
                <div className="challengeTableContentTitle">
                    Челенджі
                    <Button className="challengeTableButton" style={{color: "black", marginLeft:"15px"}} href='/admin/user-challenge/status' icon={<PlusOutlined/>}>
                        Додати статус учасника
                    </Button>
                </div> 
                <Table className="challengeTable"
                       tableLayout="fixed" 
                       dataSource={challenges}
                       columns={columns}
                       scroll={{x:true}}
                />  
            </div>                            
        </div> 

        ) : (
        
        <div className="challengeTableContainer">
            <div className="challengeTableContentBox">
                <div className="challengeTableContentTitle">
                Челенджів немає
                </div> 
            </div> 
        </div> 
        )
    );
}

export default ChallengeTable;