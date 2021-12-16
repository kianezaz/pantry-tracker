import React from 'react';
import Item from './item';
import Dropdown from 'react-bootstrap/Dropdown'


const ItemsList = (props) => {

    const getItemsList = () => {
        return props.items.map(item => {
            return <Item item={item} onIncrement={props.onIncrement} onDecrement={props.onDecrement} onDelete={props.onDelete} key={item._id}/>
        })
    }

    return(
        <div>
            <h3>Logged Pantry Items</h3>
            
            <div style={{ display: 'block', 
                  width: 700}}>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                    Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={props.sortByName}>
                            Name
                        </Dropdown.Item>
                        <Dropdown.Item onClick={props.sortByExpirationDate}>
                            Expiration Date
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Expiration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getItemsList()}
                </tbody>
            </table>
        </div>
    )

    /*

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
    */
}

export default ItemsList;