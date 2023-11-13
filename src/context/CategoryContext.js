import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(category => category !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <AppContext.Provider value={{ selectedCategories, toggleCategory }}>
      {children}
    </AppContext.Provider>
  );
};
