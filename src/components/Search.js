import {AutoComplete, Select} from "antd";
import React from "react";
import {withRouter} from 'react-router-dom';
import {clearSearchParameters, mapSearchParameters, SearchContext, searchParameters} from "../context/SearchContext";
import {getClubsByParameters} from "../service/ClubService";
import {getPossibleResults, getPossibleResultsByText} from "../service/SearchService";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import ClearOutlined from "@ant-design/icons/lib/icons/ClearOutlined";

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
        if (this.props.redirect) {
            this.props.history.push("/clubs");
        }

        if (!searchParameters.isAdvancedSearch) {
            clearSearchParameters();

            switch (option.type) {
                case "category":
                    searchParameters.categoryName = value;
                    mapSearchParameters.categoryName = value;
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

    onClear = () => {
        if (!this.props.advancedSearch) {
            clearSearchParameters();
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
        if (this.props.advancedSearch) {
            this.props.setAdvancedSearch(false);
            searchParameters.isAdvancedSearch = false
        } else {
            this.props.setAdvancedSearch(true);
            searchParameters.isAdvancedSearch = true;
        }
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
                    suffix={<SearchOutlined/>}
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

                {!this.props.redirect &&
                <div className="search-icon-group">
                    <ClearOutlined className="clear-icon"
                                   style={{opacity: searchParameters.isAdvancedSearch ? 0.5 : 1}}
                                   onClick={this.onClear}/>
                    <ControlOutlined className="advanced-icon"
                                     onClick={this.handleAdvancedSearch}/>
                </div>}

            </div>
        );
    }
}

export default withRouter(Search);