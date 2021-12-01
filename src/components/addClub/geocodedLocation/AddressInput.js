import React, { Component } from 'react';
import AddressItem from './AddressItem';
import {AutoComplete} from "antd";
const { Option } = AutoComplete;

class AddressInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.props.onChange(evt);
        console.log(this.props);
    }

    render() {
        return (

            <div className="card"><div className="card-body">
                <AddressItem label="Вулиця" id="street" value={this.props.street} onChange={this.handleChange} placeholder="" />
                <AddressItem label="Місто" id="city" value={this.props.city} onChange={this.handleChange} placeholder="" />
                <AddressItem label="Область" id="county" value={this.props.county} onChange={this.handleChange} placeholder="" />
                <AddressItem label="Індекс" id="postalCode" value={this.props.postalCode} onChange={this.handleChange} placeholder="" />
                <AddressItem label="Країна" id="country" value={this.props.country} onChange={this.handleChange} placeholder="" />
            </div></div>
        );
    }
}

export default AddressInput;