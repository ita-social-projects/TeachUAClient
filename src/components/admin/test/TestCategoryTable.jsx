import React, {useEffect, useState} from "react";

import { searchCategories } from "../../../service/TestQuestionService";
import './css/TestCategoryTable.css';
import { Table, Typography, Input, Button, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

const {Title} = Typography;

const { Search } = Input;

export const TestCategoryTable = () => {

    const tableProperties = {
      pagination: {
        current: 1,
        pageSize: 10
      },
      filters: {
      }
    }

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState(tableProperties);

    const fetchData = () => {
      setLoading(true);
      const order = properties.order === 'ascend' ? 'asc' : 'desc';
      const sortField = properties.field ? properties.field : 'id';

      searchCategories(
        properties.pagination.current, 
        properties.pagination.pageSize,
        sortField,
        order,
        searchQuery
      ).then(response => {
        handleResponse(response)
      });
    }

    const handleResponse = (response) => {
        setCategories(response.data.content);
        setLoading(false);
        setProperties({
            ...properties,
            pagination: {
              ...properties.pagination,
              total: response.data.totalElements
            }
        });
    }

    const handleTableChange = (pagination, filters, sorter) => {
      setProperties({
        pagination,
        filters,
        ...sorter,
      })
    }

    const resetProperties = () => {
      setProperties(tableProperties);
    }

    const handleSearch = (query) => {
      resetProperties();
      setSearchQuery(query);
    }

    const deleteCategoryById = (id) => {
      // deleteCategory(id).then(response => {
      //   message.success('Категорія видалена');
      //   fetchData();
      // }).catch(function (error) {
      //   message.error(error.response.data.message);
      // });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
      fetchData();
    }, [JSON.stringify(properties), searchQuery]);
      
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true
      },
      {
        title: 'Заголовок',
        dataIndex: 'title',
        key: 'title',
        sorter: true
      },
      {
        title: 'Управління',
        key: 'action',
        render: (_, record) => (
          <>
            <Link
                to={"/admin/quiz/categories/" + record.id}
                className="back-btn"
            >
                <Button>
                  Редагувати
                </Button>
            </Link>
            <Popconfirm 
                title="Видалити питання?" 
                onConfirm={() => deleteCategoryById(record.id)}
                cancelText="Ні"
                okText="Так"
                okButtonProps={<Button />}
            >
                <Button danger={true}>Видалити</Button>
            </Popconfirm>
          </>
        )
      }
    ];
      
    return (
      <div className="categoriesContent">
        <Title level={3}>Питання</Title>
        <div className="search-and-add-categories">
          <Search
              placeholder="Введіть заголовок категоріі"
              onSearch={ handleSearch }
              allowClear
              style={{
                  width: 250,
              }}
          />
          <Link
                to="/admin/quiz/categories/new"
                className="back-btn"
            >
              <Button className="flooded-button add-btn">
                Додати Категорію
              </Button>
            </Link>
        </div>
        <Table
          rowKey={(record) => record.id}
          dataSource={categories}
          columns={columns}
          pagination={properties.pagination}
          loading={loading}
          onChange={handleTableChange}
          tableLayout="fixed"
        />
      </div>
    );

}
