import './App.css';
import {Route, Switch, useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import ItemsList from './components/itemsList';
import AddItem from './components/addItem';
import RecipeList from './components/recipeList';
import Login from './components/login';
import Register from './components/register';
import AuthService from './services/authService';
import authHeader from './services/authHeader';
import axios from 'axios';
import Navbar from './components/Navbar/index';
import PrivateRoute from './components/privateRoute';

function App() {

  const [list, setList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      axios.get("http://localhost:5000/pantry?userId=" + user.id, {
        headers: authHeader()
      })
          .then(res => {
            setList(res.data);
          })
          .catch(err => console.log(err));
    }
  }, [location.key]);


  function incrementItem(item) {
      const newCount = item.count + 1;
      axios.put('http://localhost:5000/pantry?id=' + item._id, {
          count: newCount
      }, {
        headers: authHeader()
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
          axios.put('http://localhost:5000/pantry?id=' + item._id, {
              count: newCount
          }, {
            headers: authHeader()
          });
          const updatedList = [...list];
          const index = updatedList.indexOf(item);
          updatedList[index].count = newCount;
          setList(updatedList);
      }
  }

  function deleteItem(item) {
    axios.delete('http://localhost:5000/pantry/?id=' + item._id + "&userId=" + AuthService.getCurrentUser().id, {
      headers: authHeader()
    });
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
      <div>
        <Navbar />

        <Switch>
          <Route exact path = "/signup" component={Register} />
          <Route exact path="/" component={Login}/>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/pantry" render={(props) => <ItemsList {...props} items={list} onIncrement={incrementItem} onDecrement={decrementItem} onDelete={deleteItem} sortByName={sortByName} sortByExpirationDate={sortByExpirationDate} />} />
          <PrivateRoute exact path="/add" render={(props) => <AddItem itemHandler={handleNewItem} />} />
          <PrivateRoute exact path = "/recipes" render={(props) => <RecipeList items={list} />} />
        </Switch>
      </div>
  )
}

export default App;
