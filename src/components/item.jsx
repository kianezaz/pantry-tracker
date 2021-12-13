import React, { Component } from 'react'
const moment = require('moment');

const Item = (props) => {
    const currDate = new Date().toISOString();
    const textColor = props.item.expirationDate > currDate ? "text-dark" : "text-danger";
    return (
        <tr>
            <td className={textColor}>{props.item.name}</td>
            <td className={textColor}>{props.item.count}</td>
            <td className={textColor}>{moment(props.item.expirationDate).format('MMMM Do YYYY')}</td>
            <td>
                <button onClick={() => props.onIncrement(props.item)} className= "btn btn-dark btn-sm">Increment</button> 
                {"  |  "} 
                <button onClick={() => props.onDecrement(props.item)} className="btn btn-dark btn-sm">Decrement</button>
                {"  |  "} 
                <button onClick={() => props.onDelete(props.item)} className="btn btn-dark btn-sm">Delete</button>
            </td>
        </tr>
    )
}

export default Item;