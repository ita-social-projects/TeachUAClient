import {AutoComplete, Select } from "antd";
import React from "react";
import {withRouter} from 'react-router-dom';
import {clearSearchParameters, mapSearchParameters, SearchContext, searchParameters} from "../context/SearchContext";
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
        loading: false,
        input: '',
        searchClicked: false
    };

    onSearchChange = (value, option) => {
        if (this.props.redirect) {
            this.props.history.push("/clubs");
        }

        if (!searchParameters.isAdvancedSearch) {
            //clearSearchParameters();

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
                console.log("=== getClubsByParameters called from onSearchChange method , clubs: "+response);
                this.context.setClubs(response);
            });
        }
    };

    onSelect = (value, option) => {
        this.state.input=value;
        this.onSearchChange(value, option);
    };

    onClear = () => {
        if (!this.props.advancedSearch) {
            clearSearchParameters();
            console.log("getClubsByParameters called from Search component onClear method");
            getClubsByParameters(searchParameters).then(response => {
                this.context.setClubs(response);
                console.log("onClear method,  context.clubs= "+this.context.clubs)
            });
            }
    };

    onFocus = () => {
        console.log("=== onFocus method ")
        this.setState({loading: true});
        getPossibleResults(searchParameters).then(response => {
            this.setState({possibleResults: response, loading: false})
        });
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("=== onKeyDown method run, value = "+event.target.defaultValue);
            event.target.defaultValue && this.onSearchChange(event.target.defaultValue, {type: "all"});
        }
    };

    searchOnClick = () =>{
        this.state.searchClicked=true;
        if(this.state.searchClicked){
            this.setState({loading: true});
            console.log("=== searchOnClick method run, value = "+this.state.input);
            this.onSearchChange(this.state.input, {type: "all"});
            this.setState({loading: false});
        }
        this.state.searchClicked=false;
    };

    onSearch = (val) => {
        console.log("=== onSearch method run, input: "+ this.state.input)
        this.state.input=val;

        this.onSearchChange(val,"all");
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
                    onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    onFocus={this.onFocus}
                    onInputKeyDown={this.onKeyDown}
                    onClear = {this.onClear}
                    style={{
                        width: 230,
                        opacity: searchParameters.isAdvancedSearch ? 0.5 : 1
                    }}
                    placeholder="Який гурток шукаєте?"
                    defaultActiveFirstOption={false}
                    defaultValue = {searchParameters.clubName}
                >

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

                <div className="search-icon-group">
                    <SearchOutlined className="advanced-icon"
                                    style = {{
                                        borderRadius: 0,
                                        backgroundColor: "transparent",
                                        color:"white",
                                        opacity: searchParameters.isAdvancedSearch ? 0.5 : 1,
                                        marginLeft: 0,
                                        marginRight: 12
                                    }}
                                    onClick={this.searchOnClick}
                    />

                    <ControlOutlined className="advanced-icon"
                                     style={{color:"orange", backgroundColor:"white"}}
                                     onClick={this.handleAdvancedSearch}
                    />
                </div>

            </div>
        );
    }
}

export default withRouter(Search);