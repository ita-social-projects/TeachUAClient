import {Select} from "antd";
import React from "react";
import {clearSearchParameters, searchParameters} from "../../context/SearchContext";
import {getClubsByParameters} from "../../service/ClubService";
import {getPossibleResults, getPossibleResultsByText} from "../../service/SearchService";
import PropTypes from "prop-types";

const {Option, OptGroup} = Select;

class Search extends React.Component {
    state = {
        searchText: '',
        possibleResults: {
            categories: [],
            clubs: []
        }
    };

    onSearchChange = (value) => {
        let parameter = value.split("#")[0],
            name = value.split("#")[1];

        clearSearchParameters();

        if (parameter === "category") {
            searchParameters.categoryName = name;
        } else if (parameter === "club") {
            searchParameters.clubName = name;
        }

        this.props.load(true);
        getClubsByParameters(searchParameters).then(response => {
            this.props.setClubs(response);
            this.props.load(false);
        });
    };


    onFocus = () => {
        getPossibleResults(searchParameters).then(response => {
            this.setState({possibleResults: response});
            console.log(response)
        });
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSearchChange("club#" + this.state.searchText)
        }
    };

    onSearch = (val) => {
        getPossibleResultsByText(val, searchParameters).then(response => this.setState({possibleResults: response}));

        this.setState({searchText: val});
    };

    render() {
        return (
            <Select
                showSearch
                /*allowClear*/
                onChange={this.onSearchChange}
                onSearch={this.onSearch}
                onFocus={this.onFocus}
                onInputKeyDown={this.onKeyDown}
                style={{width: 200}}
                placeholder="Який гурток шукаєте?"
                optionFilterProp="children"
                defaultActiveFirstOption={false}>

                <OptGroup label="Категорії">
                    {
                        this.state.possibleResults.categories.map(result => (
                            <Option value={"category" + "#" + result.name}
                                    key={"category" + "#" + result.id}>
                                {result.name}
                            </Option>)
                        )
                    }
                </OptGroup>
                <OptGroup label="Гуртки">
                    {
                        this.state.possibleResults.clubs.map(result => (
                            <Option value={"club" + "#" + result.name}
                                    key={"club" + "#" + result.id}>
                                {result.name}
                            </Option>)
                        )
                    }
                </OptGroup>
            </Select>
        );
    }
}

Search.propTypes = {
    setClubs: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
};

export default Search;