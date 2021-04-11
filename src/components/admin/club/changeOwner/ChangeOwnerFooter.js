import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../../../service/UserService";
import {Button, Form, message, Modal, Select} from "antd";
import {changeClubOwner} from "../../../../service/ClubService";

const {Option} = Select;

const ChangeOwnerFooter = ({selectedRowKeys, setSelectedRowKeys, updateTable}) => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');

    const showModal = () => {
        if (selectedRowKeys.length === 0) {
            Modal.error({
                title: 'Позначте гуртки для зміни власника!',
                content: ''
            })
        }
        if (email === '' || email === null) {
            Modal.error({
                title: 'Виберіть email нового власника!',
                content: ''
            })
        }
    };

    const getData = () => {
        getAllUsers().then(response => setUsers(response));
    };

    useEffect(() => {
        getData();
    }, []);

    const onFinish = (values) => {
        console.log(selectedRowKeys)
        console.log(email)

        const params = {
            email: values.email
        };

        selectedRowKeys.map(selectedRowKey => {
            changeClubOwner(params, selectedRowKey).then((response) => {
                if (response.status) {
                    message.warning(response.message);
                }
                updateTable();
                console.log(response);
            });
        });
        setSelectedRowKeys([]);
    }

    return (
        <div>
            <Form name="basic"
                  requiredMark={false}
                  onFinish={onFinish}>
                <Form.Item
                    name="email">
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={(event, value) => {
                            console.log(value);
                            setEmail(value)
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {users.map(user => <Option key={user.email} value={user.email}>{user.email}</Option>)}
                    </Select>
                </Form.Item>
                <Button htmlType="submit" className="flooded-button"
                        onClick={showModal}>Змінити</Button>
            </Form>
        </div>
    );
};

export default ChangeOwnerFooter;