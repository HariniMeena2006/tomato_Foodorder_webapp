import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx'; 
import {Routes,Route} from 'react-router-dom'
import Add from "./pages/add/Add.jsx"
import List from './pages/list/List.jsx';
import Orders from './pages/orders/Orders.jsx';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
  

function App() {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
