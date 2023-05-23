import React, { useState } from 'react';
import Home from './screens/Home';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import Myorders from './screens/Myorders';
import Alert from './components/Alerts';
function App() {
  const [alert, setAlerts] = useState(null);
  const showAlerts = (message, type) => {
    setAlerts({ message: message, type: type });
    setTimeout(() => {
      setAlerts(null);
    }, 1500);
  }
  return (
    <div>
      <CartProvider>
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Home showAlerts={showAlerts} />} />
          <Route path="/login" element={<Login showAlerts={showAlerts} />} />
          <Route path="/signup" element={<SignUp showAlerts={showAlerts} />} />
          <Route path="/Myorders" element={<Myorders />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
