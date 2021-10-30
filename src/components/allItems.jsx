/*
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './item';

const allItems = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/pantry")
            .then(res => {
                setList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getItemsList = () => {
        return list.map(item => {
            return <Item item={item} onIncrement={incrementItem} onDecrement={decrementItem} key={item._id}/>
        })
    }

    function incrementItem(item) {
        const newCount = item.count + 1;
        axios.put(`http://localhost:5000/pantry/${item._id}`, {
            count: newCount
        });
        const updatedList = [...list];
        const index = updatedList.indexOf(item);
        updatedList[index].count = newCount;
        setList(updatedList);
    }

    function decrementItem(item) {
        const newCount = item.count - 1;
        if (newCount == 0) {
            axios.delete(`http://localhost:5000/pantry/${item._id}`);
            setList(list.filter(currItem => currItem !== item));
        }
        else {
            axios.put(`http://localhost:5000/pantry/${item._id}`, {
                count: newCount
            });
            const updatedList = [...list];
            const index = updatedList.indexOf(item);
            updatedList[index].count = newCount;
            setList(updatedList);
        }
    }

    return(
        <div>
            <h3>Logged Pantry Items</h3>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getItemsList()}
                </tbody>
            </table>
        </div>
    )
}

export default allItems;
*/