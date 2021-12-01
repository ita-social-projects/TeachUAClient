import React, { Component } from 'react';
import AddressItem from './AddressItem';


class AddressSuggest extends Component {
    render() {
        return (
            <AddressItem
                label="Адреса"
                value={this.props.query}
                onChange={this.props.onChange}
                placeholder="Введіть адресу" />
        );
    }
}

export default AddressSuggest;