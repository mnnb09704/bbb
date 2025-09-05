import React from 'react';
import './App.css';
import AddProduct from './components/AddProduct';
import OrderList from './components/OrderList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PSH Store Admin Panel</h1>
      </header>
      <main className="App-main">
        <AddProduct />
        <OrderList />
      </main>
    </div>
  );
}
export default App;