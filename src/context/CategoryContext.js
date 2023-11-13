import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(category => category !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const setSelectedCategoriesList = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategories, toggleCategory, setSelectedCategoriesList }}>
      {children}
    </CategoryContext.Provider>
  );
};
