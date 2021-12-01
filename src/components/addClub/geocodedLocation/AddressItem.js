import React, { Component } from 'react';
import {Input} from "antd";

class AddressItem extends Component {
    render() {
        return (
            <div className="row form-group justify-content-start">
                <label className="col-sm-4 col-form-label">{this.props.label}</label>
                <div className="col-xl-8">
                    <input
                        type="text"
                        id={this.props.id}
                        defaultValue={this.props.value}
                        onChange={this.props.onChange}
                        className="form-control ant-input"
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        );
    }
}

export default AddressItem;