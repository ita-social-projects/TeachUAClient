import {Select} from "antd";
import React, {useCallback, useState} from "react";
import {clearSearchParameters, searchParameters} from "../../context/SearchContext";
import {getClubsByParameters} from "../../service/ClubService";
import {getPossibleResults, getPossibleResultsByText} from "../../service/SearchService";

const {Option, OptGroup} = Select;

const Search = ({load, setClubs}) => {
    const [searchText, setSearchText] = useState('');
    const [possibleResults, setPossibleResult] = useState({
        categories: [],
        clubs: []
    });

    const onSearchChange = useCallback((value) => {
        let parameter = value.split("#")[0],
            name = value.split("#")[1];

        clearSearchParameters();

        if (parameter === "category") {
            searchParameters.categoryName = name;
        } else if (parameter === "club") {
            searchParameters.clubName = name;
        }

        load(true);
        getClubsByParameters(searchParameters).then(response => {
            setClubs(response);
            load(false);
        });
    }, []);


    const onFocus = useCallback(() => {
        getPossibleResults().then(response => setPossibleResult(response));
    }, []);

    const onKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            onSearchChange("club#" + searchText)
        }
    }, [searchText]);

    const onSearch = useCallback((val) => {
        getPossibleResultsByText(val).then(response => setPossibleResult(response));

        setSearchText(val);
    }, []);

    return (
        <Select
            showSearch
            /*allowClear*/
            onChange={onSearchChange}
            onSearch={onSearch}
            onFocus={onFocus}
            onInputKeyDown={onKeyDown}
            style={{width: 200}}
            placeholder="Який гурток шукаєте?"
            optionFilterProp="children"
            defaultActiveFirstOption={false}>

            <OptGroup label="Категорії">
                {
                    possibleResults.categories.map(result =>
                        (
                            <Option value={"category" + "#" + result.name}
                                    key={"category" + "#" + result.id}>
                                {result.name}
                            </Option>
                        )
                    )
                }
            </OptGroup>
            <OptGroup label="Гуртки">
                {
                    possibleResults.clubs.map(result =>
                        (
                            <Option value={"club" + "#" + result.name}
                                    key={"club" + "#" + result.id}>
                                {result.name}
                            </Option>
                        )
                    )
                }
            </OptGroup>
        </Select>
    )
};

export default Search;