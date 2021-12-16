import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { useState, useEffect } from 'react';
import ItemsList from './components/itemsList';
import AddItem from './components/addItem';
import RecipeList from './components/recipeList';
import Login from './components/login';
import Register from './components/register';
import axios from 'axios';
import Navbar from './components/Navbar/index';

function App() {

  const [list, setList] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:5000/pantry?userId=" + JSON.parse(localStorage.getItem("user")).id)
          .then(res => {
              setList(res.data);
          })
          .catch(err => console.log(err));
  }, []);


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
          deleteItem(item);
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

  function deleteItem(item) {
    axios.delete(`http://localhost:5000/pantry/${item._id}`);
    setList(list.filter(currItem => currItem !== item));
  }

  function handleNewItem(item) {
    const updatedList = [...list];
    updatedList.push(item);
    setList(updatedList);
  }

  function sortByName() {
    let sortedList = [...list];
    setList(sortedList.sort(function(a,b) {
      if (a.name > b.name) {
        return 1;
      }
      else if (a.name < b.name) {
        return -1;
      }
      else {
        return 0;
      }
    }));
  }

  function sortByExpirationDate() {
    let sortedList = [...list];
    setList(sortedList.sort(function(a, b) {
      if (a.expirationDate > b.expirationDate) {
        return 1;
      }
      else if (a.expirationDate < b.expirationDate) {
        return -1;
      }
      else {
        return 0;
      }
    }));
  }

  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/pantry">
            <ItemsList items={list} onIncrement={incrementItem} onDecrement={decrementItem} onDelete={deleteItem} sortByName={sortByName} sortByExpirationDate={sortByExpirationDate}/>
          </Route>
          <Route exact path="/add">
            <AddItem itemHandler={handleNewItem}/>
          </Route>
          <Route exact path = "/recipes">
            <RecipeList items={list} />
          </Route>
          <Route exact path = "/signup">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
