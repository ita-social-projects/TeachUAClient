import {AutoComplete, Select} from "antd";
import React, {createRef} from "react";
import {clearSearchParameters, SearchContext, searchParameters} from "../context/SearchContext";
import {getClubsByParameters} from "../service/ClubService";
import {getPossibleResults, getPossibleResultsByText} from "../service/SearchService";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";

const {Option, OptGroup} = Select;

class Search extends React.Component {
    static contextType = SearchContext;

    state = {
        possibleResults: {
            categories: [],
            clubs: []
        },
        loading: false
    };

    onSearchChange = (value, option) => {
        if (!searchParameters.isAdvancedSearch) {
            clearSearchParameters();

            switch (option.type) {
                case "category":
                    searchParameters.categoryName = value;
                    break;
                case "club":
                    searchParameters.clubName = value;
                    break;
                default: {
                    if (this.state.possibleResults.categories.find(category =>
                        category.name.toLowerCase().includes(value.toLowerCase()))) {
                        searchParameters.categoryName = value;
                    } else {
                        searchParameters.clubName = value;
                    }
                }
            }

            getClubsByParameters(searchParameters).then(response => {
                this.context.setClubs(response);
            });
        }
    };

    onFocus = () => {
        this.setState({loading: true});
        getPossibleResults(searchParameters).then(response => {
            this.setState({possibleResults: response, loading: false})
        });
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.target.defaultValue && this.onSearchChange(event.target.defaultValue, {type: "all"});
        }
    };

    onSearch = (val) => {
        this.setState({loading: true});
        getPossibleResultsByText(val, searchParameters).then(response => {
            this.setState({possibleResults: response, loading: false})
        });
    };

    handleAdvancedSearch = () => {
        this.props.advancedSearch ?
            this.props.setAdvancedSearch(false) : this.props.setAdvancedSearch(true);
        this.props.advancedSearch ?
            searchParameters.isAdvancedSearch = false : searchParameters.isAdvancedSearch = true;
    };

    render() {
        return (
            <div className="search">
                <AutoComplete
                    allowClear={true}
                    loading={this.state.loading}
                    disabled={searchParameters.isAdvancedSearch}
                    onSelect={this.onSearchChange}
                    onSearch={this.onSearch}
                    onFocus={this.onFocus}
                    onInputKeyDown={this.onKeyDown}
                    suffix={<SearchOutlined />}
                    style={{
                        width: 200,
                        opacity: searchParameters.isAdvancedSearch ? 0.5 : 1
                    }}
                    placeholder="Який гурток шукаєте?"
                    defaultActiveFirstOption={false}>

                    <OptGroup label="Категорії">
                        {
                            this.state.possibleResults.categories.map(result => (
                                <Option value={result.name}
                                        type={"category"}
                                        key={"category" + "#" + result.id}>
                                    {result.name}
                                </Option>)
                            )
                        }
                    </OptGroup>
                    <OptGroup label="Гуртки">
                        {
                            this.state.possibleResults.clubs.map(result => (
                                <Option value={result.name}
                                        type={"club"}
                                        key={"club" + "#" + result.id}>
                                    {result.name}
                                </Option>)
                            )
                        }
                    </OptGroup>
                </AutoComplete>

                <ControlOutlined className="advanced-icon"
                                 onClick={this.handleAdvancedSearch}/>
            </div>
        );
    }
}

export default Search;