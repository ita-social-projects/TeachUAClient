import React from 'react';
import { Space, Tag, theme, Tooltip } from 'antd';
import { useCategoryContext } from '../../context/CategoryContext';

const TagList = () => {
  const { token } = theme.useToken();
  const { selectedCategories, setSelectedCategoriesList } = useCategoryContext();

  return (
    <div style={{ margin: '16px' }}>
    <Space size={[0, 8]} wrap>
      {selectedCategories.map((tag, index) => (
        <Tooltip title={tag} key={tag}>
          <Tag
          color="orange"
            closable
            onClose={() => {
              const newTags = selectedCategories.filter((_, i) => i !== index);
              setSelectedCategoriesList(newTags);
            }}
          >
            <span>
              {tag}
            </span>
          </Tag>
        </Tooltip>
      ))}
    </Space>
    </div>
  );
};

export default TagList;
