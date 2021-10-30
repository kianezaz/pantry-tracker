import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';
import moment from 'moment';

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validDate = this.validDate.bind(this);
        this.extractDate = this.extractDate.bind(this);

        this.state = {
            name: "",
            nameError: false,
            count: "",
            countError: false,
            expirationDate: "",
            expirationDateError: false
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCount(e) {
        this.setState({
            count: e.target.value
        });
    }

    validDate(dateString) {
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
            return false;
        }
        return true;
    }

    extractDate(dateString) {
        const parts = dateString.split("/");
        const day = parseInt(parts[1]);
        const month = parseInt(parts[0]) - 1;
        const year = parseInt(parts[2]);
        return new Date(year, month, day);
    }

    validSubmission(name, count, expirationDate) {
        let invalidName, invalidCount, invalidDate = false;
        if (name === "" || name === undefined) {
            invalidName = true;
        }
        this.setState({
            nameError: invalidName
        })
        if (isNaN(parseInt(count))) {
            invalidCount = true;
        }
        this.setState({
            countError: invalidCount
        });
        if (!this.validDate(expirationDate)) {
            invalidDate = true;
        }
        this.setState({
            expirationDateError: invalidDate
        });
        if (invalidName || invalidCount || invalidDate) {
            return false;
        }
        return true;
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.validSubmission(this.state.name, this.state.count, this.state.expirationDate)) {
            return;
        }
        const date = this.extractDate(this.state.expirationDate);
        if (date === null) {
            console.log("Enter correct date format");
            return;
        }
        const parts = this.state.expirationDate.split("/");
        const day = parseInt(parts[1]);
        const month = parseInt(parts[0]) - 1;
        const year = parseInt(parts[2]);

        const item = {
            name: this.state.name,
            count: this.state.count,
            expirationDate: new Date(year, month, day)
        };

        axios.post("http://localhost:5000/pantry/add", item)
            .then(res => {
                console.log(res.data);
                this.props.itemHandler(res.data);
            });

        window.location = '/'
    }

    onChangeDate(e) {
        this.setState({
            expirationDate: e.target.value
        });
    }

    styleTextBox(error) {
        if (error) {
            return {
                backgroundColor: "rgba(255,0,0,.5)"
            }
        }
        else {
            return {
                backgroundColor: "white"
            }
        }
    }

    render() { 
        return (
        <div>
            <h3>Add new item to pantry</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input
                        type="text" 
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        style={this.styleTextBox(this.state.nameError)}/>
                </div>
                <div className="form-group">
                    <label>Quantity: </label>
                    <input 
                        type="text"
                        className="form-control" 
                        value={this.state.count} 
                        onChange={this.onChangeCount}
                        style={this.styleTextBox(this.state.countError)}/>
                </div>
                <div className="form-group">
                    <label>Expiration Date: </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onChange={this.onChangeDate}
                        style={this.styleTextBox(this.state.expirationDateError)}/>
                </div>

                

                <div className="form-group">
                    <input 
                        type="submit" 
                        value="Add Item to Pantry" 
                        className="btn btn-primary" 
                    />
                </div>
            </form>
        </div>
        );
    }
}
 
export default AddItem;