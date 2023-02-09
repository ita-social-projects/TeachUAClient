import { Form, Input, InputNumber, message, Popconfirm, Select, Table, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUserChallengeStatus } from '../../../../../service/UserChallengeStatusService';
import { GetColumnSearchProps } from '../utils/ColumnSerchProps';
import { Sorter } from '../utils/Sorter';
import {GetColumnFilterDateProps} from "../utils/ColumnFilterDateProps";
let originData = [];
let midData ={};
const getData = async () => {
     getAllUserChallengeStatus().then(response => {
        midData = response.data;
            // setExist(response != null);
    });
    console.log("data ", midData)
    let arrStatus = [];
     midData.map((value)=> arrStatus.push({value: value.statusName, label: value.statusName}))
    
    originData = arrStatus;
}
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : null
    //     <Select
    //     defaultValue="lucy"
    //     style={{ width: 120 }}
    //     // onChange={handleChange}
    //     options={originData}
    //   />;
//   const inputNode = (inputType) => 
//   {
//     if (inputType=== 'number'){
// <Select
//       defaultValue="lucy"
//       style={{ width: 120 }}
//       onChange={handleChange}
//       options={[
//         {
//           value: 'jack',
//           label: 'Jack',
//         },
//         {
//           value: 'lucy',
//           label: 'Lucy',
//         },
//         {
//           value: 'disabled',
//           disabled: true,
//           label: 'Disabled',
//         },
//         {
//           value: 'Yiminghe',
//           label: 'yiminghe',
//         },
//       ]}
//     />
//     }else if(inputType===''){
// <InputNumber />
//     }else{
// <Input />
//     }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
            {inputNode}
            {/* <Select
      defaultValue="lucy"
      style={{ width: 120 }}
    //   onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          disabled: true,
          label: 'Disabled',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
        <Input/> */}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const RegistrationUserChallenge = ({challengeId, users,durationId, handleDeleteClick}) => {
    const [challengeStatuses, setChallengeStatuses] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([]);
    // const getData = async () => {
    //     await getAllUserChallengeStatus().then(response => {
    //             setChallengeStatuses(response);
    //             // setExist(response != null);
    //     });
    //     console.log("data ", challengeStatuses)
    //     let arrStatus = [];
    //     await challengeStatuses.map((value)=> arrStatus.push({value: value.statusName, label: value.statusName}))
        
    //     setOptionsStatus(arrStatus)
    //     // await createStatus(challengeStatuses);
    //     // let statuses=new Map();
    //     // console.log("value",challengeStatuses)
    //     // await challengeStatuses.map((value)=> {
    //     //     console.log("value ", value.statusName)
    //     //     // statuses.set()
    //     // })
    //     // await challengeStatuses.map((value)=> {
    //     //     let toAdd ={value: value.statusName, label: value.statusName};
    //     //     console.lo
    //     //     arrStatus.push()
            
    //     //     console.log("statys value ", {value: value.statusName, label: value.statusName})

    //     // })
        
    //     // console.log("arrStatus ",await arrStatus)

    // };
    // // const createStatus = (challengeStatuses) => {
    // //     const statuses ={};
    // //     challengeStatuses.array.forEach(element => {
    // //         // statuses[element] = {element: element.statusName, element: element.statusName};
    // //     console.log("statuses ", element)
    // //     });
    // //     console.log("statuses ", statuses)

    // // }
    

    useEffect(() => {
        getData();
    }, []);
  
  
  
    const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log("here ",row)
      const newData = [...users];
      console.log("here data ",...users)

      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
        title: 'ID',
        dataIndex: 'userId',
        width: '6%',
        sorter: {
          compare: (a, b) => Sorter.DEFAULT(a.userId , b.userId ),
          multiple: 3
        },
        render: (_, record) => <p>{record.userId}</p>
    },
    {
        title: 'Імя',
        dataIndex: 'firstName',
        width: '12%',
        sorter:  {
          compare: (a, b) => Sorter.DEFAULT(a.firstName, b.firstName),
          multiple: 3
        },
        render: (_, record) => <p>{record.firstName}</p>,
        ...GetColumnSearchProps('firstName')
    },
    {
      title: 'Прізвище',
      dataIndex: 'lastName',
      width: '15%',
      sorter: {
        compare: (a, b) => Sorter.DEFAULT(a.lastName , b.lastName ),
        multiple: 3
      },
      render: (_, record) => <p>{record.lastName}</p>,
      ...GetColumnSearchProps('lastName')
    },
    {
    title: 'Пошта',
    dataIndex: 'email',
    width: '15%',
    sorter: {
      compare: (a, b) => Sorter.DEFAULT(a.email , b.email ),
      multiple: 3
    },
    render: (_, record) => <p>{record.email}</p>,
    ...GetColumnSearchProps('email')
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        width: '15%',
        sorter: {
          compare: (a, b) => Sorter.DEFAULT(a.phone , b.phone ),
        },
        render: (_, record) => <p>{record.phone}</p>,
      ...GetColumnSearchProps('phone')

    },
    {
        title: 'Роль',
        dataIndex: 'roleName',
        width: '15%',
        sorter: {
          compare: (a, b) => Sorter.DEFAULT(a.roleName , b.roleName ),
        },
        render: (_, record) => <p>{record.roleName}</p>,
        filters: [
          {
            text: 'Admin',
            value: 'ROLE_ADMIN',
          },
          {
            text: 'User',
            value: 'ROLE_USER',
          }
        ],
    
        onFilter: (value, record) => record.roleName.indexOf(value) === 0
    },
    {
      title: 'Статус',
      dataIndex: 'userChallengeStatus',
      width: '15%',
      editable :"true",
      sorter: {
        compare: (a, b) => Sorter.DEFAULT(a.userChallengeStatus , b.userChallengeStatus ),
      },
      render: (_, record) => <p>{record.userChallengeStatus}</p>,
      filters: [
        {
          text: 'Added',
          value: 'ADDED',
        },
        {
          text: 'In progress',
          value: 'IN_PROGRESS',
        },
        {
          text: 'Check if passed',
          value: 'CHECK_IF_PASSED',
        },
        {
          text: 'Finished',
          value: 'FINISHED',
        }
      ],
      
      onFilter: (value, record) => record.userChallengeStatus.indexOf(value) === 0
    },
    {
    title: 'Дата реєстрації',
    dataIndex: 'registrationChallengeDate',
    width: '15%',
    sorter: {
      compare: (a, b) => Sorter.DATE(a.registrationChallengeDate , b.registrationChallengeDate ),
      multiple: 3
    },
    render: (_, record) => <p>{moment(record.registrationChallengeDate[0]+"-"+record.registrationChallengeDate[1]+"-"+record.registrationChallengeDate[2]).format("YYYY-MM-DD")}</p>,
    ...GetColumnFilterDateProps('registrationChallengeDate'),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={users}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default RegistrationUserChallenge;
