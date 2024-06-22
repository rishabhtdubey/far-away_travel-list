import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: false }
];

const App = () => {

    const [items, setItems] = useState(initialItems);

    const handleAddItems = (item) => {

        setItems((items) => [...items, item]);
    }

    const handleDeleteItems = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    const handleToggleItems = (id) => {
        setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item));
    }

  return (
    <div className="app">
        <Logo/>
        <Form onAddItems = {handleAddItems}/>
        <PackingList items = {items} onDeleteItems = {handleDeleteItems} onToggleItems = {handleToggleItems}/>
        <Stats items = {items}/>
    </div>
  )
}

const Logo = () => {
    return (
        <h1>🌴FAR AWAY💼</h1>
    )
}

const Form = ({onAddItems}) => {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };
        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({length: 20}, (_,i) => i+1).map((num) => <option value={num} key={num}>{num}</option>)}
            </select>
            <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button>add</button>
        </form>
    )
}

const PackingList = ({items, onDeleteItems, onToggleItems}) => {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (<Item item={item} onDeleteItems = {onDeleteItems} onToggleItems = {onToggleItems} key={item.id}/>))}
            </ul>
        </div>
    )
}

const Stats = ({items}) => {

    const numLength = items.length;
    const numPacked = items.filter((item) => item.packed === true).length;
    const percentage = Math.round(numPacked/numLength * 100);
    return (
        <footer className="stats">You have {numLength} items on your list, and you already packed {numPacked}({percentage}%)</footer>
    )
}

const Item = ({item, onDeleteItems, onToggleItems}) => {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)}/>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>    
        </li>
    )
}

export default App