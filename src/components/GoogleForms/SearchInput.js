import "./css/formstyle.css";
import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";

const SearchInput = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  placeholderValue,
  findingFunc,
}) => {
  return (
    <>
      <Input
        autoFocus
        placeholder={placeholderValue}
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(
            e.target.value
              ? [e.target.value]
              : // [findingFunc(e.target.value)]
                []
          );
          confirm({ closeDropdown: false });
        }}
        onPressEnter={() => {
          confirm();
        }}
        onBlur={() => {
          confirm();
        }}
      ></Input>
      <Button
        onClick={() => {
          confirm();
        }}
        type="primary"
      >
        Search
      </Button>
      <Button
        onClick={() => {
          clearFilters();
        }}
        type="danger"
      >
        Reset
      </Button>
    </>
  );
};
export default SearchInput;
