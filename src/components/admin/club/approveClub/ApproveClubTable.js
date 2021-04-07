import {Button, Form, message, Popconfirm, Select, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {deleteFromTable} from "../../../../util/TableUtil";
import {deleteClubById, getAllClubs, updateClubBuId} from "../../../../service/ClubService";
import ClubListItemInfo from "../../../clubList/ClubListItemInfo";

const ApproveClubTable = () => {
    const [clubs, setClubs] = useState([]);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
            render: (id) => {
                let club = clubs.find(club => club.id === id)
                club.categories.map(category => category.name);
                console.log(club)
                return (
                    <div>
                        <span>{id}</span>
                        <ClubListItemInfo visible={clubInfoVisible}
                                          setVisible={setClubInfoVisible}
                                          club={club}/>
                    </div>
                )
            }
        },
        {
            title: 'Назва гуртка',
            dataIndex: 'name',
            width: '45%',
            editable: false,
            render: (name) => (
                <a onClick={() => showModal()}>{name}</a>
            )
        },
        {
            title: 'Статус',
            dataIndex: 'isApproved',
            render: () =>
                <span>
                    Непідтверджений
                  </span>
            ,
            width: '20%',
            editable: true
        },
        {
            title: 'Дії',
            key: 'action',
            dataIndex: 'id',
            render: (id) => (
                <Space size="middle">
                    <a onClick={() => {
                        approveClub(id)
                    }}>Підтвердити</a>
                    <a onClick={() => {
                        deleteClub(id)
                    }}>Видалити</a>
                </Space>
            ),
        },

    ];

    const deleteClub = (id) => {
        console.log(id)
        deleteClubById(id)
            .then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`Гурток ${response.name} успішно видалений`);

                setClubs(deleteFromTable(clubs, id));
            });
    }

    const approveClub = (id) => {
        const club = clubs.find(club => club.id === id)
        club.isApproved = true;
        console.log(club)
        if (club.isApproved === true) {
            console.log(club.id)
            updateClubBuId(club).then(response => {
                if (response.status) {
                    message.warning(response.message);
                    return;
                }

                message.success(`Гурток ${club.name} успішно підтверджений`);

                setClubs(deleteFromTable(clubs, id));
            });
        }
    }

    const showModal = () => {
        setClubInfoVisible(true);
    }

    const getData = () => {
        getAllClubs().then(response => {
            const data = response.filter(club => club.isApproved === false);
            setClubs(data)
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={clubs}
            />
        </div>
    );
};

export default ApproveClubTable;