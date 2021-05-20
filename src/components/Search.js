import { AutoComplete, Select } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import {
    clearSearchParameters,
    mapSearchParameters,
    SearchContext,
    searchInputData,
    searchParameters,
} from "../context/SearchContext";
import { getClubsByParameters } from "../service/ClubService";
import {
    getPossibleResults,
    getPossibleResultsByText,
} from "../service/SearchService";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import { getAllCategories } from "../service/CategoryService";

const { Option, OptGroup } = Select;

class Search extends React.Component {
    static contextType = SearchContext;

    state = {
        possibleResults: {
            categories: [],
            clubs: [],
        },
        allCategories: [],
        loading: false,
        searchClicked: false,
    };

    componentDidMount() {
        getAllCategories().then((response) => {
            this.setState({ allCategories: response });
        });
    }

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
                    if (
                        this.state.allCategories.find((category) =>
                            category.name
                                .toLowerCase()
                                .includes(value.toLowerCase())
                        )
                    ) {
                        searchParameters.categoryName = value;
                    } else {
                        searchParameters.clubName = value;
                    }
                }
            }

            getClubsByParameters(searchParameters).then((response) => {
                this.context.setClubs(response);
            });
        }
    };

    onSelect = (value, option) => {
        searchInputData.input = value;
        this.onSearchChange(value, option);
    };

    onClear = () => {
        if (!this.props.advancedSearch) {
            clearSearchParameters();
            searchInputData.input = "";
            getClubsByParameters(searchParameters).then((response) => {
                this.context.setClubs(response);
            });
        }
    };

    onFocus = () => {
        this.setState({ loading: true });
        getPossibleResults(searchParameters).then((response) => {
            this.setState({ possibleResults: response, loading: false });
        });
    };

    onKeyDown = (event) => {
        if (event.key === "Enter") {
            event.target.defaultValue &&
                this.onSearchChange(event.target.defaultValue, { type: "all" });
        }
    };

    searchOnClick = () => {
        this.state.searchClicked = true;
        if (this.state.searchClicked) {
            this.setState({ loading: true });
            this.onSearchChange(searchInputData.input, { type: "all" });
            this.setState({ loading: false });
        }
        this.state.searchClicked = false;
    };

    onSearch = (val) => {
        searchInputData.input = val;

        this.onSearchChange(val, "all");
        this.setState({ loading: true });
        getPossibleResultsByText(val, searchParameters).then((response) => {
            this.setState({ possibleResults: response, loading: false });
        });
    };

    handleAdvancedSearch = () => {
        if (this.props.redirect) {
            //redirect with props value for component
            this.props.history.push({
                pathname: "/clubs",
                state: { showAdvancedSearch: true },
            });
        } else {
            if (this.props.advancedSearch) {
                this.props.setAdvancedSearch(false);
                searchParameters.isAdvancedSearch = false;
            } else {
                this.props.setAdvancedSearch(true);
                searchParameters.isAdvancedSearch = true;
            }
        }
    };

    render() {
        return (
            <div className="search">
                <AutoComplete
                    allowClear={true}
                    loading={this.state.loading}
                    disabled={searchParameters.isAdvancedSearch}
                    onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    onFocus={this.onFocus}
                    onInputKeyDown={this.onKeyDown}
                    onClear={this.onClear}
                    style={{
                        width: 230,
                        opacity: searchParameters.isAdvancedSearch ? 0.5 : 1,
                    }}
                    placeholder="Який гурток шукаєте?"
                    defaultActiveFirstOption={false}
                    defaultValue={searchInputData.input}>
                    <OptGroup label="Категорії">
                        {this.state.possibleResults.categories.map((result) => (
                            <Option
                                value={result.name}
                                type={"category"}
                                key={"category" + "#" + result.id}>
                                {result.name}
                            </Option>
                        ))}
                    </OptGroup>
                    <OptGroup label="Гуртки">
                        {this.state.possibleResults.clubs.map((result) => (
                            <Option
                                value={result.name}
                                type={"club"}
                                key={"club" + "#" + result.id}>
                                {result.name}
                            </Option>
                        ))}
                    </OptGroup>
                </AutoComplete>

                <div className="search-icon-group">
                    <SearchOutlined
                        className="advanced-icon"
                        style={{
                            borderRadius: 0,
                            backgroundColor: "transparent",
                            color: "white",
                            opacity: searchParameters.isAdvancedSearch
                                ? 0.5
                                : 1,
                            marginLeft: 0,
                            marginRight: 12,
                        }}
                        onClick={this.searchOnClick}
                    />
                    <ControlOutlined className="advanced-icon" title={"Розширений пошук"}
                        style={{ color: "orange", backgroundColor: "white" }}
                        onClick={this.handleAdvancedSearch}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
